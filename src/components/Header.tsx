import React from 'react';
import { Database, Settings, Flame, Check } from 'lucide-react';
import { getUserRank } from '../types/game';
import type { GameTab, UserProgress } from '../types/game';

interface HeaderProps {
  currentTab: GameTab;
  userProgress: UserProgress;
  dailyCompletedToday: boolean;
  onSelectTab: (tab: GameTab) => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  userProgress,
  dailyCompletedToday,
  onSelectTab,
  onOpenSettings
}) => {
  const currentRank = getUserRank(userProgress.xp);

  return (
    <header className="app-header">
      {/* Lado Izquierdo: Logo y Rango */}
      <div className="header-left">
        <div className="logo-badge" title="SQL Wordle">
          <Database size={20} className="logo-icon" />
        </div>
        <div className="logo-info">
          <h1 className="logo-title">
            SQL<span>Wordle</span>
          </h1>
          <div className="rank-pill" title={`${userProgress.xp} XP acumulados`}>
            <span>{currentRank.icon}</span>
            <span className="rank-name">{currentRank.title}</span>
            <span className="rank-xp-tiny">{userProgress.xp} XP</span>
          </div>
        </div>
      </div>

      {/* Centro: Selector de Pestaña (Práctica Libre vs Desafío Diario) */}
      <div className="header-center-tabs">
        <button
          type="button"
          className={`tab-toggle-pill ${currentTab === 'practica' ? 'active' : ''}`}
          onClick={() => onSelectTab('practica')}
          title="Modo Práctica: Explora todos los desafíos"
        >
          <span>Práctica</span>
        </button>

        <button
          type="button"
          className={`tab-toggle-pill ${currentTab === 'diario' ? 'active' : ''}`}
          onClick={() => onSelectTab('diario')}
          title="Desafío Diario: Mantén viva tu racha"
        >
          <Flame size={14} className={dailyCompletedToday ? 'text-amber' : 'text-rose'} />
          <span>Diario</span>
          {dailyCompletedToday ? (
            <span className="daily-done-dot" title="Completado hoy">
              <Check size={10} />
            </span>
          ) : (
            <span className="daily-pending-dot" title="Pendiente hoy" />
          )}
        </button>
      </div>

      {/* Lado Derecho: Racha y Botón Único de Ajustes */}
      <div className="header-actions">
        {/* Contador de Racha */}
        <div className="streak-pill" title={`Racha diaria: ${userProgress.dailyStreak} días consecutivos`}>
          <Flame size={16} className="streak-flame-icon" />
          <span className="streak-count">{userProgress.dailyStreak}</span>
        </div>

        {/* Botón de Menú y Ajustes */}
        <button
          type="button"
          className="icon-action-btn settings-main-btn"
          onClick={onOpenSettings}
          title="Ajustes, Modos y Menú"
          aria-label="Ajustes y Menú"
        >
          <Settings size={19} />
        </button>
      </div>
    </header>
  );
};
