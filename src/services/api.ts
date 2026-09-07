/**
 * PALASH VANI — Frontend API Client with Offline-First Fallback
 * 
 * Guarantees:
 *  - Translation pipeline NEVER depends on this service.
 *  - Automatically detects whether the local Node.js API / XAMPP MySQL is active.
 *  - If offline, transparently falls back to local IndexedDB/localStorage caches.
 */

const API_BASE_URL = 'http://127.0.0.1:5000/api';

export interface DatabaseStatus {
  isServerOnline: boolean;
  isDbConnected: boolean;
  mode: 'connected' | 'offline_db' | 'api_offline';
  databaseName?: string;
  message?: string;
}

/**
 * Checks connectivity to local Node.js API and XAMPP MySQL database
 */
export async function checkDatabaseConnection(): Promise<DatabaseStatus> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${API_BASE_URL}/health`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const connected = data.database?.connected === true;
      return {
        isServerOnline: true,
        isDbConnected: connected,
        mode: connected ? 'connected' : 'offline_db',
        databaseName: data.database?.name || 'palash',
        message: connected 
          ? 'XAMPP MySQL डेटाबेस कनेक्टेड' 
          : 'XAMPP MySQL ऑफ़लाइन (लोकल कैश सक्रिय)'
      };
    }
  } catch (e) {
    // API server is offline or unreachable
  }

  return {
    isServerOnline: false,
    isDbConnected: false,
    mode: 'api_offline',
    message: 'लोकल मोड: 100% ऑफ़लाइन'
  };
}

/**
 * Non-blocking translation history logger
 * Guaranteed: NEVER throws, NEVER delays or blocks core translation!
 */
export async function logTranslationHistory(
  sourceLanguage: string,
  targetLanguage: string,
  inputText: string,
  translation: string,
  confidence: number = 0.95
): Promise<void> {
  try {
    // Fire and forget with low timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    await fetch(`${API_BASE_URL}/translation-history`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_language: sourceLanguage,
        target_language: targetLanguage,
        input_text: inputText,
        translation,
        confidence
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
  } catch (err) {
    // Silently continue — translation must never be interrupted
  }
}

/**
 * Fetch lessons with local offline fallback
 */
export async function fetchLessons(language?: string) {
  try {
    const url = language 
      ? `${API_BASE_URL}/lessons?language=${encodeURIComponent(language)}`
      : `${API_BASE_URL}/lessons`;
    
    const res = await fetch(url);
    if (res.ok) {
      const json = await res.json();
      if (json.data) {
        localStorage.setItem('palash_cached_lessons', JSON.stringify(json.data));
        return json.data;
      }
    }
  } catch (err) {
    console.warn('[API Client] Lessons fetch offline fallback engaged');
  }

  // Fallback to local storage cache
  try {
    const cached = localStorage.getItem('palash_cached_lessons');
    if (cached) return JSON.parse(cached);
  } catch (e) {}

  return [];
}

/**
 * Save newly created lesson
 */
export async function saveLesson(lesson: {
  title: string;
  description?: string;
  language_code: string;
  content: any;
  created_by?: number;
}) {
  try {
    const res = await fetch(`${API_BASE_URL}/lessons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lesson)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('[API Client] Save lesson falling back to local storage');
  }

  // Local storage fallback
  try {
    const local = JSON.parse(localStorage.getItem('palash_custom_lessons') || '[]');
    const newLesson = { ...lesson, id: 'local_' + Date.now(), created_at: new Date().toISOString() };
    local.push(newLesson);
    localStorage.setItem('palash_custom_lessons', JSON.stringify(local));
    return { success: true, offline: true, data: newLesson };
  } catch (e) {
    return { success: false, error: 'Storage failed' };
  }
}

/**
 * Submit quiz assessment result
 */
export async function submitQuizResult(data: {
  student_id: number;
  quiz_id: number;
  score: number;
  total_questions?: number;
}) {
  try {
    const res = await fetch(`${API_BASE_URL}/quiz-results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) return await res.json();
  } catch (e) {
    // Offline local storage fallback
    const results = JSON.parse(localStorage.getItem('palash_quiz_results') || '[]');
    results.push({ ...data, completed_at: new Date().toISOString() });
    localStorage.setItem('palash_quiz_results', JSON.stringify(results));
  }
  return { success: true, offline: true };
}
