import { TribalLanguage } from './types';

export class MorphologicalEngine {
  // Common grammatical patterns for primary school instruction
  static applyPlural(text: string, lang: TribalLanguage): string {
    switch (lang) {
      case 'santhali':
        return text.includes('ᱠᱚ') ? text : `${text} ᱠᱚ`;
      case 'ho':
        return text.endsWith('को') ? text : `${text}को`;
      case 'mundari':
        return text.endsWith('को') ? text : `${text}को`;
    }
  }

  static applyClassroomImperative(verbBase: string, lang: TribalLanguage, isPlural = false): string {
    if (isPlural) {
      switch (lang) {
        case 'santhali': return `${verbBase} ᱯᱮ`;
        case 'ho': return `${verbBase}पे`;
        case 'mundari': return `${verbBase}पे`;
      }
    } else {
      switch (lang) {
        case 'santhali': return `${verbBase} ᱢᱮ`;
        case 'ho': return `${verbBase}न`;
        case 'mundari': return `${verbBase}मे`;
      }
    }
  }
}
