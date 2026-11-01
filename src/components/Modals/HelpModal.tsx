import React from 'react';
import { HelpCircle, X, Sparkles, Check, Lightbulb, Terminal, Layers, Bug, Briefcase, Sliders } from 'lucide-react';

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
            <div>
              <h3>¿Cómo se Juega a DevWordle SQL?</h3>
              <p className="modal-subtitle">Guía de mecánicas, modalidades y niveles</p>
            </div>
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
              Cada nivel presenta un desafío pedagógico para deducir una <strong>palabra clave real de SQL y bases de datos relacionales</strong>.
            </p>
          </div>

          {/* Modalidades de Pregunta */}
          <div className="pedagogy-card">
            <div className="pedagogy-header">
              <Sliders size={16} className="text-cyan" />
              <h5>4 Modalidades de Desafío:</h5>
            </div>
            <ul className="help-rules-list">
              <li>
                <strong className="text-cyan"><Terminal size={12} style={{ display: 'inline', marginRight: 4 }} /> 1. Consultas SQL:</strong>
                <span> Deducir la cláusula faltante en el hueco <code>[ ??? ]</code> de un script SQL real.</span>
              </li>
              <li>
                <strong className="text-indigo"><Layers size={12} style={{ display: 'inline', marginRight: 4 }} /> 2. Conceptos Puros:</strong>
                <span> Definiciones teóricas de arquitectura relacional, transacciones ACID y glosario formal.</span>
              </li>
              <li>
                <strong className="text-rose"><Bug size={12} style={{ display: 'inline', marginRight: 4 }} /> 3. Modo Debugging:</strong>
                <span> Analizar un fragmento con error de sintaxis o anti-patrón y escribir la palabra que lo soluciona.</span>
              </li>
              <li>
                <strong className="text-purple"><Briefcase size={12} style={{ display: 'inline', marginRight: 4 }} /> 4. Entrevistas Técnicas:</strong>
                <span> Resolver escenarios típicos planteados en pruebas técnicas para desarrolladores.</span>
              </li>
            </ul>
          </div>

          {/* Mecánica de Colores */}
          <div className="pedagogy-card">
            <div className="pedagogy-header">
              <Lightbulb size={16} className="text-amber" />
              <h5>Mecánica de Colores de Wordle:</h5>
            </div>
            <p style={{ marginBottom: '10px' }}>
              Escribe con tu teclado físico o virtual y pulsa <strong>ENTER</strong>. Cada letra cambiará de color:
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
                  <p>La letra forma parte de la palabra, pero en otra casilla.</p>
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

          {/* Modos de Dificultad */}
          <div className="pedagogy-card">
            <div className="pedagogy-header">
              <Check size={16} className="text-emerald" />
              <h5>Reglas y Modos de Dificultad (Selector en la barra superior):</h5>
            </div>
            <ul className="help-rules-list">
              <li>
                <strong className="text-emerald">🟢 Modo Fácil (6 intentos):</strong> Pistas desbloqueadas y botón para descartar 3 letras incorrectas del teclado.
              </li>
              <li>
                <strong className="text-cyan">🔵 Modo Normal (5 intentos):</strong> Reglas estándar balanceadas para ejercitar la memoria.
              </li>
              <li>
                <strong className="text-rose">🔴 Modo Difícil (4 intentos):</strong> Regla estricta donde toda letra verde o amarilla descubierta DEBE usarse obligatoriamente en los siguientes intentos.
              </li>
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-primary" onClick={onClose}>
            ¡Entendido, a Entrenar!
          </button>
        </div>
      </div>
    </div>
  );
};
