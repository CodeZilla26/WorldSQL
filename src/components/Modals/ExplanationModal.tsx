import React, { useState } from 'react';
import {
  GraduationCap,
  X,
  BookOpen,
  Code2,
  Server,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Bug,
  Briefcase,
  Layers,
  Terminal
} from 'lucide-react';
import type { Question, GameStatus } from '../../types/game';

interface ExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question;
  gameStatus: GameStatus;
  onNextQuestion: () => void;
}

export const ExplanationModal: React.FC<ExplanationModalProps> = ({
  isOpen,
  onClose,
  question,
  gameStatus,
  onNextQuestion
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const isWon = gameStatus === 'WON';

  const handleCopySyntax = () => {
    if (question.explicacion.sintaxis) {
      navigator.clipboard.writeText(question.explicacion.sintaxis);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const TipoIcon =
    question.tipo === 'debugging'
      ? Bug
      : question.tipo === 'entrevista'
      ? Briefcase
      : question.tipo === 'concepto'
      ? Layers
      : Terminal;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-window explanation-window" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <GraduationCap size={22} className="text-emerald" />
            <div>
              <h3>Explicación Teórica & Práctica</h3>
              <div className="modal-meta-pills">
                <span className="badge badge-level-modal">{question.nivel}</span>
                <span className="badge badge-tipo-modal">
                  <TipoIcon size={12} />
                  {question.tipo.toUpperCase()}
                </span>
                <span className="modal-category-sub">{question.categoria}</span>
              </div>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Cerrar modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-content">
          {/* Banner de resultado */}
          <div className={`status-banner ${isWon ? 'banner-won' : 'banner-lost'}`}>
            <div className="status-banner-icon">
              {isWon ? <CheckCircle2 size={28} /> : <AlertCircle size={28} />}
            </div>
            <div className="status-banner-info">
              <h4>{isWon ? '¡Concepto Dominado con Éxito!' : 'Fin de Intentos de la Ronda'}</h4>
              <p>
                Palabra clave: <strong className="target-word-pill">{question.palabra}</strong>
              </p>
            </div>
          </div>

          {/* 1. Concepto Fundamental */}
          <div className="pedagogy-card">
            <div className="pedagogy-header">
              <BookOpen size={16} className="text-cyan" />
              <h5>Concepto Fundamental</h5>
            </div>
            <p className="pedagogy-text">{question.explicacion.concepto}</p>
          </div>

          {/* 2. Sintaxis Estándar */}
          {question.explicacion.sintaxis && (
            <div className="pedagogy-card">
              <div className="pedagogy-header">
                <div className="flex-center gap-6">
                  <Code2 size={16} className="text-amber" />
                  <h5>Sintaxis Estándar</h5>
                </div>
                <button
                  type="button"
                  className="btn-copy-code"
                  onClick={handleCopySyntax}
                  title="Copiar sintaxis al portapapeles"
                >
                  {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                  <span>{copied ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>
              <pre className="code-box-pre">
                <code>{question.explicacion.sintaxis}</code>
              </pre>
            </div>
          )}

          {/* 3. En el Mundo Real */}
          <div className="pedagogy-card">
            <div className="pedagogy-header">
              <Server size={16} className="text-indigo" />
              <h5>En el Mundo Real & Frameworks (ORM / Backend)</h5>
            </div>
            <p className="pedagogy-text">{question.explicacion.ejemploReal}</p>
          </div>

          {/* 4. Regla de Oro */}
          <div className="golden-rule-container">
            <Lightbulb size={20} className="golden-rule-icon" />
            <div>
              <strong className="golden-rule-title">💡 Regla de Oro de la Industria:</strong>
              <p className="golden-rule-text">{question.explicacion.reglaOro}</p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Repasar Tablero
          </button>
          <button type="button" className="btn-primary" onClick={onNextQuestion}>
            <span>Siguiente Desafío</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
