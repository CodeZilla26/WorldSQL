import React from 'react';
import {
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Terminal,
  BookMarked,
  Sparkles,
  Bug,
  Briefcase,
  Layers,
  Wand2,
  Lock
} from 'lucide-react';
import type { Question, GameMode } from '../types/game';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  wordLength: number;
  showHint: boolean;
  gameMode: GameMode;
  guessesCount: number;
  maxAttempts: number;
  onToggleHint: () => void;
  onPrevQuestion: () => void;
  onNextQuestion: () => void;
  onDiscardLetters?: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  wordLength,
  showHint,
  gameMode,
  guessesCount,
  maxAttempts,
  onToggleHint,
  onPrevQuestion,
  onNextQuestion,
  onDiscardLetters
}) => {
  // Resalta el slot '___' dentro del código SQL si aplica
  const formattedCode = question.codigoSql
    ? question.codigoSql.split('___').reduce<React.ReactNode[]>((acc, part, i) => {
        if (i === 0) return [part];
        return [
          ...acc,
          <span key={`slot-${i}`} className="sql-slot-badge">
            [ ??? ]
          </span>,
          part
        ];
      }, [])
    : null;

  // Clases según Nivel
  const nivelClass =
    question.nivel === 'Junior'
      ? 'badge-junior'
      : question.nivel === 'Semi-Senior'
      ? 'badge-mid'
      : 'badge-senior';

  // Configuración de estilo según Tipo de Pregunta
  const tipoInfo = (() => {
    switch (question.tipo) {
      case 'debugging':
        return {
          label: 'Modo Debugging',
          icon: Bug,
          badgeClass: 'badge-tipo-debugging',
          headerTitle: 'Código con Error a Corregir'
        };
      case 'entrevista':
        return {
          label: 'Pregunta de Entrevista',
          icon: Briefcase,
          badgeClass: 'badge-tipo-entrevista',
          headerTitle: 'Caso Técnico de Entrevista'
        };
      case 'concepto':
        return {
          label: 'Concepto Puro',
          icon: Layers,
          badgeClass: 'badge-tipo-concepto',
          headerTitle: 'Definición Teórica & Arquitectura'
        };
      default:
        return {
          label: 'Código Práctico',
          icon: Terminal,
          badgeClass: 'badge-tipo-codigo',
          headerTitle: 'Consulta SQL a Completar'
        };
    }
  })();

  const TipoIcon = tipoInfo.icon;
  const isHintLocked = gameMode === 'dificil' && guessesCount < maxAttempts - 1;

  return (
    <section className="question-card" aria-label="Desafío didáctico">
      {/* Barra superior de metadatos */}
      <div className="question-meta-bar">
        <div className="meta-badges">
          <span className={`badge badge-level ${nivelClass}`}>{question.nivel}</span>
          <span className={`badge ${tipoInfo.badgeClass}`}>
            <TipoIcon size={12} className="badge-icon" />
            {tipoInfo.label}
          </span>
          <span className="badge badge-category">
            <BookMarked size={12} className="badge-icon" />
            {question.categoria}
          </span>
        </div>

        <div className="nav-controls">
          <button
            type="button"
            className="nav-arrow-btn"
            onClick={onPrevQuestion}
            title="Pregunta anterior"
            aria-label="Pregunta anterior"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="counter-text">
            {currentIndex + 1} / {totalQuestions}
          </span>
          <button
            type="button"
            className="nav-arrow-btn"
            onClick={onNextQuestion}
            title="Pregunta siguiente"
            aria-label="Pregunta siguiente"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Pregunta Central */}
      <h2 className="question-prompt">{question.pregunta}</h2>

      {/* CASO 1: MODO DEBUGGING */}
      {question.tipo === 'debugging' && question.codigoErroneo && (
        <div className="code-container debugging-code-container">
          <div className="code-header debugging-code-header">
            <Bug size={14} className="text-rose" />
            <span>{tipoInfo.headerTitle}</span>
          </div>
          <pre className="code-block code-error-pre">
            <code>{question.codigoErroneo}</code>
          </pre>
        </div>
      )}

      {/* CASO 2: MODO ENTREVISTA (ESCENARIO) */}
      {question.tipo === 'entrevista' && question.escenario && (
        <div className="interview-scenario-box">
          <div className="scenario-header">
            <Briefcase size={14} className="text-purple" />
            <strong>Situación Planteada en la Entrevista:</strong>
          </div>
          <p className="scenario-text">{question.escenario}</p>
        </div>
      )}

      {/* CASO 3: MODO CONCEPTO (ANALOGÍA DIDÁCTICA) */}
      {question.tipo === 'concepto' && question.analogia && (
        <div className="concept-analogy-box">
          <div className="analogy-header">
            <Sparkles size={14} className="text-amber" />
            <strong>Analogía Didáctica del Mundo Real:</strong>
          </div>
          <p className="analogy-text">{question.analogia}</p>
        </div>
      )}

      {/* CASO 4: MODO CÓDIGO CON SLOT */}
      {question.tipo === 'codigo-slot' && formattedCode && (
        <div className="code-container">
          <div className="code-header">
            <Terminal size={14} className="code-terminal-icon" />
            <span className="code-lang-label">{tipoInfo.headerTitle}</span>
          </div>
          <pre className="code-block">
            <code>{formattedCode}</code>
          </pre>
        </div>
      )}

      {/* Pie de tarjeta con ayudas interactivas */}
      <div className="question-footer">
        <div className="word-spec">
          <Sparkles size={14} className="text-cyan" />
          <span>Palabra clave de <strong>{wordLength}</strong> letras</span>
        </div>

        <div className="footer-action-buttons">
          {/* Botón de ayuda para Modo Fácil */}
          {gameMode === 'facil' && onDiscardLetters && (
            <button
              type="button"
              className="btn-assist-toggle"
              onClick={onDiscardLetters}
              title="Descarta 3 letras que no pertenecen a la palabra clave"
            >
              <Wand2 size={14} />
              <span>Descartar 3 Letras</span>
            </button>
          )}

          {/* Botón de Pistas */}
          <button
            type="button"
            className={`btn-hint-toggle ${showHint ? 'active' : ''} ${isHintLocked ? 'hint-locked' : ''}`}
            onClick={onToggleHint}
            title={isHintLocked ? 'Bloqueada hasta el último intento en Modo Difícil' : 'Ver Pista'}
          >
            {isHintLocked ? <Lock size={14} /> : <Lightbulb size={15} />}
            <span>{isHintLocked ? 'Pista Bloqueada' : showHint ? 'Ocultar Pista' : 'Ver Pista'}</span>
          </button>
        </div>
      </div>

      {/* Banner de Pista */}
      {showHint && !isHintLocked && (
        <div className="hint-banner animate-fade-in" role="alert">
          <div className="hint-header">
            <Lightbulb size={14} className="hint-bulb-icon" />
            <strong>Pista del Concepto:</strong>
          </div>
          <p className="hint-body">{question.pista}</p>
        </div>
      )}
    </section>
  );
};
