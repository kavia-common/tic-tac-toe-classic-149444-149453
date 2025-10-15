import React, { useMemo, useState } from 'react';
import './index.css';
import './App.css';
import Board from './components/Board';

/**
 * Main App for the Tic Tac Toe game.
 * Modern minimalist UI using the Ocean Professional theme.
 */
// PUBLIC_INTERFACE
function App() {
  // Game state: 9 squares, current player X/O, and if game is over
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  // Compute winner and isDraw from current board
  const winner = useMemo(() => calculateWinner(squares), [squares]);
  const isDraw = useMemo(() => !winner && squares.every((s) => s !== null), [winner, squares]);

  const currentPlayer = xIsNext ? 'X' : 'O';

  // PUBLIC_INTERFACE
  const handleSquareClick = (index) => {
    // Ignore clicks if square filled or game finished
    if (squares[index] || winner) return;

    const next = squares.slice();
    next[index] = xIsNext ? 'X' : 'O';
    setSquares(next);
    setXIsNext(!xIsNext);
  };

  // PUBLIC_INTERFACE
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  // Status message content and color
  const { statusText, statusClass } = useMemo(() => {
    if (winner) {
      return { statusText: `Winner: ${winner}`, statusClass: 'status status--win' };
    }
    if (isDraw) {
      return { statusText: 'Draw', statusClass: 'status status--draw' };
    }
    return { statusText: `Turn: ${currentPlayer}`, statusClass: 'status status--turn' };
  }, [winner, isDraw, currentPlayer]);

  return (
    <div className="app-root">
      <div className="app-surface">
        <header className="app-header">
          <h1 className="title">Tic Tac Toe</h1>
          <p className={statusClass} aria-live="polite">{statusText}</p>
        </header>

        <main className="game-area">
          <Board
            squares={squares}
            onSquareClick={handleSquareClick}
            gameOver={Boolean(winner) || isDraw}
            currentPlayer={currentPlayer}
          />
        </main>

        <footer className="actions">
          <button className="btn btn-primary" onClick={resetGame} aria-label="Restart Game">
            Restart Game
          </button>
        </footer>
      </div>
    </div>
  );
}

/**
 * Determine winner given a 3x3 board array.
 * @param {Array<string|null>} sq - 9-length array of 'X' | 'O' | null
 * @returns {'X'|'O'|null}
 */
function calculateWinner(sq) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
      return sq[a];
    }
  }
  return null;
}

export default App;
