// src/GameBoard.tsx
import { useState } from "react";
import Cell from "../Cell/Cell";
import "./GameBoard.css";

const GameBoard = () => {
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState("");

  const checkWinner = (updatedCells: string[]) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        updatedCells[a] &&
        updatedCells[a] === updatedCells[b] &&
        updatedCells[a] === updatedCells[c]
      ) {
        return updatedCells[a];
      }
    }
    return "";
  };

  const handleCellClick = (index: number) => {
    if (cells[index] === "" && winner === "") {
      const newCells = [...cells];
      newCells[index] = "X";
      setCells(newCells);
      const gameWinner = checkWinner(newCells);
      if (gameWinner) {
        setWinner(gameWinner);
      }
    }
  };

  return (
    <div>
      <h2>Tic Tac Toe</h2>
      {winner && <h3>🎉 Spieler {winner} hat gewonnen!</h3>}
      <div className="board" role="grid">
        {cells.map((cell, index) => (
          <Cell
            key={index}
            value={cell}
            onClick={() => handleCellClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
