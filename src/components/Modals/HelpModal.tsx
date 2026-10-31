import React from 'react';
import { HelpCircle, X, Sparkles, Check, Lightbulb } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-window help-window" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <HelpCircle size={22} className="text-cyan" />
            <h3>¿Cómo se Juega a DevWordle?</h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Cerrar ayuda">
            <X size={18} />
          </button>
        </div>

        <div className="modal-content">
          <div className="help-intro-card">
            <Sparkles size={20} className="text-amber" />
            <p>
              A diferencia del Wordle tradicional, <strong>aquí no juegas a adivinar a ciegas</strong>.
              Cada ronda te presenta una <strong>pregunta teórica o un fragmento de código real con un hueco a completar</strong>.
            </p>
          </div>

          <div className="pedagogy-card">
            <div className="pedagogy-header">
              <Lightbulb size={16} className="text-cyan" />
              <h5>Mecánica de Colores:</h5>
            </div>
            <p style={{ marginBottom: '12px' }}>
              Escribe con tu teclado físico o con el teclado en pantalla y pulsa <strong>ENTER</strong>. Cada letra cambiará de color:
            </p>

            <div className="color-example-list">
              <div className="color-example-row">
                <div className="mini-tile tile-correct">S</div>
                <div>
                  <strong className="text-emerald">Verde (Correcta):</strong>
                  <p>La letra está en la palabra clave y en la posición exacta.</p>
                </div>
              </div>

              <div className="color-example-row">
                <div className="mini-tile tile-present">E</div>
                <div>
                  <strong className="text-amber">Amarillo (Presente):</strong>
                  <p>La letra sí forma parte de la palabra clave, pero en otra casilla.</p>
                </div>
              </div>

              <div className="color-example-row">
                <div className="mini-tile tile-absent">X</div>
                <div>
                  <strong className="text-muted">Gris (Ausente):</strong>
                  <p>La letra no pertenece a la palabra clave buscada.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pedagogy-card">
            <div className="pedagogy-header">
              <Check size={16} className="text-emerald" />
              <h5>Reglas del Juego:</h5>
            </div>
            <ul className="help-rules-list">
              <li>Dispones de <strong>5 intentos</strong> para deducir la palabra clave.</li>
              <li>La cuadrícula adapta dinámicamente su número de casillas a la longitud exacta de la palabra del desafío.</li>
              <li>Si te quedas atascado, puedes presionar el botón <strong>"Ver Pista"</strong>.</li>
              <li>Al terminar la ronda (aciertes o uses tus 5 intentos), se desbloqueará una <strong>Explicación Profunda</strong> con concepto teórico, sintaxis estándar, conexión en proyectos reales y la regla de oro para evitar errores de producción.</li>
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-primary" onClick={onClose}>
            ¡Entendido, a Practicar!
          </button>
        </div>
      </div>
    </div>
  );
};
