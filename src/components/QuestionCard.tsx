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
  Lock,
  Calendar
} from 'lucide-react';
import type { Question, GameMode, GameTab } from '../types/game';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  wordLength: number;
  showHint: boolean;
  gameMode: GameMode;
  currentTab: GameTab;
  todayDateStr: string;
  guessesCount: number;
  maxAttempts: number;
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
  gameMode,
  currentTab,
  todayDateStr,
  guessesCount,
  maxAttempts,
  onToggleHint,
  onPrevQuestion,
  onNextQuestion
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
          label: 'Consulta SQL',
          icon: Terminal,
          badgeClass: 'badge-tipo-codigo',
          headerTitle: 'Consulta SQL a Completar'
        };
    }
  })();

  const TipoIcon = tipoInfo.icon;

  // Regla de desbloqueo de pistas para fomentar el Active Recall:
  // - Modo Fácil: Siempre disponible.
  // - Modo Normal: Se desbloquea tras el 1er intento (para obligar a pensar primero).
  // - Modo Difícil: Se desbloquea solo en el último intento de emergencia.
  const isHintLocked =
    (gameMode === 'dificil' && guessesCount < maxAttempts - 1) ||
    (gameMode === 'normal' && guessesCount === 0);

  const hintLockMessage =
    gameMode === 'dificil'
      ? 'Bloqueada hasta el último intento en Modo Difícil'
      : 'Haz al menos 1 intento antes de pedir la pista';

  return (
    <section className="question-card" aria-label="Desafío didáctico">
      {/* Banner superior especial si estamos en Modo Desafío Diario */}
      {currentTab === 'diario' && (
        <div className="daily-challenge-badge-banner">
          <Calendar size={14} className="text-amber" />
          <span>Palabra del Día: <strong>{todayDateStr}</strong> • ¡Resuélvela para mantener tu racha!</span>
        </div>
      )}

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

        {/* Controles de navegación (solo activos en modo práctica libre) */}
        {currentTab === 'practica' ? (
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
        ) : (
          <span className="daily-label-chip">Desafío Diario</span>
        )}
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

      {/* Pie de tarjeta */}
      <div className="question-footer">
        <div className="word-spec">
          <Sparkles size={14} className="text-cyan" />
          <span>Palabra clave de <strong>{wordLength}</strong> letras</span>
        </div>

        <button
          type="button"
          className={`btn-hint-toggle ${showHint ? 'active' : ''} ${isHintLocked ? 'hint-locked' : ''}`}
          onClick={onToggleHint}
          title={isHintLocked ? hintLockMessage : 'Ver Pista'}
        >
          {isHintLocked ? <Lock size={14} /> : <Lightbulb size={15} />}
          <span>{isHintLocked ? 'Pista Bloqueada' : showHint ? 'Ocultar Pista' : 'Ver Pista'}</span>
        </button>
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
