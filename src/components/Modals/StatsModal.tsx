import React, { useState } from 'react';
import { Trophy, X, RotateCcw, Flame, CheckCircle2, Gamepad2, Award } from 'lucide-react';
import type { TopicStats } from '../../types/game';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicName: string;
  totalQuestions: number;
  stats: TopicStats;
  onResetStats: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  topicName,
  totalQuestions,
  stats,
  onResetStats
}) => {
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const winRate = stats.played > 0 ? Math.round((stats.solved / stats.played) * 100) : 0;
  const courseCompletion = Math.round((stats.solvedIds.length / totalQuestions) * 100);

  // Calcular el intento con mayor cantidad para la barra de distribución
  const maxGuessCount = Math.max(1, ...Object.values(stats.guessDistribution));

  const handleResetClick = () => {
    if (confirmReset) {
      onResetStats();
      setConfirmReset(false);
    } else {
      setConfirmReset(true);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-window stats-window" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <Trophy size={22} className="text-amber" />
            <div>
              <h3>Tus Estadísticas</h3>
              <p className="modal-subtitle">{topicName}</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Cerrar estadísticas">
            <X size={18} />
          </button>
        </div>

        <div className="modal-content">
          {/* Métricas clave */}
          <div className="stats-metric-grid">
            <div className="metric-box">
              <Gamepad2 size={16} className="text-muted" />
              <div className="metric-value">{stats.played}</div>
              <div className="metric-label">Rondas Jugadas</div>
            </div>

            <div className="metric-box">
              <CheckCircle2 size={16} className="text-emerald" />
              <div className="metric-value">{stats.solved}</div>
              <div className="metric-label">Desafíos Acertados</div>
            </div>

            <div className="metric-box">
              <Award size={16} className="text-cyan" />
              <div className="metric-value">{winRate}%</div>
              <div className="metric-label">% de Éxito</div>
            </div>

            <div className="metric-box">
              <Flame size={16} className="text-rose" />
              <div className="metric-value">{stats.streak}</div>
              <div className="metric-label">Racha Actual</div>
            </div>

            <div className="metric-box span-all">
              <div className="metric-sub-row">
                <span>Mejor Racha Histórica:</span>
                <strong className="text-amber">{stats.maxStreak} seguidas</strong>
              </div>
            </div>
          </div>

          {/* Progreso del curso */}
          <div className="stats-progress-section">
            <div className="stats-section-title">
              <Award size={16} className="text-cyan" />
              <span>Dominio del Curso</span>
            </div>
            <div className="progress-track" style={{ marginTop: '8px' }}>
              <div className="progress-fill" style={{ width: `${courseCompletion}%` }} />
            </div>
            <span className="stats-sub-hint">
              {stats.solvedIds.length} de {totalQuestions} conceptos aprendidos ({courseCompletion}%)
            </span>
          </div>

          {/* Distribución de Intentos */}
          <div className="guess-distribution-section">
            <div className="stats-section-title">
              <span>Distribución de Aciertos por Intento</span>
            </div>
            <div className="distribution-bars">
              {[1, 2, 3, 4, 5].map(attemptNum => {
                const count = stats.guessDistribution[attemptNum] || 0;
                const percentWidth = Math.max(8, Math.round((count / maxGuessCount) * 100));

                return (
                  <div key={`dist-${attemptNum}`} className="distribution-row">
                    <span className="dist-num">{attemptNum}</span>
                    <div className="dist-track">
                      <div
                        className={`dist-fill ${count > 0 ? 'has-aciertos' : ''}`}
                        style={{ width: `${percentWidth}%` }}
                      >
                        <span className="dist-count">{count}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="modal-footer footer-space-between">
          <button
            type="button"
            className={`btn-danger-outline ${confirmReset ? 'confirming' : ''}`}
            onClick={handleResetClick}
          >
            <RotateCcw size={14} />
            <span>{confirmReset ? '¿Seguro? Clic para Confirmar' : 'Reiniciar Progreso'}</span>
          </button>
          <button type="button" className="btn-primary" onClick={onClose}>
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};
