import React from 'react';
import {
  Database,
  Volume2,
  VolumeX,
  BarChart3,
  ListOrdered,
  HelpCircle,
  BookOpen,
  Sliders
} from 'lucide-react';
import type { Topic, GameMode } from '../types/game';
import { GAME_MODES } from '../data/gameModes';

interface HeaderProps {
  currentTopic: Topic;
  gameMode: GameMode;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenStats: () => void;
  onOpenCatalog: () => void;
  onOpenHelp: () => void;
  onOpenCheatSheet: () => void;
  onOpenTopicSelect: () => void;
  onOpenGameMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTopic,
  gameMode,
  soundEnabled,
  onToggleSound,
  onOpenStats,
  onOpenCatalog,
  onOpenHelp,
  onOpenCheatSheet,
  onOpenTopicSelect,
  onOpenGameMode
}) => {
  const modeInfo = GAME_MODES[gameMode];

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo-badge" title="DevWordle">
          <Database size={20} className="logo-icon" />
        </div>
        <div className="logo-info">
          <h1 className="logo-title">
            Dev<span>Wordle</span>
          </h1>
          <div className="pills-row">
            {/* Pill del Tema actual (SQL) */}
            <button
              type="button"
              className="topic-selector-pill"
              onClick={onOpenTopicSelect}
              title="Ver tema de estudio actual"
            >
              <span className="topic-dot" style={{ backgroundColor: currentTopic.color }} />
              <span className="topic-name">{currentTopic.nombre}</span>
            </button>

            {/* Pill del Modo de Dificultad (Fácil / Normal / Difícil) */}
            <button
              type="button"
              className="gamemode-selector-pill"
              onClick={onOpenGameMode}
              title="Cambiar reglas o modo de dificultad"
            >
              <span className="mode-indicator-dot" style={{ backgroundColor: modeInfo.badgeColor }} />
              <span>{gameMode === 'facil' ? 'Fácil' : gameMode === 'normal' ? 'Normal' : 'Difícil'}</span>
            </button>
          </div>
        </div>
      </div>

      <nav className="header-actions" aria-label="Acciones de la aplicación">
        <button
          type="button"
          className="icon-action-btn"
          onClick={onOpenGameMode}
          title="Ajustar Reglas y Dificultad"
          aria-label="Reglas y Dificultad"
        >
          <Sliders size={18} />
        </button>

        {currentTopic.id === 'sql' && (
          <button
            type="button"
            className="icon-action-btn"
            onClick={onOpenCheatSheet}
            title="Manual Rápido SQL (Cheat Sheet)"
            aria-label="Guía Rápida SQL"
          >
            <BookOpen size={18} />
          </button>
        )}

        <button
          type="button"
          className="icon-action-btn"
          onClick={onOpenCatalog}
          title="Catálogo de Desafíos por Nivel y Tipo"
          aria-label="Catálogo de Desafíos"
        >
          <ListOrdered size={18} />
        </button>

        <button
          type="button"
          className="icon-action-btn"
          onClick={onOpenStats}
          title="Tus Estadísticas"
          aria-label="Tus Estadísticas"
        >
          <BarChart3 size={18} />
        </button>

        <button
          type="button"
          className="icon-action-btn"
          onClick={onToggleSound}
          title={soundEnabled ? 'Silenciar Efectos de Sonido' : 'Activar Sonido'}
          aria-label="Control de sonido"
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} className="text-muted" />}
        </button>

        <button
          type="button"
          className="icon-action-btn"
          onClick={onOpenHelp}
          title="¿Cómo se Juega?"
          aria-label="Instrucciones"
        >
          <HelpCircle size={18} />
        </button>
      </nav>
    </header>
  );
};
