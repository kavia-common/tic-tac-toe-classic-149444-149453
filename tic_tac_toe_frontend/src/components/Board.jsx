import React from 'react';
import Square from './Square';

/**
 * Board component renders a 3x3 grid of squares.
 * Props:
 * - squares: array of 9 values ('X' | 'O' | null)
 * - onSquareClick: function(index) to handle square click
 * - gameOver: boolean to disable interactions after end
 * - currentPlayer: 'X' | 'O' for status labels
 */
// PUBLIC_INTERFACE
function Board({ squares, onSquareClick, gameOver, currentPlayer }) {
  const renderSquare = (i) => (
    <Square
      key={i}
      value={squares[i]}
      disabled={Boolean(squares[i]) || gameOver}
      onClick={() => onSquareClick(i)}
      ariaLabel={
        squares[i]
          ? `Square ${i + 1}, filled with ${squares[i]}`
          : `Square ${i + 1}, empty. ${currentPlayer}'s turn`
      }
    />
  );

  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      <div className="board-row" role="row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row" role="row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row" role="row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

export default Board;
