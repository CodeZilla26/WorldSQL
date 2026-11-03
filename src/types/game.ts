export type Enfoque = 'Teórico' | 'Práctico' | 'Teórico y Práctico';
export type Dificultad = 'Básico' | 'Intermedio' | 'Avanzado';

export type TipoPregunta = 'codigo-slot' | 'concepto' | 'debugging' | 'entrevista';
export type Nivel = 'Junior' | 'Semi-Senior' | 'Senior';
export type GameMode = 'facil' | 'normal' | 'dificil';
export type GameTab = 'practica' | 'diario';

export interface QuestionExplanation {
  concepto: string;
  sintaxis: string;
  ejemploReal: string;
  reglaOro: string;
  tipClave?: string;            // Micro-tip pedagógico breve (1-2 líneas)
  errorProduccion?: string;      // Error común o peligro de producción que previene
  relevanciaEntrevista?: string; // Pregunta frecuente o por qué se evalúa
}

export interface Question {
  id: number;
  palabra: string;
  categoria: string;
  enfoque: Enfoque;
  dificultad: Dificultad;
  tipo: TipoPregunta;
  nivel: Nivel;
  pregunta: string;
  codigoSql?: string;
  codigoErroneo?: string; // Código con error para modo debugging
  escenario?: string;      // Caso técnico para modo entrevista
  analogia?: string;       // Analogía cotidiana
  pista: string;
  explicacion: QuestionExplanation;
}

export interface Topic {
  id: string;
  nombre: string;
  subtitulo: string;
  descripcion: string;
  icono: string;
  badge: string;
  color: string;
  preguntas: Question[];
}

export type TileStatus = 'empty' | 'tbd' | 'correct' | 'present' | 'absent';

export interface TileEvaluation {
  letter: string;
  status: TileStatus;
}

export type GameStatus = 'IN_PROGRESS' | 'WON' | 'LOST';

export interface TopicStats {
  played: number;
  solved: number;
  streak: number;
  maxStreak: number;
  guessDistribution: Record<number, number>;
  solvedIds: number[];
}

export interface UserProgress {
  xp: number;
  dailyStreak: number;
  lastDailyDate: string | null;
}

export interface UserRank {
  minXp: number;
  title: string;
  icon: string;
  level: number;
}

export const USER_RANKS: UserRank[] = [
  { minXp: 0, title: 'Novato SQL', icon: '🌱', level: 1 },
  { minXp: 200, title: 'Consultor Junior', icon: '🔍', level: 2 },
  { minXp: 500, title: 'Filtrador Hábil', icon: '⚡', level: 3 },
  { minXp: 900, title: 'Modelador de Tablas', icon: '🏛️', level: 4 },
  { minXp: 1500, title: 'Dominador de SQL', icon: '💎', level: 5 },
];

export function getUserRank(xp: number): UserRank {
  for (let i = USER_RANKS.length - 1; i >= 0; i--) {
    if (xp >= USER_RANKS[i].minXp) {
      return USER_RANKS[i];
    }
  }
  return USER_RANKS[0];
}

export interface ToastMessage {
  id: string;
  text: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

export interface GameModeInfo {
  id: GameMode;
  nombre: string;
  subtitulo: string;
  intentos: number;
  badgeColor: string;
  reglas: string[];
}
