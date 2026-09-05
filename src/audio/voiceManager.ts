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
  private onStatusCallback?: (status: { listening: boolean; latencyMs?: number; error?: string }) => void;
  private currentMode: VoiceMode = 'teacher_to_student';
  private targetLang: TribalLanguage = 'santhali';
  private speechStartTime = 0;

  constructor() {
    this.initSpeechRecognition();
  }

  private initSpeechRecognition() {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        this.isListening = true;
        this.speechStartTime = performance.now();
        this.onStatusCallback?.({ listening: true });
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.onStatusCallback?.({ listening: false });
      };

      this.recognition.onerror = (event: any) => {
        console.warn('SpeechRecognition error:', event.error);
        this.isListening = false;
        this.onStatusCallback?.({ listening: false, error: event.error });
      };

      this.recognition.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        const recogEndTime = performance.now();
        await this.processSpokenText(transcript, recogEndTime);
      };
    }
  }

  public setMode(mode: VoiceMode) {
    this.currentMode = mode;
  }

  public setLanguage(lang: TribalLanguage) {
    this.targetLang = lang;
  }

  public setCallbacks(
    onResult: (result: V2VExchange) => void,
    onStatus: (status: { listening: boolean; latencyMs?: number; error?: string }) => void
  ) {
    this.onResultCallback = onResult;
    this.onStatusCallback = onStatus;
  }

  public startListening() {
    if (!this.recognition) {
      this.onStatusCallback?.({ listening: false, error: 'SpeechRecognition not supported in this browser environment.' });
      return;
    }

    try {
      this.recognition.lang = 'hi-IN';
      this.speechStartTime = performance.now();
      this.recognition.start();
    } catch (e) {
      console.warn('Could not start recognition:', e);
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
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
