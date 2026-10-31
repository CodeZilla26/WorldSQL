import React, { useState } from 'react';
import { BookOpen, X, Layers, Code, Zap, ShieldAlert } from 'lucide-react';

interface CheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'orden' | 'sublenguajes' | 'joins' | 'reglas'>('orden');

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-window cheatsheet-window" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <BookOpen size={22} className="text-emerald" />
            <div>
              <h3>Manual Rápido de SQL</h3>
              <p className="modal-subtitle">Fundamentos teóricos y arquitectura de bases de datos relacionales</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Cerrar manual">
            <X size={18} />
          </button>
        </div>

        {/* Pestañas de Navegación del Manual */}
        <div className="cheatsheet-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'orden' ? 'active' : ''}`}
            onClick={() => setActiveTab('orden')}
          >
            <Zap size={14} />
            <span>Orden de Ejecución</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'sublenguajes' ? 'active' : ''}`}
            onClick={() => setActiveTab('sublenguajes')}
          >
            <Layers size={14} />
            <span>DDL, DML, DQL & TCL</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'joins' ? 'active' : ''}`}
            onClick={() => setActiveTab('joins')}
          >
            <Code size={14} />
            <span>INNER vs LEFT JOIN</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'reglas' ? 'active' : ''}`}
            onClick={() => setActiveTab('reglas')}
          >
            <ShieldAlert size={14} />
            <span>Reglas de Oro</span>
          </button>
        </div>

        <div className="modal-content">
          {/* TAB 1: ORDEN DE EJECUCIÓN */}
          {activeTab === 'orden' && (
            <div className="tab-pane animate-fade-in">
              <div className="concept-box-intro">
                <strong>⚡ El Secreto Maestro:</strong> En SQL, el orden en que escribes la consulta NO es el orden en que el motor de la BD la procesa físicamente.
              </div>

              <div className="execution-comparison-grid">
                <div className="execution-column">
                  <h6>1. Orden en que lo Escribes</h6>
                  <ol className="step-list written-steps">
                    <li><code>1. SELECT</code> (Proyectar columnas)</li>
                    <li><code>2. FROM & JOIN</code> (Elegir tablas)</li>
                    <li><code>3. WHERE</code> (Filtrar filas individuales)</li>
                    <li><code>4. GROUP BY</code> (Agrupar registros)</li>
                    <li><code>5. HAVING</code> (Filtrar grupos calculados)</li>
                    <li><code>6. ORDER BY</code> (Ordenar filas resultantes)</li>
                    <li><code>7. LIMIT / OFFSET</code> (Recortar número de filas)</li>
                  </ol>
                </div>

                <div className="execution-column execution-highlight">
                  <h6>2. Orden Real del Motor (DBMS)</h6>
                  <ol className="step-list engine-steps">
                    <li><span className="step-badge">1</span> <code>FROM & JOIN</code> (Carga las tablas en memoria)</li>
                    <li><span className="step-badge">2</span> <code>WHERE</code> (Descarta filas fila por fila)</li>
                    <li><span className="step-badge">3</span> <code>GROUP BY</code> (Divide filas en subconjuntos)</li>
                    <li><span className="step-badge">4</span> <code>HAVING</code> (Filtra métricas agregadas)</li>
                    <li><span className="step-badge">5</span> <code>SELECT</code> (Calcula columnas y crea alias)</li>
                    <li><span className="step-badge">6</span> <code>DISTINCT</code> (Elimina filas idénticas)</li>
                    <li><span className="step-badge">7</span> <code>ORDER BY</code> (Ordena los datos)</li>
                    <li><span className="step-badge">8</span> <code>LIMIT</code> (Devuelve la porción pedida)</li>
                  </ol>
                </div>
              </div>

              <div className="cheatsheet-callout">
                <strong>¿Por qué falla <code>WHERE precio_total &gt; 100</code> si creaste el alias en el SELECT?</strong>
                <p>Porque el motor ejecuta el <strong>WHERE (Paso 2)</strong> antes de que el <strong>SELECT (Paso 5)</strong> haya creado el alias.</p>
              </div>
            </div>
          )}

          {/* TAB 2: SUBLENGUAJES */}
          {activeTab === 'sublenguajes' && (
            <div className="tab-pane animate-fade-in">
              <div className="sublanguage-card-grid">
                <div className="sublanguage-card">
                  <div className="sublanguage-header">
                    <span className="sublanguage-pill pill-ddl">DDL</span>
                    <h6>Data Definition Language</h6>
                  </div>
                  <p>Define o altera la arquitectura física de tablas, bases de datos e índices.</p>
                  <div className="sublanguage-commands">
                    <code>CREATE</code> <code>ALTER</code> <code>DROP</code> <code>TRUNCATE</code>
                  </div>
                </div>

                <div className="sublanguage-card">
                  <div className="sublanguage-header">
                    <span className="sublanguage-pill pill-dml">DML</span>
                    <h6>Data Manipulation Language</h6>
                  </div>
                  <p>Modifica, inserta o elimina filas guardadas dentro de las tablas existentes.</p>
                  <div className="sublanguage-commands">
                    <code>INSERT</code> <code>UPDATE</code> <code>DELETE</code>
                  </div>
                </div>

                <div className="sublanguage-card">
                  <div className="sublanguage-header">
                    <span className="sublanguage-pill pill-dql">DQL</span>
                    <h6>Data Query Language</h6>
                  </div>
                  <p>Consulta, filtra y proyecta información sin alterar el estado en disco.</p>
                  <div className="sublanguage-commands">
                    <code>SELECT</code> <code>WHERE</code> <code>GROUP BY</code> <code>HAVING</code>
                  </div>
                </div>

                <div className="sublanguage-card">
                  <div className="sublanguage-header">
                    <span className="sublanguage-pill pill-tcl">TCL</span>
                    <h6>Transaction Control Language</h6>
                  </div>
                  <p>Controla la atomicidad y persistencia de transacciones (Principios ACID).</p>
                  <div className="sublanguage-commands">
                    <code>COMMIT</code> <code>ROLLBACK</code> <code>SAVEPOINT</code>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: JOINS */}
          {activeTab === 'joins' && (
            <div className="tab-pane animate-fade-in">
              <div className="joins-comparison">
                <div className="join-item">
                  <h5>INNER JOIN (Intersección Matemática)</h5>
                  <p>Solo devuelve filas donde exista una coincidencia exacta en ambas tablas según la condición del <code>ON</code>.</p>
                  <pre className="code-box-pre">
                    <code>{`SELECT c.nombre, p.fecha\nFROM clientes c\nINNER JOIN pedidos p ON c.id = p.cliente_id;`}</code>
                  </pre>
                  <span className="join-tip">Si un cliente no tiene pedidos, NO aparece en el resultado.</span>
                </div>

                <div className="join-item">
                  <h5>LEFT JOIN (Inclusión Total de la Izquierda)</h5>
                  <p>Conserva el 100% de las filas de la primera tabla (la del <code>FROM</code>). Si no hay coincidencia en la segunda, llena los campos con <code>NULL</code>.</p>
                  <pre className="code-box-pre">
                    <code>{`SELECT c.nombre, COUNT(p.id) AS total_pedidos\nFROM clientes c\nLEFT JOIN pedidos p ON c.id = p.cliente_id\nGROUP BY c.id, c.nombre;`}</code>
                  </pre>
                  <span className="join-tip">Permite ver clientes incluso si tienen 0 pedidos registrados.</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: REGLAS DE ORO */}
          {activeTab === 'reglas' && (
            <div className="tab-pane animate-fade-in">
              <ul className="golden-rules-checklist">
                <li>
                  <strong>1. NUNCA ejecutes un UPDATE o DELETE sin WHERE:</strong>
                  <p>En ambientes de producción, un descuido puede vaciar o sobreescribir la información de toda la empresa.</p>
                </li>
                <li>
                  <strong>2. Evita <code>SELECT *</code> en APIs y Producción:</strong>
                  <p>Pide únicamente las columnas que tu frontend necesita para ahorrar memoria RAM y tráfico de red.</p>
                </li>
                <li>
                  <strong>3. Usa tipos DECIMAL para dinero, nunca FLOAT:</strong>
                  <p>Los números de punto flotante en informática sufren de errores de redondeo binario acumulativo.</p>
                </li>
                <li>
                  <strong>4. Claves Foráneas con ON DELETE explícito:</strong>
                  <p>Decide siempre si al borrar un registro padre sus hijos deben borrarse en cascada (<code>CASCADE</code>) o bloquearse (<code>RESTRICT</code>).</p>
                </li>
                <li>
                  <strong>5. Índices en columnas de búsqueda frecuente:</strong>
                  <p>Crea índices en columnas que uses continuamente en el <code>WHERE</code> o <code>JOIN</code> para acelerar el tiempo de respuesta de segundos a milisegundos.</p>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-primary" onClick={onClose}>
            Entendido, Volver al Desafío
          </button>
        </div>
      </div>
    </div>
  );
};
