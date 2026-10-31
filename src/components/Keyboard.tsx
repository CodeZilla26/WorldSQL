import React from 'react';
import { Delete } from 'lucide-react';
import type { TileStatus } from '../types/game';

interface KeyboardProps {
  keyboardStatuses: Record<string, TileStatus>;
  onAddLetter: (letter: string) => void;
  onRemoveLetter: () => void;
  onSubmit: () => void;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
];

export const Keyboard: React.FC<KeyboardProps> = ({
  keyboardStatuses,
  onAddLetter,
  onRemoveLetter,
  onSubmit
}) => {
  const handleKeyClick = (key: string) => {
    if (key === 'ENTER') {
      onSubmit();
    } else if (key === 'BACKSPACE') {
      onRemoveLetter();
    } else {
      onAddLetter(key);
    }
  };

  return (
    <section className="virtual-keyboard" aria-label="Teclado en pantalla">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={`kb-row-${rowIndex}`} className="keyboard-row">
          {row.map(key => {
            const isEnter = key === 'ENTER';
            const isBackspace = key === 'BACKSPACE';
            const isSpecial = isEnter || isBackspace;
            const status = keyboardStatuses[key] || '';
            const statusClass = status ? `key-${status}` : '';

            return (
              <button
                key={`kb-key-${key}`}
                type="button"
                className={`keyboard-key ${isSpecial ? 'special-key' : ''} ${statusClass}`}
                onClick={() => handleKeyClick(key)}
                aria-label={isBackspace ? 'Borrar letra' : isEnter ? 'Confirmar respuesta' : key}
              >
                {isBackspace ? (
                  <Delete size={20} className="backspace-icon" />
                ) : isEnter ? (
                  <span>ENTER</span>
                ) : (
                  <span>{key}</span>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </section>
  );
};
