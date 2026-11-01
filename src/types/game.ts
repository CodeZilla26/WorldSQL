export type Enfoque = 'Teórico' | 'Práctico' | 'Teórico y Práctico';
export type Dificultad = 'Básico' | 'Intermedio' | 'Avanzado';

export type TipoPregunta = 'codigo-slot' | 'concepto' | 'debugging' | 'entrevista';
export type Nivel = 'Junior' | 'Semi-Senior' | 'Senior';
export type GameMode = 'facil' | 'normal' | 'dificil';

export interface QuestionExplanation {
  concepto: string;
  sintaxis: string;
  ejemploReal: string;
  reglaOro: string;
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
  codigoErroneo?: string; // Código con error o anti-patrón para modo debugging
  escenario?: string;      // Caso de uso o situación técnica para modo entrevista
  analogia?: string;       // Analogía cotidiana para fijar conceptos abstractos
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
