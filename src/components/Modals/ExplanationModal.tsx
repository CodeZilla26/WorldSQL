import React, { useState } from 'react';
import {
  GraduationCap,
  X,
  Lightbulb,
  AlertTriangle,
  Briefcase,
  Code2,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';
import type { Question, GameStatus } from '../../types/game';

interface ExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question;
  gameStatus: GameStatus;
  earnedXp: number;
  onNextQuestion: () => void;
}

export const ExplanationModal: React.FC<ExplanationModalProps> = ({
  isOpen,
  onClose,
  question,
  gameStatus,
  earnedXp,
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

  // Micro-Tips concisos y de alto impacto
  const tipClave = question.explicacion.tipClave || question.explicacion.concepto;
  const errorProduccion = question.explicacion.errorProduccion || question.explicacion.reglaOro;
  const relevancia = question.explicacion.relevanciaEntrevista || question.explicacion.ejemploReal;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-window explanation-window" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <GraduationCap size={22} className="text-emerald" />
            <div>
              <h3>Micro-Tips de Aprendizaje</h3>
              <p className="modal-subtitle">Lección rápida para recordar este concepto</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Cerrar modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-content">
          {/* Banner de resultado y XP ganado */}
          <div className={`status-banner ${isWon ? 'banner-won' : 'banner-lost'}`}>
            <div className="status-banner-icon">
              {isWon ? <CheckCircle2 size={28} /> : <AlertCircle size={28} />}
            </div>
            <div className="status-banner-info">
              <div className="status-banner-header">
                <h4>{isWon ? '¡Concepto Dominado!' : 'Fin de Intentos'}</h4>
                {isWon && earnedXp > 0 && (
                  <span className="xp-earned-pill">
                    <Sparkles size={12} /> +{earnedXp} XP
                  </span>
                )}
              </div>
              <p>
                Palabra clave: <strong className="target-word-pill">{question.palabra}</strong>
              </p>
            </div>
          </div>

          {/* 1. Micro-Tip Clave */}
          <div className="microtip-card tip-card-key">
            <div className="microtip-header">
              <Lightbulb size={16} className="text-amber" />
              <h5>💡 El Tip Clave</h5>
            </div>
            <p className="microtip-body">{tipClave}</p>
          </div>

          {/* 2. Peligro en Producción / Error Común */}
          <div className="microtip-card tip-card-danger">
            <div className="microtip-header">
              <AlertTriangle size={16} className="text-rose" />
              <h5>⚠️ El Peligro en Producción</h5>
            </div>
            <p className="microtip-body">{errorProduccion}</p>
          </div>

          {/* 3. Relevancia Práctica o Entrevista */}
          <div className="microtip-card tip-card-interview">
            <div className="microtip-header">
              <Briefcase size={16} className="text-purple" />
              <h5>💼 En el Mundo Real & Entrevistas</h5>
            </div>
            <p className="microtip-body">{relevancia}</p>
          </div>

          {/* Sintaxis Estándar */}
          {question.explicacion.sintaxis && (
            <div className="pedagogy-card" style={{ marginTop: '4px' }}>
              <div className="pedagogy-header">
                <div className="flex-center gap-6">
                  <Code2 size={16} className="text-cyan" />
                  <h5>Sintaxis Rápida</h5>
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
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Ver Tablero
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
