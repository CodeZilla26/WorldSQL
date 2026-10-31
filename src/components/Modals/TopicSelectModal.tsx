import React from 'react';
import { Layers, X, Database, Code2, GitBranch, Terminal, Check } from 'lucide-react';
import { TOPICS } from '../../data/topics';
import type { Topic } from '../../types/game';

interface TopicSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTopicId: string;
  onSelectTopic: (topicId: string) => void;
}

export const TopicSelectModal: React.FC<TopicSelectModalProps> = ({
  isOpen,
  onClose,
  currentTopicId,
  onSelectTopic
}) => {
  if (!isOpen) return null;

  const getTopicIcon = (topic: Topic) => {
    switch (topic.id) {
      case 'sql':
        return <Database size={24} style={{ color: topic.color }} />;
      case 'javascript':
        return <Code2 size={24} style={{ color: topic.color }} />;
      case 'git':
        return <GitBranch size={24} style={{ color: topic.color }} />;
      default:
        return <Terminal size={24} style={{ color: topic.color }} />;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-window topic-window" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <Layers size={22} className="text-cyan" />
            <div>
              <h3>Rutas de Aprendizaje</h3>
              <p className="modal-subtitle">Selecciona el lenguaje o tecnología a entrenar</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Cerrar selector">
            <X size={18} />
          </button>
        </div>

        <div className="modal-content">
          <div className="topics-list">
            {TOPICS.map(topic => {
              const isSelected = topic.id === currentTopicId;

              return (
                <div
                  key={topic.id}
                  className={`topic-card ${isSelected ? 'topic-active' : ''}`}
                  onClick={() => {
                    onSelectTopic(topic.id);
                    onClose();
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="topic-card-icon">{getTopicIcon(topic)}</div>
                  <div className="topic-card-body">
                    <div className="topic-card-header">
                      <h4>{topic.nombre}</h4>
                      <span className="topic-badge-tag">{topic.badge}</span>
                    </div>
                    <p className="topic-subtitle">{topic.subtitulo}</p>
                    <p className="topic-desc">{topic.descripcion}</p>
                    <div className="topic-footer-info">
                      <span>{topic.preguntas.length} desafíos preparados</span>
                      {isSelected && (
                        <span className="current-track-indicator">
                          <Check size={14} /> Seleccionado actualmente
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
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
