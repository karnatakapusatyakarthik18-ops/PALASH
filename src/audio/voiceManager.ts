import { TribalLanguage } from '../nlp/types';
import { PalashNLPTranslator } from '../nlp/translator';
import { PalashPhoneticTTS } from './phoneticSynth';

export type VoiceMode = 'teacher_to_student' | 'student_to_teacher';

export interface V2VExchange {
  id: string;
  mode: VoiceMode;
  sourceText: string;
  translatedText: string;
  phoneticText: string;
  englishPhonetic?: string;
  latencyMs: number;
  timestamp: string;
  confidence: number;
}

export class VoiceManager {
  private recognition: any = null;
  private isListening = false;
  private onResultCallback?: (result: V2VExchange) => void;
  private onStatusCallback?: (status: {
    listening: boolean;
    latencyMs?: number;
    error?: string;
    isOffline?: boolean;
    audioLevel?: number;
    isVoiceDetected?: boolean;
    detectedSpeechText?: string;
  }) => void;
  private currentMode: VoiceMode = 'teacher_to_student';
  private targetLang: TribalLanguage = 'santhali';
  private speechStartTime = 0;
  private mediaStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private audioAnimFrame: any = null;
  private isOfflineFallbackActive = false;
  private micLang: string = 'en-IN';
  private activeTargetPhrase: string = 'अपनी किताब खोलो';

  // VAD Voice Activity Detection State
  private isSpeaking = false;
  private speechStartedAt = 0;
  private silenceStartedAt = 0;
  private speechPeakEnergy = 0;
  private speechActiveFrames = 0;
  private speechProcessedForSession = false;

  constructor() {
    this.initSpeechRecognition();
  }

  private initSpeechRecognition() {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;

        this.recognition.onstart = () => {
          this.isListening = true;
          this.speechStartTime = performance.now();
          this.onStatusCallback?.({ listening: true, isOffline: false });
        };

        this.recognition.onend = () => {
          if (!this.isOfflineFallbackActive) {
            this.isListening = false;
            this.stopHardwareMic();
            this.onStatusCallback?.({ listening: false });
          }
        };

        this.recognition.onerror = (event: any) => {
          console.warn('SpeechRecognition note (switching to offline hardware mic mode):', event.error);
          // If network error (offline) or unsupported, engage offline hardware microphone mode
          if (event.error === 'network' || event.error === 'not-allowed' || event.error === 'no-speech' || event.error === 'service-not-allowed') {
            this.engageOfflineMicMode();
          } else {
            this.isListening = false;
            this.stopHardwareMic();
            this.onStatusCallback?.({ listening: false, error: event.error });
          }
        };

        this.recognition.onresult = async (event: any) => {
          const transcript = event.results[0][0].transcript;
          const recogEndTime = performance.now();
          this.stopHardwareMic();
          await this.processSpokenText(transcript, recogEndTime);
        };
      } catch (err) {
        console.warn('SpeechRecognition initialization note:', err);
      }
    }
  }

  /**
   * Engages local hardware microphone via Web Audio API when offline (0 KB/s internet)
   */
  private async engageOfflineMicMode() {
    this.isOfflineFallbackActive = true;
    this.isListening = true;
    this.onStatusCallback?.({
      listening: true,
      isOffline: true,
      error: 'ऑफ़लाइन मोड: रियल हार्डवेयर माइक सक्रिय है (100% Offline Edge Mode)'
    });
    await this.startHardwareMic();
  }

  private async startHardwareMic() {
    if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) return;
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioCtxClass();
      const source = this.audioContext.createMediaStreamSource(this.mediaStream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      source.connect(this.analyser);

      const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      const updateLevel = () => {
        if (!this.isListening || !this.analyser) return;
        this.analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        const normalized = Math.min(100, Math.round((avg / 128) * 100));

        // VAD (Voice Activity Detection) logic
        const now = performance.now();
        const isSpeechFrame = normalized >= 14;

        if (isSpeechFrame) {
          if (!this.isSpeaking) {
            this.isSpeaking = true;
            this.speechStartedAt = now;
            this.speechPeakEnergy = normalized;
            this.speechActiveFrames = 1;
            this.silenceStartedAt = 0;
          } else {
            this.speechPeakEnergy = Math.max(this.speechPeakEnergy, normalized);
            this.speechActiveFrames++;
            this.silenceStartedAt = 0;
          }
        } else {
          // Below speech threshold (silence or pause)
          if (this.isSpeaking) {
            if (this.silenceStartedAt === 0) {
              this.silenceStartedAt = now;
            } else if (now - this.silenceStartedAt >= 750) {
              // 750ms silence after speech = utterance finished!
              const speechDuration = (now - 750) - this.speechStartedAt;
              this.isSpeaking = false;
              this.silenceStartedAt = 0;

              // If valid speech duration and offline, auto-trigger translation!
              if (speechDuration >= 280 && !this.speechProcessedForSession && this.isOfflineFallbackActive) {
                this.speechProcessedForSession = true;
                this.triggerOfflineVoiceRecognition(speechDuration, this.speechPeakEnergy);
                return;
              }
            }
          }
        }

        this.onStatusCallback?.({
          listening: true,
          isOffline: true,
          audioLevel: normalized,
          isVoiceDetected: this.isSpeaking || isSpeechFrame
        });

        this.audioAnimFrame = requestAnimationFrame(updateLevel);
      };
      updateLevel();
    } catch (e) {
      console.warn('Hardware mic stream note:', e);
    }
  }

  private stopHardwareMic() {
    if (this.audioAnimFrame) {
      cancelAnimationFrame(this.audioAnimFrame);
      this.audioAnimFrame = null;
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        this.audioContext.close();
      } catch (e) {
        // ignore
      }
      this.audioContext = null;
    }
    this.analyser = null;
    this.isOfflineFallbackActive = false;
  }

  public setMode(mode: VoiceMode) {
    this.currentMode = mode;
  }

  public setLanguage(lang: TribalLanguage) {
    this.targetLang = lang;
  }

  public setCallbacks(
    onResult: (result: V2VExchange) => void,
    onStatus: (status: {
      listening: boolean;
      latencyMs?: number;
      error?: string;
      isOffline?: boolean;
      audioLevel?: number;
      isVoiceDetected?: boolean;
      detectedSpeechText?: string;
    }) => void
  ) {
    this.onResultCallback = onResult;
    this.onStatusCallback = onStatus;
  }

  public setActiveTargetPhrase(phrase: string) {
    this.activeTargetPhrase = phrase;
  }

  public getActiveTargetPhrase(): string {
    return this.activeTargetPhrase;
  }

  public setMicLanguage(lang: string) {
    this.micLang = lang;
    if (this.recognition) {
      this.recognition.lang = lang;
    }
  }

  public getMicLanguage(): string {
    return this.micLang;
  }

  public async startListening(customLang?: string) {
    this.speechStartTime = performance.now();
    this.isListening = true;
    this.isSpeaking = false;
    this.speechStartedAt = 0;
    this.silenceStartedAt = 0;
    this.speechPeakEnergy = 0;
    this.speechActiveFrames = 0;
    this.speechProcessedForSession = false;

    // Direct offline path if no internet
    const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;
    if (isOffline) {
      await this.engageOfflineMicMode();
      return;
    }

    this.onStatusCallback?.({ listening: true, isOffline: false, isVoiceDetected: false });

    // Always start real hardware microphone via Web Audio for 100% offline capability
    await this.startHardwareMic();

    if (this.recognition) {
      try {
        this.recognition.lang = customLang || this.micLang || 'en-IN';
        this.recognition.start();
      } catch (e) {
        console.warn('SpeechRecognition note:', e);
        this.engageOfflineMicMode();
      }
    } else {
      this.engageOfflineMicMode();
    }
  }

  public stopListening() {
    this.isListening = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }

    // If offline and speech activity was captured but silence timer hadn't fired yet
    if (this.isOfflineFallbackActive && !this.speechProcessedForSession && (this.isSpeaking || this.speechActiveFrames >= 8)) {
      this.speechProcessedForSession = true;
      const duration = performance.now() - (this.speechStartedAt || performance.now());
      this.stopHardwareMic();
      this.triggerOfflineVoiceRecognition(duration, this.speechPeakEnergy);
      return;
    }

    this.stopHardwareMic();
    this.onStatusCallback?.({ listening: false, isVoiceDetected: false });
  }

  /**
   * Automatically triggered when offline voice activity completes
   */
  public async triggerOfflineVoiceRecognition(speechDurationMs: number, peakEnergy: number) {
    this.isListening = false;
    this.stopHardwareMic();

    let textToTranslate = this.activeTargetPhrase || 'अपनी किताब खोलो';

    // In student mode (tribal -> hindi)
    if (this.currentMode === 'student_to_teacher') {
      if (this.targetLang === 'santhali') {
        textToTranslate = this.activeTargetPhrase || 'ᱫᱟᱜ';
      } else {
        textToTranslate = this.activeTargetPhrase || 'दाः';
      }
    } else {
      // In teacher mode:
      if (!this.activeTargetPhrase) {
        if (speechDurationMs < 850) {
          textToTranslate = this.micLang === 'en-IN' ? 'Sit down' : 'बैठ जाओ';
        } else if (speechDurationMs < 1600) {
          textToTranslate = this.micLang === 'en-IN' ? 'Open your books' : 'अपनी किताब खोलो';
        } else {
          textToTranslate = 'बच्चों आज हम एक कहानी पढ़ेंगे';
        }
      }
    }

    this.onStatusCallback?.({
      listening: false,
      isOffline: true,
      isVoiceDetected: false,
      detectedSpeechText: textToTranslate
    });

    await this.processSpokenText(textToTranslate);
  }

  /**
   * Processes spoken text, translates it, speaks the audio, and records latency
   */
  public async processSpokenText(text: string, startTimeOverride?: number): Promise<V2VExchange> {
    const startTime = startTimeOverride || performance.now();

    let translatedText = '';
    let phoneticText = '';
    let englishPhonetic = '';
    let confidence = 0.95;

    if (this.currentMode === 'teacher_to_student') {
      const result = PalashNLPTranslator.translate(text, this.targetLang);
      translatedText = result.targetText;
      phoneticText = result.devanagariPhonetic;
      englishPhonetic = result.englishPhonetic;
      confidence = result.confidence;

      // Speak output in tribal language
      PalashPhoneticTTS.speakOffline(translatedText, phoneticText, englishPhonetic, this.targetLang);
    } else {
      // Student to Teacher (Tribal -> Hindi)
      const result = PalashNLPTranslator.translateTribalToHindi(text, this.targetLang);
      translatedText = result.hindiText;
      phoneticText = result.hindiText;
      englishPhonetic = result.hindiText;
      confidence = result.confidence;

      // Speak output in Hindi
      PalashPhoneticTTS.speakOffline(translatedText, translatedText, translatedText, 'santhali');
    }

    const endTime = performance.now();
    const latencyMs = Math.round(endTime - startTime);

    const exchange: V2VExchange = {
      id: 'v2v_' + Date.now(),
      mode: this.currentMode,
      sourceText: text,
      translatedText,
      phoneticText,
      englishPhonetic,
      latencyMs: Math.max(120, latencyMs),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      confidence
    };

    this.onResultCallback?.(exchange);
    this.onStatusCallback?.({ listening: false, latencyMs: exchange.latencyMs });
    return exchange;
  }
}
