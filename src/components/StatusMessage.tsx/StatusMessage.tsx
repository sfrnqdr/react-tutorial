// src/StatusMessage.tsx
import "./StatusMessage.css";

type StatusMessageProps = {
  currentPlayer: string;
  winner: string;
};

const StatusMessage = ({ currentPlayer, winner }: StatusMessageProps) => {
  return (
    <div className="status-message">
      {winner ? (
        <h3>🎉 Spieler {winner} hat gewonnen!</h3>
      ) : (
        <h3>Aktueller Spieler: {currentPlayer}</h3>
      )}
    </div>
  );
};

export default StatusMessage;
