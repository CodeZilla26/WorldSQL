import type { GameMode, GameModeInfo } from '../types/game';

export const GAME_MODES: Record<GameMode, GameModeInfo> = {
  facil: {
    id: 'facil',
    nombre: 'Modo Fácil (Principiante)',
    subtitulo: '6 intentos y ayudas didácticas guiadas',
    intentos: 6,
    badgeColor: '#10b981',
    reglas: [
      '6 intentos para deducir la palabra clave de SQL.',
      'Pista didáctica del concepto visible automáticamente.',
      'Herramienta de ayuda: Descartar 3 letras del teclado con un clic.',
      'Diseñado para estudiantes que están dando sus primeros pasos en bases de datos.'
    ]
  },
  normal: {
    id: 'normal',
    nombre: 'Modo Normal (Estándar)',
    subtitulo: '5 intentos con mecánica clásica de Wordle',
    intentos: 5,
    badgeColor: '#06b6d4',
    reglas: [
      '5 intentos para deducir la palabra clave.',
      'Pista disponible bajo demanda cuando la necesites.',
      'Sin descarte asistido de letras.',
      'El balance ideal para ejercitar la memoria y la sintaxis.'
    ]
  },
  dificil: {
    id: 'dificil',
    nombre: 'Modo Difícil (Entrevista Técnica)',
    subtitulo: '4 intentos y regla estricta (Hard Mode)',
    intentos: 4,
    badgeColor: '#f43f5e',
    reglas: [
      'Solo 4 intentos para resolver cada desafío.',
      'Regla Estricta: Las letras verdes descubiertas DEBEN mantenerse en esa misma casilla en los siguientes intentos.',
      'Las letras amarillas descubiertas DEBEN incluirse obligatoriamente en tu próximo intento.',
      'Pista bloqueada hasta el último intento de emergencia.',
      'Simula la exigencia y precisión requeridas en entrevistas técnicas reales.'
    ]
  }
};
