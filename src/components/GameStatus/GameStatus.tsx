// src/GameStatus.tsx
type GameStatusProps = {
  currentPlayer: string;
  winner: string;
};

const GameStatus = ({ currentPlayer, winner }: GameStatusProps) => {
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
};

export default GameStatus;
