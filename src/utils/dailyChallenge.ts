/**
 * Utilidades para el Desafío Diario (Daily SQL Challenge) y el cálculo de rachas continuas.
 */

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getYesterdayDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Obtiene el índice determinista de la pregunta del día.
 * Todas las personas en el mundo reciben la misma pregunta en la misma fecha.
 */
export function getDailyQuestionIndex(totalQuestions: number, dateStr = getTodayDateString()): number {
  if (totalQuestions <= 0) return 0;
  
  // Algoritmo de hash simple y determinista sobre la cadena de fecha YYYY-MM-DD
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convertir a entero de 32 bits
  }
  
  return Math.abs(hash) % totalQuestions;
}

/**
 * Calcula la racha tras completar el desafío diario hoy.
 */
export function computeDailyStreak(
  lastCompletedDate: string | null,
  currentStreak: number,
  today = getTodayDateString()
): { newStreak: number; alreadyDoneToday: boolean } {
  if (lastCompletedDate === today) {
    return { newStreak: currentStreak, alreadyDoneToday: true };
  }

  const yesterday = getYesterdayDateString();

  if (lastCompletedDate === yesterday) {
    // Racha continuada consecutiva
    return { newStreak: currentStreak + 1, alreadyDoneToday: false };
  }

  // Racha reiniciada desde hoy
  return { newStreak: 1, alreadyDoneToday: false };
}
