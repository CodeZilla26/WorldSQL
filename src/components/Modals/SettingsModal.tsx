import React from 'react';
import {
  Settings,
  X,
  Volume2,
  VolumeX,
  Smartphone,
  SmartphoneNfc,
  ListOrdered,
  BarChart3,
  HelpCircle,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { getUserRank } from '../../types/game';
import type { GameMode, UserProgress } from '../../types/game';
import { GAME_MODES } from '../../data/gameModes';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameMode: GameMode;
  userProgress: UserProgress;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  onToggleSound: () => void;
  onToggleHaptics: () => void;
  onOpenGameMode: () => void;
  onOpenCatalog: () => void;
  onOpenStats: () => void;
  onOpenHelp: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  gameMode,
  userProgress,
  soundEnabled,
  hapticsEnabled,
  onToggleSound,
  onToggleHaptics,
  onOpenGameMode,
  onOpenCatalog,
  onOpenStats,
  onOpenHelp
}) => {
  if (!isOpen) return null;

  const currentRank = getUserRank(userProgress.xp);
  const modeInfo = GAME_MODES[gameMode];

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-window settings-window" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <Settings size={22} className="text-cyan" />
            <div>
              <h3>Ajustes y Menú</h3>
              <p className="modal-subtitle">Configuración y herramientas de aprendizaje</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Cerrar ajustes">
            <X size={18} />
          </button>
        </div>

        <div className="modal-content">
          {/* Tarjeta de Rango y Experiencia */}
          <div className="rank-summary-card">
            <div className="rank-badge-avatar">
              <span className="rank-avatar-emoji">{currentRank.icon}</span>
            </div>
            <div className="rank-info-content">
              <div className="rank-header-row">
                <h4>{currentRank.title}</h4>
                <span className="rank-xp-badge">{userProgress.xp} XP</span>
              </div>
              <p className="rank-subtitle">Nivel {currentRank.level} de dominio en SQL básico</p>
              <div className="rank-progress-bar">
                <div
                  className="rank-progress-fill"
                  style={{ width: `${Math.min(100, Math.round((userProgress.xp / 1500) * 100))}%` }}
                />
              </div>
            </div>
          </div>

          {/* Opciones Principales de Navegación */}
          <div className="settings-menu-list">
            {/* 1. Selector de Dificultad */}
            <div
              className="settings-menu-item"
              onClick={() => {
                onClose();
                onOpenGameMode();
              }}
              role="button"
              tabIndex={0}
            >
              <div className="menu-item-left">
                <div className="menu-icon-pill" style={{ backgroundColor: `${modeInfo.badgeColor}20`, color: modeInfo.badgeColor }}>
                  <Sliders size={18} />
                </div>
                <div>
                  <span className="menu-item-title">Modo de Juego</span>
                  <span className="menu-item-sub">{modeInfo.nombre} ({modeInfo.intentos} intentos)</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-muted" />
            </div>

            {/* 2. Catálogo de Desafíos */}
            <div
              className="settings-menu-item"
              onClick={() => {
                onClose();
                onOpenCatalog();
              }}
              role="button"
              tabIndex={0}
            >
              <div className="menu-item-left">
                <div className="menu-icon-pill icon-cyan">
                  <ListOrdered size={18} />
                </div>
                <div>
                  <span className="menu-item-title">Catálogo y Niveles</span>
                  <span className="menu-item-sub">Ver todas las preguntas (Junior, Mid, Senior)</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-muted" />
            </div>

            {/* 3. Tus Estadísticas */}
            <div
              className="settings-menu-item"
              onClick={() => {
                onClose();
                onOpenStats();
              }}
              role="button"
              tabIndex={0}
            >
              <div className="menu-item-left">
                <div className="menu-icon-pill icon-amber">
                  <BarChart3 size={18} />
                </div>
                <div>
                  <span className="menu-item-title">Tus Estadísticas</span>
                  <span className="menu-item-sub">Aciertos, rachas y distribución</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-muted" />
            </div>

            {/* 4. ¿Cómo se Juega? */}
            <div
              className="settings-menu-item"
              onClick={() => {
                onClose();
                onOpenHelp();
              }}
              role="button"
              tabIndex={0}
            >
              <div className="menu-item-left">
                <div className="menu-icon-pill icon-indigo">
                  <HelpCircle size={18} />
                </div>
                <div>
                  <span className="menu-item-title">Instrucciones y Reglas</span>
                  <span className="menu-item-sub">Mecánica de colores y modalidades</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-muted" />
            </div>
          </div>

          {/* Preferencias de Hardware / Dispositivo */}
          <div className="settings-section">
            <span className="settings-section-title">Preferencias del Dispositivo</span>

            {/* Switch de Sonido */}
            <div className="setting-toggle-row">
              <div className="toggle-label-group">
                {soundEnabled ? <Volume2 size={18} className="text-cyan" /> : <VolumeX size={18} className="text-muted" />}
                <div>
                  <span className="toggle-title">Efectos de Sonido</span>
                  <span className="toggle-sub">Chimes armónicos y clicks mecánicos</span>
                </div>
              </div>
              <button
                type="button"
                className={`toggle-switch-btn ${soundEnabled ? 'active' : ''}`}
                onClick={onToggleSound}
                aria-label="Alternar sonido"
              >
                <div className="toggle-switch-circle" />
              </button>
            </div>

            {/* Switch de Vibración Háptica */}
            <div className="setting-toggle-row">
              <div className="toggle-label-group">
                {hapticsEnabled ? <SmartphoneNfc size={18} className="text-emerald" /> : <Smartphone size={18} className="text-muted" />}
                <div>
                  <span className="toggle-title">Vibración Háptica (Móvil)</span>
                  <span className="toggle-sub">Retroalimentación táctil al pulsar teclas</span>
                </div>
              </div>
              <button
                type="button"
                className={`toggle-switch-btn ${hapticsEnabled ? 'active' : ''}`}
                onClick={onToggleHaptics}
                aria-label="Alternar vibración háptica"
              >
                <div className="toggle-switch-circle" />
              </button>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
