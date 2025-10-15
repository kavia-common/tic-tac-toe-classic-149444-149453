import React from 'react';

/**
 * Single square button for the Tic Tac Toe board.
 * Props:
 * - value: 'X' | 'O' | null
 * - onClick: () => void
 * - disabled: boolean
 * - ariaLabel: string
 */
// PUBLIC_INTERFACE
function Square({ value, onClick, disabled, ariaLabel }) {
  const contentClass =
    value === 'X' ? 'square-value square-x' : value === 'O' ? 'square-value square-o' : 'square-value';
  return (
    <button
      type="button"
      className="square"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <span className={contentClass}>{value || ''}</span>
    </button>
  );
}

export default Square;
