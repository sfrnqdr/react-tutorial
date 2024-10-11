// src/components/GameStatus/GameStatus.tsx

import React from "react";

type GameStatusProps = {
  currentPlayer: string;
  winner: string;
};

const GameStatus = React.memo(({ currentPlayer, winner }: GameStatusProps) => {
  console.log("Rendering GameStatus");
  return (
    <div>
      {winner === "draw" ? (
        <h3>Das Spiel endet unentschieden!</h3>
      ) : winner ? (
        <h3>🎉 Spieler {winner} hat gewonnen!</h3>
      ) : (
        <h3>Spieler {currentPlayer} ist am Zug</h3>
      )}
    </div>
  );
});

export default GameStatus;
