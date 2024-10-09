// src/GameBoard.tsx
import { useEffect, useRef } from "react";
import useGameLogic from "../../hooks/useGameLogic";
import Cell from "../Cell/Cell";
import StatusMessage from "../StatusMessage/StatusMessage";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import "./GameBoard.css";

const GameBoard = () => {
  const { cells, currentPlayer, winner, score, handleCellClick, resetBoard } =
    useGameLogic();
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
