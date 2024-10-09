// src/GameBoard.tsx
import Cell from "../Cell/Cell";
import "./GameBoard.css";

function GameBoard() {
  const initialCells = Array(9).fill("");

  return (
    <div>
      <h2>Tic Tac Toe</h2>
      <div className="board">
        {initialCells.map((cell, index) => (
          <Cell key={index} value={cell} />
        ))}
      </div>
    </div>
  );
}

export default GameBoard;
