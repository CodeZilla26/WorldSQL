import React, { useState, useMemo } from 'react';
import { Compass, X, Search, CheckCircle2, ChevronRight, Check } from 'lucide-react';
import type { Question } from '../../types/game';

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
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = useMemo(() => {
    const set = new Set<string>();
    questions.forEach(q => set.add(q.categoria));
    return ['ALL', ...Array.from(set)];
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchesSearch =
        searchTerm === '' ||
        q.palabra.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.pregunta.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.categoria.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'ALL' || q.categoria === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [questions, searchTerm, selectedCategory]);

  if (!isOpen) return null;

  const totalCount = questions.length;
  const solvedCount = solvedIds.length;
  const percentage = Math.round((solvedCount / totalCount) * 100);

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-window catalog-window" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <Compass size={22} className="text-cyan" />
            <div>
              <h3>Mapa de Aprendizaje</h3>
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
              <span>Progreso del Curso</span>
              <strong>
                {solvedCount} de {totalCount} completados ({percentage}%)
              </strong>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Barra de búsqueda y filtros */}
          <div className="catalog-filters-row">
            <div className="search-input-wrapper">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Buscar comando, concepto o categoría..."
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

            <div className="category-chips-scroll">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === 'ALL' ? 'Todos los Temas' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de Desafíos */}
          <div className="catalog-grid">
            {filteredQuestions.length === 0 ? (
              <div className="empty-catalog-message">
                <p>No se encontraron desafíos que coincidan con tu búsqueda.</p>
              </div>
            ) : (
              filteredQuestions.map(q => {
                const originalIndex = questions.findIndex(orig => orig.id === q.id);
                const isSolved = solvedIds.includes(q.id);
                const isCurrent = originalIndex === currentQuestionIndex;

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
