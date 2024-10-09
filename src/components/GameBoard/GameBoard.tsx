// src/GameBoard.tsx
import { useState, useEffect, useRef } from "react";
import Cell from "../Cell/Cell";
import StatusMessage from "../StatusMessage/StatusMessage";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import "./GameBoard.css";

const GameBoard = () => {
  const [cells, setCells] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");
  const [score, setScore] = useState({ X: 0, O: 0 });
  const firstCellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (winner) {
      document.title = `Spieler ${winner} gewinnt!`;
    } else {
      document.title = `Tic Tac Toe - Spieler ${currentPlayer} ist am Zug`;
    }
  }, [winner, currentPlayer]);

  useEffect(() => {
    if (firstCellRef.current) {
      firstCellRef.current.focus();
    }
  }, [cells]);

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

  const resetBoard = () => {
    setCells(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner("");
  };

  const handleCellClick = (index: number) => {
    if (cells[index] === "" && winner === "") {
      const newCells = [...cells];
      newCells[index] = currentPlayer;
      setCells(newCells);
      const gameWinner = checkWinner(newCells);
      if (gameWinner) {
        setWinner(gameWinner);
        setScore((prevScore) => ({
          ...prevScore,
          [gameWinner]: prevScore[gameWinner] + 1,
        }));
        // Optional: Automatisches Zurücksetzen des Brettes nach dem Sieg
        setTimeout(resetBoard, 2000);
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    }
  };

  return (
    <div>
      <h2>Tic Tac Toe</h2>
      <ScoreBoard score={score} />
      <StatusMessage currentPlayer={currentPlayer} winner={winner} />
      <div className="board" role="grid">
        {cells.map((cell, index) => (
          <Cell
            key={index}
            value={cell}
            onClick={() => handleCellClick(index)}
            ref={index === 0 ? firstCellRef : null}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
