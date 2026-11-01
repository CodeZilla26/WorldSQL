import React from 'react';
import type { TileEvaluation } from '../types/game';

interface WordleBoardProps {
  wordLength: number;
  guesses: string[];
  evaluations: TileEvaluation[][];
  currentGuess: string;
  isShakingRow: boolean;
  isRowEvaluating: boolean;
  maxAttempts: number;
}

export const WordleBoard: React.FC<WordleBoardProps> = ({
  wordLength,
  guesses,
  evaluations,
  currentGuess,
  isShakingRow,
  isRowEvaluating,
  maxAttempts
}) => {
  const rows = Array.from({ length: maxAttempts });

  return (
    <section className="board-container" aria-label="Tablero Wordle">
      <div
        className="wordle-board"
        style={{
          gridTemplateColumns: `repeat(${wordLength}, minmax(0, 1fr))`
        }}
      >
        {rows.map((_, rowIndex) => {
          const isCurrentRow = rowIndex === guesses.length;
          const isSubmittedRow = rowIndex < guesses.length;
          const rowShaking = isCurrentRow && isShakingRow;

          return (
            <div
              key={`row-${rowIndex}`}
              className={`board-row ${rowShaking ? 'shake-row' : ''}`}
              style={{
                gridTemplateColumns: `repeat(${wordLength}, minmax(0, 1fr))`
              }}
            >
              {Array.from({ length: wordLength }).map((_, colIndex) => {
                let letter = '';
                let tileStatus = 'empty';
                let animationDelayStyle = {};

                if (isSubmittedRow) {
                  const evaluation = evaluations[rowIndex]?.[colIndex];
                  letter = evaluation?.letter || '';
                  tileStatus = evaluation?.status || 'absent';
                  // Animación de flip para la última fila evaluada
                  if (rowIndex === guesses.length - 1 && isRowEvaluating) {
                    animationDelayStyle = { animationDelay: `${colIndex * 200}ms` };
                  }
                } else if (isCurrentRow) {
                  letter = currentGuess[colIndex] || '';
                  tileStatus = letter ? 'tbd' : 'empty';
                }

                return (
                  <div
                    key={`tile-${rowIndex}-${colIndex}`}
                    className={`wordle-tile tile-${tileStatus} ${letter ? 'has-letter' : ''}`}
                    style={animationDelayStyle}
                  >
                    <span className="tile-letter">{letter}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
};
