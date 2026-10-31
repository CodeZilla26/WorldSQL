import type { Topic } from '../types/game';
import { SQL_QUESTIONS } from './sqlQuestions';
import { JS_QUESTIONS } from './jsQuestions';
import { GIT_QUESTIONS } from './gitQuestions';

export const TOPICS: Topic[] = [
  {
    id: 'sql',
    nombre: 'SQL & Bases de Datos',
    subtitulo: 'RDBMS, Consultas, DDL, DML, JOINs & Transacciones',
    descripcion: 'Domina los fundamentos de bases de datos relacionales respondiendo a desafíos reales extraídos del manual definitivo de SQL.',
    icono: 'Database',
    badge: 'Curso Principal',
    color: '#06b6d4',
    preguntas: SQL_QUESTIONS,
  },
  {
    id: 'javascript',
    nombre: 'JavaScript Moderno',
    subtitulo: 'ES6+, Asincronía, Métodos de Array & Web APIs',
    descripcion: 'Ejercita las palabras clave y estructuras nucleares del lenguaje rey de la web y Node.js.',
    icono: 'Code2',
    badge: 'Disponible',
    color: '#f59e0b',
    preguntas: JS_QUESTIONS,
  },
  {
    id: 'git',
    nombre: 'Git & Version Control',
    subtitulo: 'Ramas, Commits, Merges, Stash & Colaboración',
    descripcion: 'Pon a prueba tus conocimientos sobre comandos fundamentales de control de versiones.',
    icono: 'GitBranch',
    badge: 'Disponible',
    color: '#f43f5e',
    preguntas: GIT_QUESTIONS,
  }
];

export const DEFAULT_TOPIC_ID = 'sql';
