import React from 'react';
import { Sliders, X, Check, ShieldCheck, Flame, Sparkles } from 'lucide-react';
import { GAME_MODES } from '../../data/gameModes';
import type { GameMode } from '../../types/game';

interface GameModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
}

export const GameModeModal: React.FC<GameModeModalProps> = ({
  isOpen,
  onClose,
  currentMode,
  onSelectMode
}) => {
  if (!isOpen) return null;

  const modeKeys: GameMode[] = ['facil', 'normal', 'dificil'];

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-window gamemode-window" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <Sliders size={22} className="text-cyan" />
            <div>
              <h3>Reglas y Modos de Dificultad</h3>
              <p className="modal-subtitle">Personaliza la exigencia de tu entrenamiento</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Cerrar modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-content">
          <div className="modes-selection-list">
            {modeKeys.map(key => {
              const info = GAME_MODES[key];
              const isSelected = key === currentMode;

              const ModeIcon =
                key === 'facil'
                  ? Sparkles
                  : key === 'normal'
                  ? ShieldCheck
                  : Flame;

              return (
                <div
                  key={key}
                  className={`mode-card ${isSelected ? 'mode-active' : ''}`}
                  onClick={() => {
                    onSelectMode(key);
                    onClose();
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="mode-card-header">
                    <div className="mode-title-group">
                      <div className="mode-icon-badge" style={{ backgroundColor: `${info.badgeColor}20`, color: info.badgeColor }}>
                        <ModeIcon size={20} />
                      </div>
                      <div>
                        <h4 style={{ color: isSelected ? info.badgeColor : undefined }}>{info.nombre}</h4>
                        <span className="mode-attempts-pill">{info.intentos} Intentos</span>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="mode-check-badge">
                        <Check size={14} /> Activo
                      </span>
                    )}
                  </div>

                  <p className="mode-subtitulo">{info.subtitulo}</p>

                  <ul className="mode-rules-list">
                    {info.reglas.map((rule, idx) => (
                      <li key={`rule-${key}-${idx}`}>{rule}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
