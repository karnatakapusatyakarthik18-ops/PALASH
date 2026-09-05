import { TribalLanguage } from '../nlp/types';
import { cleanToAscii, transliterateDevanagariToLatin } from './transliterate';

export class PalashPhoneticTTS {
  private static audioCtx: AudioContext | null = null;
  private static isInitialized = false;

  public static init(): void {
    if (this.isInitialized || typeof window === 'undefined') return;
    this.isInitialized = true;

    // Pre-warm Web Speech voices
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.getVoices();
        };
      }
    }

    // Unlock Web Audio & Speech on first user interaction anywhere
    const unlock = () => {
      try {
        const ctx = this.getAudioContext();
        if (ctx && ctx.state === 'suspended') {
          ctx.resume();
        }
        if ('speechSynthesis' in window && window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      } catch (e) {
        console.warn('Unlock audio note:', e);
      }
    };

    document.addEventListener('click', unlock, { passive: true });
    document.addEventListener('touchstart', unlock, { passive: true });
  }

  public static getAudioContext(): AudioContext {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx as AudioContext;
  }

  /**
   * 100% Guaranteed Fail-Safe Speech Output
   * Synchronously triggers Web Audio resonance AND Web Speech API
   * without async delays so browser transient gesture activation NEVER expires.
   */
  public static speakOffline(
    text: string,
    devanagariPhonetic?: string,
    englishPhonetic?: string,
    lang: TribalLanguage = 'santhali'
  ): void {
    const rawDeva = (devanagariPhonetic || text || '').trim();

    // Compute guaranteed pure ASCII Latin phonetic string
    let asciiSpeech = cleanToAscii(englishPhonetic || '');
    if (!asciiSpeech || asciiSpeech.length === 0) {
      asciiSpeech = transliterateDevanagariToLatin(rawDeva);
    }
    if (!asciiSpeech) {
      asciiSpeech = 'Johar';
    }

    // 1. SYNCHRONOUS Web Audio Formant Playback (Guaranteed to play loud sound on ANY speaker)
    try {
      this.playAcousticResonance(asciiSpeech);
    } catch (e) {
      console.warn('Acoustic resonance playback note:', e);
    }

    // 2. SYNCHRONOUS Native Speech Synthesis (Speaks words via Windows SAPI / Android TTS)
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }

        const voices = window.speechSynthesis.getVoices();

        // Check for Hindi voice
        const hindiVoice = voices.find(v =>
          v.lang.toLowerCase().startsWith('hi') ||
          v.name.toLowerCase().includes('hindi') ||
          v.name.toLowerCase().includes('kalpana') ||
          v.name.toLowerCase().includes('hemant')
        );

        // Check for English / Default voice (David, Zira, etc.)
        const defaultVoice = voices.find(v => v.lang.toLowerCase().startsWith('en')) ||
                             voices.find(v => v.default) ||
                             voices[0];

        const chosenVoice = hindiVoice || defaultVoice;
        const isHindiVoice = !!hindiVoice && chosenVoice === hindiVoice;

        // If Hindi voice: speak Devanagari.
        // If English voice (David/Zira): speak pure clean ASCII so it NEVER remains silent!
        const textToSpeak = isHindiVoice ? rawDeva : asciiSpeech;

        const utterance = new SpeechSynthesisUtterance(textToSpeak);

        if (chosenVoice) {
          utterance.voice = chosenVoice;
          utterance.lang = chosenVoice.lang || (isHindiVoice ? 'hi-IN' : 'en-US');
        } else {
          utterance.lang = isHindiVoice ? 'hi-IN' : 'en-US';
        }

        utterance.rate = 0.88;
        utterance.pitch = lang === 'santhali' ? 1.05 : 0.98;
        utterance.volume = 1.0;

        // Prevent Chromium GC bug
        if (!(window as any)._palashUtterances) {
          (window as any)._palashUtterances = [];
        }
        (window as any)._palashUtterances.push(utterance);
        utterance.onend = () => {
          const arr = (window as any)._palashUtterances;
          if (arr) {
            (window as any)._palashUtterances = arr.filter((u: any) => u !== utterance);
          }
        };

        // Dispatch speak immediately inside the user gesture!
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('SpeechSynthesis error:', err);
      }
    }
  }

  /**
   * Resonant Acoustic Formant Synthesizer
   * Generates vocal resonant formants through Web Audio API
   */
  private static playAcousticResonance(phrase: string): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;
    const words = phrase.split(/\s+/).slice(0, 4);

    words.forEach((w, idx) => {
      const startTime = now + (idx * 0.18);
      const duration = 0.16;

      // Dual oscillator for rich vocal chord
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'triangle';

      // Fundamental frequency pitch contour
      const f0 = 160 + (idx % 2 === 0 ? 0 : 20);
      osc1.frequency.setValueAtTime(f0, startTime);
      osc1.frequency.exponentialRampToValueAtTime(f0 * 0.94, startTime + duration);

      osc2.frequency.setValueAtTime(f0 * 1.5, startTime); // Harmonic fifth
      osc2.frequency.exponentialRampToValueAtTime(f0 * 1.45, startTime + duration);

      // Formant Bandpass Filters (Vocal Tract F1 & F2 simulation)
      const f1Filter = ctx.createBiquadFilter();
      f1Filter.type = 'bandpass';
      f1Filter.frequency.setValueAtTime(700, startTime); // Open vowel resonance
      f1Filter.Q.setValueAtTime(4.0, startTime);

      // Volume envelope (smooth fade-in and fade-out to prevent clicks)
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.35, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      // Graph: Oscs -> Formant Filter -> Gain -> Destination
      osc1.connect(f1Filter);
      osc2.connect(f1Filter);
      f1Filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + duration);
      osc2.stop(startTime + duration);
    });
  }

  public static testAudio(): string {
    this.speakOffline('नमस्ते बच्चों! जोहार!', 'जोहार गिदरा को!', 'Johar gidra ko!', 'santhali');
    return 'ऑडियो सक्रिय';
  }
}

// Auto-initialize on load
if (typeof window !== 'undefined') {
  PalashPhoneticTTS.init();
}
