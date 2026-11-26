/**
 * PALASH VANI — Online Real-Time Translation Bridge
 * 
 * Translates arbitrary spoken or written English sentences to Hindi in real-time when online.
 * Completely transparent:
 *   - If online: provides instant, accurate translation of whatever the user says.
 *   - If offline or error: immediately falls back to local offline NLP engine (< 15ms).
 */

export async function translateToHindiOnline(text: string): Promise<string | null> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return null;
  }

  const clean = text.trim();
  if (!clean) return null;

  // 1. Primary: High-speed Google GTX endpoint (No key required, highly accurate for Hindi)
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=hi&dt=t&q=${encodeURIComponent(clean)}`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (data && data[0] && Array.isArray(data[0])) {
        const fullTranslation = data[0].map((item: any) => item[0]).join('');
        if (fullTranslation && fullTranslation.trim()) {
          return fullTranslation.trim();
        }
      }
    }
  } catch (err) {
    // Continue to fallback
  }

  // 2. Secondary: MyMemory Translation API fallback
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(clean)}&langpair=en|hi`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      const translated = data?.responseData?.translatedText;
      if (translated && !translated.includes('MYMEMORY WARNING') && translated.trim()) {
        return translated.trim();
      }
    }
  } catch (err) {
    // Offline or unreachable
  }

  return null;
}
