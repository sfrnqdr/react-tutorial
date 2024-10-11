// src/components/GameBoard/GameBoard.tsx
import Cell from "../Cell/Cell";
import GameStatus from "../GameStatus/GameStatus";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import useGameLogic from "../../hooks/useGameLogic";
import "./GameBoard.css";

const GameBoard = () => {
  const { cells, currentPlayer, winner, handleCellClick, handleReset } =
    useGameLogic();

  return (
    <div>
      <ScoreBoard score={{ X: 0, O: 0 }} />
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
