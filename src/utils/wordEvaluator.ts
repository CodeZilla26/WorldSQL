import type { TileEvaluation, TileStatus } from '../types/game';

/**
 * Evalúa un intento contra la palabra objetivo con el algoritmo estricto de Wordle:
 * - 1er pase: detecta coincidencias exactas (verde / correct).
 * - 2do pase: detecta letras presentes en otra posición (amarillo / present)
 *   respetando la cantidad disponible de cada letra en la palabra objetivo.
 * - El resto queda como ausente (gris / absent).
 */
export function evaluateGuess(guess: string, target: string): TileEvaluation[] {
  const guessUpper = guess.toUpperCase();
  const targetUpper = target.toUpperCase();
  const len = targetUpper.length;

  const result: TileEvaluation[] = Array.from({ length: len }, (_, i) => ({
    letter: guessUpper[i] || '',
    status: 'absent' as TileStatus
  }));

  // Contador de letras restantes en la palabra objetivo
  const targetLetterCounts: Record<string, number> = {};
  for (let i = 0; i < len; i++) {
    const ch = targetUpper[i];
    targetLetterCounts[ch] = (targetLetterCounts[ch] || 0) + 1;
  }

  // Primer pase: Coincidencias Exactas (CORRECT)
  for (let i = 0; i < len; i++) {
    if (guessUpper[i] === targetUpper[i]) {
      result[i].status = 'correct';
      targetLetterCounts[guessUpper[i]]--;
    }
  }

  // Segundo pase: Coincidencias Parciales (PRESENT)
  for (let i = 0; i < len; i++) {
    if (result[i].status !== 'correct') {
      const letter = guessUpper[i];
      if (targetLetterCounts[letter] && targetLetterCounts[letter] > 0) {
        result[i].status = 'present';
        targetLetterCounts[letter]--;
      } else {
        result[i].status = 'absent';
      }
    }
  }

  return result;
}

/**
 * Obtiene el mapa del estado de cada tecla del teclado virtual:
 * Prioridad de color: correct (verde) > present (amarillo) > absent (gris).
 */
export function computeKeyboardStatuses(
  evaluations: TileEvaluation[][]
): Record<string, TileStatus> {
  const map: Record<string, TileStatus> = {};

  const priority: Record<TileStatus, number> = {
    correct: 3,
    present: 2,
    absent: 1,
    tbd: 0,
    empty: 0
  };

  for (const row of evaluations) {
    for (const tile of row) {
      if (!tile.letter) continue;
      const currentStatus = map[tile.letter] || 'empty';
      if (priority[tile.status] > priority[currentStatus]) {
        map[tile.letter] = tile.status;
      }
    }
  }

  return map;
}

/**
 * Validador para el Modo Difícil (Hard Mode):
 * Exige que cualquier pista verde (correcta) y amarilla (presente) revelada en intentos anteriores
 * sea reutilizada estrictamente en el siguiente intento.
 */
export function validateHardMode(
  guess: string,
  evaluations: TileEvaluation[][]
): { valid: boolean; reason?: string } {
  if (evaluations.length === 0) return { valid: true };

  const guessUpper = guess.toUpperCase();

  // 1. Validar que las letras verdes permanezcan en la misma posición
  for (const row of evaluations) {
    for (let i = 0; i < row.length; i++) {
      const tile = row[i];
      if (tile.status === 'correct') {
        if (guessUpper[i] !== tile.letter) {
          return {
            valid: false,
            reason: `Modo Difícil: La letra '${tile.letter}' debe estar en la casilla ${i + 1}`
          };
        }
      }
    }
  }

  // 2. Validar que las letras amarillas estén incluidas en la palabra
  const requiredLetters = new Set<string>();
  for (const row of evaluations) {
    for (const tile of row) {
      if (tile.status === 'present') {
        requiredLetters.add(tile.letter);
      }
    }
  }

  for (const letter of requiredLetters) {
    if (!guessUpper.includes(letter)) {
      return {
        valid: false,
        reason: `Modo Difícil: El intento debe contener la letra '${letter}'`
      };
    }
  }

  return { valid: true };
}
