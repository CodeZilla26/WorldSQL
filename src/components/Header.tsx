import React from 'react';
import {
  Database,
  Volume2,
  VolumeX,
  BarChart3,
  ListOrdered,
  HelpCircle,
  BookOpen,
  ChevronDown
} from 'lucide-react';
import type { Topic } from '../types/game';

interface HeaderProps {
  currentTopic: Topic;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenStats: () => void;
  onOpenCatalog: () => void;
  onOpenHelp: () => void;
  onOpenCheatSheet: () => void;
  onOpenTopicSelect: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTopic,
  soundEnabled,
  onToggleSound,
  onOpenStats,
  onOpenCatalog,
  onOpenHelp,
  onOpenCheatSheet,
  onOpenTopicSelect
}) => {
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
          <button
            type="button"
            className="topic-selector-pill"
            onClick={onOpenTopicSelect}
            title="Cambiar tema de aprendizaje"
          >
            <span className="topic-dot" style={{ backgroundColor: currentTopic.color }} />
            <span className="topic-name">{currentTopic.nombre}</span>
            <ChevronDown size={14} className="topic-arrow" />
          </button>
        </div>
      </div>

      <nav className="header-actions" aria-label="Acciones de la aplicación">
        {currentTopic.id === 'sql' && (
          <button
            type="button"
            className="icon-action-btn"
            onClick={onOpenCheatSheet}
            title="Guía Rápida SQL (Cheat Sheet)"
            aria-label="Guía Rápida SQL"
          >
            <BookOpen size={19} />
          </button>
        )}

        <button
          type="button"
          className="icon-action-btn"
          onClick={onOpenCatalog}
          title="Catálogo de Desafíos y Progreso"
          aria-label="Catálogo de Desafíos"
        >
          <ListOrdered size={19} />
        </button>

        <button
          type="button"
          className="icon-action-btn"
          onClick={onOpenStats}
          title="Tus Estadísticas"
          aria-label="Tus Estadísticas"
        >
          <BarChart3 size={19} />
        </button>

        <button
          type="button"
          className="icon-action-btn"
          onClick={onToggleSound}
          title={soundEnabled ? 'Silenciar Efectos de Sonido' : 'Activar Sonido'}
          aria-label="Control de sonido"
        >
          {soundEnabled ? <Volume2 size={19} /> : <VolumeX size={19} className="text-muted" />}
        </button>

        <button
          type="button"
          className="icon-action-btn"
          onClick={onOpenHelp}
          title="¿Cómo se Juega?"
          aria-label="Instrucciones"
        >
          <HelpCircle size={19} />
        </button>
      </nav>
    </header>
  );
};
