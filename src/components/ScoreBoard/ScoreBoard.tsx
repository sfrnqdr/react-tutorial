// src/ScoreBoard.tsx
import React from "react";
import "./ScoreBoard.css";

type ScoreBoardProps = {
  score: {
    X: number;
    O: number;
  };
};

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  return (
    <div className="score-board">
      <h3>
        Spielstand: X: {score.X} - O: {score.O}
      </h3>
    </div>
  );
};

export default ScoreBoard;
