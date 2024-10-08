import GameIntroduction from "../GameIntroduction/GameIntroduction";
import Board from "../Board/Board";

const App = () => {
  return (
    <div>
      <GameIntroduction />
      <h1>Tic-Tac-Toe Spiel</h1>
      <Board />
    </div>
  );
};

export default App;
