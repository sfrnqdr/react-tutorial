// src/GameResults.tsx
import React from "react";

type GameResultsProps = {
  results: { winner: string; timestamp: string }[];
};

const GameResults: React.FC<GameResultsProps> = ({ results }) => {
  console.log(results);
  return (
    <div className="game-results">
      <h3>Frühere Spiele</h3>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            Spieler {result.winner} gewann am{" "}
            {new Date(result.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameResults;
