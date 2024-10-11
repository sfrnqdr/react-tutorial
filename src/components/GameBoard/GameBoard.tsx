// src/components/GameBoard/GameBoard.tsx
import { useState } from "react";
import Cell from "../Cell/Cell";
import GameStatus from "../GameStatus/GameStatus.tsx"; // Neue Komponente importieren
import "./GameBoard.css";

const GameBoard = () => {
  const initialCells = Array(9).fill("");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X"); // Zustand für aktuellen Spieler
  const [winner, setWinner] = useState("");

  const checkWinner = (updatedCells: string[]) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        updatedCells[a] &&
        updatedCells[a] === updatedCells[b] &&
        updatedCells[a] === updatedCells[c]
      ) {
        return updatedCells[a];
      }
    }
    return null;
  };

  const handleCellClick = (index: number) => {
    if (cells[index] === "" && winner === "") {
      const newCells = [...cells];
      newCells[index] = currentPlayer;
      setCells(newCells);

      const gameWinner = checkWinner(newCells);
      if (gameWinner) {
        setWinner(gameWinner);
      } else if (!newCells.includes("")) {
        setWinner("draw"); // Unentschieden, wenn alle Felder gefüllt sind
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X"); // Spielerwechsel
      }
    }
  };

  const handleReset = () => {
    setCells(initialCells);
    setCurrentPlayer("X");
    setWinner("");
  };

  return (
    <div>
      <h2>Tic Tac Toe</h2>
      <GameStatus currentPlayer={currentPlayer} winner={winner} />
      <div className="board" role="grid">
        {cells.map((cell, index) => (
          <Cell
            key={index}
            value={cell}
            onClick={() => handleCellClick(index)}
          />
        ))}
      </div>
      <button onClick={handleReset}>Spiel zurücksetzen</button>
    </div>
  );
};

export default GameBoard;
