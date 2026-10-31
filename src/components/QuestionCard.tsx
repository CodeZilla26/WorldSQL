import React from 'react';
import { Lightbulb, ChevronLeft, ChevronRight, Terminal, BookMarked, Sparkles } from 'lucide-react';
import type { Question } from '../types/game';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  wordLength: number;
  showHint: boolean;
  onToggleHint: () => void;
  onPrevQuestion: () => void;
  onNextQuestion: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  wordLength,
  showHint,
  onToggleHint,
  onPrevQuestion,
  onNextQuestion
}) => {
  // Resalta el slot '___' dentro del código SQL
  const formattedCode = question.codigoSql.split('___').reduce<React.ReactNode[]>((acc, part, i) => {
    if (i === 0) return [part];
    return [
      ...acc,
      <span key={`slot-${i}`} className="sql-slot-badge">
        [ ??? ]
      </span>,
      part
    ];
  }, []);

  const difficultyClass =
    question.dificultad === 'Básico'
      ? 'diff-basic'
      : question.dificultad === 'Intermedio'
      ? 'diff-intermediate'
      : 'diff-advanced';

  return (
    <section className="question-card" aria-label="Desafío pedagógico">
      <div className="question-meta-bar">
        <div className="meta-badges">
          <span className="badge badge-category">
            <BookMarked size={12} className="badge-icon" />
            {question.categoria}
          </span>
          <span className="badge badge-focus">{question.enfoque}</span>
          <span className={`badge badge-diff ${difficultyClass}`}>{question.dificultad}</span>
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

      <h2 className="question-prompt">{question.pregunta}</h2>

      {question.codigoSql && (
        <div className="code-container">
          <div className="code-header">
            <Terminal size={14} className="code-terminal-icon" />
            <span className="code-lang-label">Consulta SQL a Completar</span>
          </div>
          <pre className="code-block">
            <code>{formattedCode}</code>
          </pre>
        </div>
      )}

      <div className="question-footer">
        <div className="word-spec">
          <Sparkles size={14} className="text-cyan" />
          <span>Palabra clave de <strong>{wordLength}</strong> letras</span>
        </div>

        <button
          type="button"
          className={`btn-hint-toggle ${showHint ? 'active' : ''}`}
          onClick={onToggleHint}
        >
          <Lightbulb size={15} />
          <span>{showHint ? 'Ocultar Pista' : 'Ver Pista'}</span>
        </button>
      </div>

      {showHint && (
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
