// src/components/App/App.tsx
import GameBoard from "../GameBoard/GameBoard";
import Welcome from "../Welcome/Welcome";

const App = () => {
  return (
    <div>
      <Welcome />
      <GameBoard />
    </div>
  );
};

export default App;
