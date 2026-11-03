/**
 * Utilidad de vibración háptica (Haptic Feedback) para móviles.
 * Utiliza la Vibration API nativa del navegador y es 100% compatible con Capacitor.
 */

export const haptics = {
  /**
   * Vibración táctil súper ligera al pulsar una tecla (como un teclado mecánico físico)
   */
  key(enabled = true): void {
    if (!enabled) return;
    try {
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(10);
      }
    } catch {
      // Ignorar si el dispositivo no soporta vibración
    }
  },

  /**
   * Patrón de vibración armónico al acertar una palabra clave
   */
  success(enabled = true): void {
    if (!enabled) return;
    try {
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([30, 40, 60]);
      }
    } catch {
      // Ignorar
    }
  },

  /**
   * Doble vibración corta de advertencia (error de longitud, regla rota o intento fallido)
   */
  error(enabled = true): void {
    if (!enabled) return;
    try {
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([50, 40, 50]);
      }
    } catch {
      // Ignorar
    }
  }
};
