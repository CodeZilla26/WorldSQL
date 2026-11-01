import React, { useState, useMemo } from 'react';
import {
  Compass,
  X,
  Search,
  CheckCircle2,
  ChevronRight,
  Check,
  Terminal,
  Layers,
  Bug,
  Briefcase
} from 'lucide-react';
import type { Question, TipoPregunta } from '../../types/game';

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicName: string;
  questions: Question[];
  currentQuestionIndex: number;
  solvedIds: number[];
  onSelectQuestion: (index: number) => void;
}

export const CatalogModal: React.FC<CatalogModalProps> = ({
  isOpen,
  onClose,
  topicName,
  questions,
  currentQuestionIndex,
  solvedIds,
  onSelectQuestion
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNivel, setSelectedNivel] = useState<string>('ALL');
  const [selectedTipo, setSelectedTipo] = useState<string>('ALL');

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchesSearch =
        searchTerm === '' ||
        q.palabra.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.pregunta.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.categoria.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesNivel = selectedNivel === 'ALL' || q.nivel === selectedNivel;
      const matchesTipo = selectedTipo === 'ALL' || q.tipo === selectedTipo;

      return matchesSearch && matchesNivel && matchesTipo;
    });
  }, [questions, searchTerm, selectedNivel, selectedTipo]);

  if (!isOpen) return null;

  const totalCount = questions.length;
  const solvedCount = solvedIds.length;
  const percentage = Math.round((solvedCount / totalCount) * 100);

  const getTipoIcon = (tipo: TipoPregunta) => {
    switch (tipo) {
      case 'debugging':
        return <Bug size={11} className="text-rose" />;
      case 'entrevista':
        return <Briefcase size={11} className="text-purple" />;
      case 'concepto':
        return <Layers size={11} className="text-indigo" />;
      default:
        return <Terminal size={11} className="text-cyan" />;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-window catalog-window" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <Compass size={22} className="text-cyan" />
            <div>
              <h3>Mapa de Aprendizaje por Niveles</h3>
              <p className="modal-subtitle">{topicName}</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Cerrar mapa">
            <X size={18} />
          </button>
        </div>

        <div className="modal-content">
          {/* Barra de progreso global */}
          <div className="catalog-progress-card">
            <div className="progress-label-row">
              <span>Progreso Global del Curso</span>
              <strong>
                {solvedCount} de {totalCount} conceptos dominados ({percentage}%)
              </strong>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${percentage}%` }} />
            </div>
          </div>

          {/* Barra de búsqueda */}
          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por comando, concepto, debugging o categoría..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchTerm('')}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filtros por Nivel (Junior, Semi-Senior, Senior) */}
          <div className="filters-section-group">
            <span className="filter-group-label">Filtrar por Nivel de Carrera:</span>
            <div className="category-chips-scroll">
              {[
                { id: 'ALL', label: 'Todos los Niveles' },
                { id: 'Junior', label: '🌱 Junior' },
                { id: 'Semi-Senior', label: '⚡ Semi-Senior (Mid)' },
                { id: 'Senior', label: '🔥 Senior & DBA' }
              ].map(item => (
                <button
                  key={`nivel-${item.id}`}
                  type="button"
                  className={`category-chip ${selectedNivel === item.id ? 'active' : ''}`}
                  onClick={() => setSelectedNivel(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filtros por Modalidad de Pregunta */}
          <div className="filters-section-group">
            <span className="filter-group-label">Filtrar por Formato:</span>
            <div className="category-chips-scroll">
              {[
                { id: 'ALL', label: 'Todas las Modalidades' },
                { id: 'codigo-slot', label: '💻 Consultas SQL' },
                { id: 'concepto', label: '📚 Conceptos Puros' },
                { id: 'debugging', label: '🐛 Debugging' },
                { id: 'entrevista', label: '💼 Entrevista Técnica' }
              ].map(item => (
                <button
                  key={`tipo-${item.id}`}
                  type="button"
                  className={`category-chip ${selectedTipo === item.id ? 'active' : ''}`}
                  onClick={() => setSelectedTipo(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de Desafíos */}
          <div className="catalog-grid">
            {filteredQuestions.length === 0 ? (
              <div className="empty-catalog-message">
                <p>No se encontraron desafíos que coincidan con los filtros seleccionados.</p>
              </div>
            ) : (
              filteredQuestions.map(q => {
                const originalIndex = questions.findIndex(orig => orig.id === q.id);
                const isSolved = solvedIds.includes(q.id);
                const isCurrent = originalIndex === currentQuestionIndex;

                const nivelBadgeColor =
                  q.nivel === 'Junior'
                    ? 'chip-junior'
                    : q.nivel === 'Semi-Senior'
                    ? 'chip-mid'
                    : 'chip-senior';

                return (
                  <div
                    key={`q-item-${q.id}`}
                    className={`catalog-item ${isCurrent ? 'item-current' : ''} ${
                      isSolved ? 'item-solved' : ''
                    }`}
                    onClick={() => onSelectQuestion(originalIndex)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="item-left">
                      <div className="item-status-icon">
                        {isSolved ? (
                          <CheckCircle2 size={18} className="text-emerald" />
                        ) : isCurrent ? (
                          <span className="current-pulsing-dot" />
                        ) : (
                          <span className="item-num-badge">#{q.id}</span>
                        )}
                      </div>
                      <div className="item-details">
                        <div className="item-header-tags">
                          <span className={`item-level-tag ${nivelBadgeColor}`}>{q.nivel}</span>
                          <span className="item-type-tag">
                            {getTipoIcon(q.tipo)}
                            {q.tipo === 'debugging'
                              ? 'Bug'
                              : q.tipo === 'entrevista'
                              ? 'Entrevista'
                              : q.tipo === 'concepto'
                              ? 'Concepto'
                              : 'Código'}
                          </span>
                          <span className="item-category-tag">{q.categoria}</span>
                          <span className="item-letters-tag">{q.palabra.length} letras</span>
                          {isSolved && (
                            <span className="item-solved-tag">
                              <Check size={11} /> {q.palabra}
                            </span>
                          )}
                        </div>
                        <p className="item-prompt-preview">{q.pregunta}</p>
                      </div>
                    </div>
                    <div className="item-action-arrow">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cerrar Mapa
          </button>
        </div>
      </div>
    </div>
  );
};
