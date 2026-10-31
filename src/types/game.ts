export type Enfoque = 'Teórico' | 'Práctico' | 'Teórico y Práctico';
export type Dificultad = 'Básico' | 'Intermedio' | 'Avanzado';

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
  pregunta: string;
  codigoSql: string;
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
