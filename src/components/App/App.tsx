// src/components/App/App.tsx
import { Link, Routes, Route } from "react-router-dom";
import Welcome from "../Welcome/Welcome";
import GameBoard from "../GameBoard/GameBoard";
import GameResults from "../GameResults/GameResults";

const App = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Startseite</Link>
          </li>
          <li>
            <Link to="/game">Spiel starten</Link>
          </li>
          <li>
            <Link to="/results">Ergebnisse</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/game" element={<GameBoard />} />
        <Route path="/results" element={<GameResults />} />
      </Routes>
    </div>
  );
};

export default App;
