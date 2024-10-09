// src/GameBoard.tsx
import "./GameBoard.css";

const GameBoard = () => {
  return (
    <div>
      <h2>Tic Tac Toe</h2>
      <div className="board">
        <div className="cell" role="button"></div>
        <div className="cell" role="button"></div>
        <div className="cell" role="button"></div>
        <div className="cell" role="button"></div>
        <div className="cell" role="button"></div>
        <div className="cell" role="button"></div>
        <div className="cell" role="button"></div>
        <div className="cell" role="button"></div>
        <div className="cell" role="button"></div>
      </div>
    </div>
  );
};

export default GameBoard;
