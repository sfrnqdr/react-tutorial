````markdown
# Kapitel 10: Nutzung der `useState`-Hooks in React

## Leitfrage

**Wie verwende ich den `useState`-Hook in React, um den Zustand einer Komponente zu verwalten?**

## Verständliche Antwort für Anfänger

Der `useState`-Hook ist ein grundlegendes Werkzeug in React, mit dem du den Zustand (State) innerhalb einer Komponente verwalten kannst. Stell dir den Zustand als Informationen vor, die sich im Laufe der Zeit ändern können, wie zum Beispiel der aktuelle Spieler in einem Tic-Tac-Toe-Spiel. Mit `useState` kannst du diese Informationen speichern und aktualisieren, sodass deine Benutzeroberfläche immer auf dem neuesten Stand ist.

## Exemplarisches Codebeispiel

```typescript
// src/GameBoard.tsx
import { useState } from "react";
import Cell from "../Cell/Cell";
import StatusMessage from "../StatusMessage/StatusMessage";
import "./GameBoard.css";

const GameBoard = () => {
  const [cells, setCells] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");

  const checkWinner = (updatedCells: string[]) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        updatedCells[a] &&
        updatedCells[a] === updatedCells[b] &&
        updatedCells[a] === updatedCells[c]
      ) {
        return updatedCells[a];
      }
    }
    return "";
  };

  const handleCellClick = (index: number) => {
    if (cells[index] === "" && winner === "") {
      const newCells = [...cells];
      newCells[index] = currentPlayer;
      setCells(newCells);
      const gameWinner = checkWinner(newCells);
      if (gameWinner) {
        setWinner(gameWinner);
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    }
  };

  return (
    <div>
      {/* Button mit onClick-Handler */}
      <button onClick={handleClick}>Klick mich</button>

      {/* Anzeige der Nachricht */}
      {message && <p>{message}</p>}
    </div>
  );
};
};

export default ClickButton;
```
````

## Ausführliche vertiefende Erläuterung für Fortgeschrittene

Der `useState`-Hook ist ein essentieller Bestandteil der React Hooks API, die es Entwicklern ermöglicht, den internen Zustand in Funktionskomponenten zu verwalten, ohne auf Klassenkomponenten zurückgreifen zu müssen.

### Funktionsweise von `useState`

Der `useState`-Hook nimmt einen Anfangswert als Argument und gibt ein Array mit zwei Elementen zurück:

1. **Aktueller Zustandwert**: Der erste Wert im Array repräsentiert den aktuellen Zustand.
2. **Zustandsaktualisierungsfunktion**: Die zweite Funktion ermöglicht es, den Zustand zu aktualisieren.

Durch die Verwendung von Destrukturierung können diese beiden Elemente leicht in Variablen gespeichert werden.

```javascript
const [state, setState] = useState(initialState);
```

### Immutable State Updates

Es ist wichtig, den Zustand **immutable** zu halten, d.h., den ursprünglichen Zustand nicht direkt zu verändern. Stattdessen erstellt man eine Kopie des aktuellen Zustands, nimmt die gewünschten Änderungen vor und setzt dann den neuen Zustand.

Im obigen Beispiel wird der Zustand der Zellen (`cells`) als Array gehalten. Wenn eine Zelle geklickt wird, erstellen wir eine Kopie des Arrays, aktualisieren das entsprechende Element und setzen dann das neue Array als neuen Zustand:

```javascript
const newCells = [...cells];
newCells[index] = currentPlayer;
setCells(newCells);
```

### Mehrfache `useState`-Hooks

In einer Komponente können mehrere `useState`-Hooks verwendet werden, um verschiedene Teile des Zustands separat zu verwalten. Im `GameBoard`-Beispiel haben wir drei State-Variablen:

- `cells`: Das aktuelle Spielbrett.
- `currentPlayer`: Der aktive Spieler, entweder "X" oder "O".
- `winner`: Der Gewinner des Spiels, falls vorhanden.

Dies fördert eine klarere und modularere Zustandsverwaltung.

### Komponenten-Rendering basierend auf State

React-Komponenten rendern sich automatisch neu, wenn sich der Zustand ändert. Im `GameBoard`-Beispiel wird die Anzeige des aktuellen Spielers oder des Gewinners durch die `StatusMessage`-Komponente gesteuert, die auf Änderungen der entsprechenden State-Variablen reagiert.

## Hands-on Aufgaben

### Aufgabe 1: Hinzufügen eines Spielstands-Displays

**Aufgabenstellung:**
Füge eine neue State-Variable `score` hinzu, die die Anzahl der Siege für jeden Spieler (`X` und `O`) verfolgt. Aktualisiere die `score`, wenn ein Spieler gewinnt, und zeige den aktuellen Spielstand über dem Spielbrett an.

**Anforderungen:**

- `score` sollte ein Objekt mit den Eigenschaften `X` und `O` sein, die jeweils die Anzahl der Siege speichern.
- Aktualisiere `score` in der `handleCellClick`-Funktion, wenn ein Gewinner ermittelt wird.
- Zeige den Spielstand in einer neuen Komponente `ScoreBoard` an.

**Vite-Test (`ScoreBoard.test.tsx`):**

```typescript
// src/ScoreBoard.test.tsx
import { render, screen } from "@testing-library/react";
import ScoreBoard from "./ScoreBoard";

test("zeigt die Anfangswerte des Spielstands korrekt an", () => {
  render(<ScoreBoard score={{ X: 0, O: 0 }} />);
  const scoreElement = screen.getByText(/Spielstand:/i);
  expect(scoreElement).toHaveTextContent("Spielstand: X: 0 - O: 0");
});

test("zeigt den aktualisierten Spielstand korrekt an", () => {
  render(<ScoreBoard score={{ X: 2, O: 3 }} />);
  const scoreElement = screen.getByText(/Spielstand:/i);
  expect(scoreElement).toHaveTextContent("Spielstand: X: 2 - O: 3");
});
```

### Aufgabe 2: Inkrementieren des Spielstands

**Aufgabenstellung:**
Implementiere die Logik zum Aktualisieren des Spielstands, sobald ein Spieler gewinnt. Stelle sicher, dass nach einem Sieg das Spielbrett zurückgesetzt wird, aber der Spielstand erhalten bleibt.

**Anforderungen:**

- Aktualisiere `score` in der `handleCellClick`-Funktion, wenn ein Gewinner ermittelt wird.
- Erstelle eine Funktion `resetBoard`, die das Spielbrett für ein neues Spiel zurücksetzt.
- Rufe `resetBoard` nach dem Aktualisieren des `score` auf.

**Vite-Test (`GameBoard.test.tsx` Erweiterung):**

```typescript
// src/GameBoard.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import GameBoard from "./GameBoard";
import { describe, it, expect } from "vitest";

test("aktualisiert den Spielstand, wenn ein Spieler gewinnt", () => {
  render(<GameBoard />);
  const cells = screen.getAllByRole("button");

  // Simuliere einen Sieg für 'X'
  fireEvent.click(cells[0]); // X
  fireEvent.click(cells[3]); // O
  fireEvent.click(cells[1]); // X
  fireEvent.click(cells[4]); // O
  fireEvent.click(cells[2]); // X

  const scoreElement = screen.getByText(/Spielstand:/i);
  expect(scoreElement).toHaveTextContent("Spielstand: X: 1 - O: 0");
});
```

## Musterlösung

### Schritt 1: Erstellen der `ScoreBoard` Komponente

```typescript
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
```

### Schritt 2: Hinzufügen von `score` zum `GameBoard`

```typescript
// src/GameBoard.tsx
import { useState } from "react";
import Cell from "../Cell/Cell";
import StatusMessage from "../StatusMessage/StatusMessage";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import "./GameBoard.css";

const GameBoard = () => {
  const [cells, setCells] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");
  const [score, setScore] = useState({ X: 0, O: 0 });

  const checkWinner = (updatedCells: string[]) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        updatedCells[a] &&
        updatedCells[a] === updatedCells[b] &&
        updatedCells[a] === updatedCells[c]
      ) {
        return updatedCells[a];
      }
    }
    return "";
  };

  const resetBoard = () => {
    setCells(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner("");
  };

  const handleCellClick = (index: number) => {
    if (cells[index] === "" && winner === "") {
      const newCells = [...cells];
      newCells[index] = currentPlayer;
      setCells(newCells);
      const gameWinner = checkWinner(newCells);
      if (gameWinner) {
        setWinner(gameWinner);
        setScore((prevScore) => ({
          ...prevScore,
          [gameWinner]: prevScore[gameWinner] + 1,
        }));
        // Optional: Automatisches Zurücksetzen des Brettes nach dem Sieg
        setTimeout(resetBoard, 2000);
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    }
  };

  return (
    <div>
      <h2>Tic Tac Toe</h2>
      <ScoreBoard score={score} />
      <StatusMessage currentPlayer={currentPlayer} winner={winner} />
      <div className="board" role="grid">
        {cells.map((cell, index) => (
          <Cell
            key={index}
            value={cell}
            onClick={() => handleCellClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
```

export default GameBoard;

````

### Schritt 3: Styling der `ScoreBoard` Komponente

```css
/* src/ScoreBoard.css */
.score-board {
  text-align: center;
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: #333;
}
````

### Schritt 4: Aktualisieren der Tests

#### `ScoreBoard.test.tsx`

```typescript
// src/ScoreBoard.test.tsx
import { render, screen } from "@testing-library/react";
import ScoreBoard from "./ScoreBoard";

test("zeigt die Anfangswerte des Spielstands korrekt an", () => {
  render(<ScoreBoard score={{ X: 0, O: 0 }} />);
  const scoreElement = screen.getByText(/Spielstand:/i);
  expect(scoreElement).toHaveTextContent("Spielstand: X: 0 - O: 0");
});

test("zeigt den aktualisierten Spielstand korrekt an", () => {
  render(<ScoreBoard score={{ X: 2, O: 3 }} />);
  const scoreElement = screen.getByText(/Spielstand:/i);
  expect(scoreElement).toHaveTextContent("Spielstand: X: 2 - O: 3");
});
```

#### `GameBoard.test.tsx`

```typescript
// src/GameBoard.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import GameBoard from "./GameBoard";

test("zeigt keine Siegesnachricht an, wenn das Spiel beginnt", () => {
  render(<GameBoard />);
  const winnerMessage = screen.queryByText(/Spieler .* hat gewonnen!/i);
  expect(winnerMessage).toBeNull();
});

test("zeigt die Siegesnachricht an, wenn ein Spieler gewinnt", () => {
  render(<GameBoard />);
  const cells = screen.getAllByRole("button");

  // Simuliere einen Sieg für 'X'
  fireEvent.click(cells[0]); // X
  fireEvent.click(cells[3]); // O
  fireEvent.click(cells[1]); // X
  fireEvent.click(cells[4]); // O
  fireEvent.click(cells[2]); // X

  const winnerMessage = screen.getByText(/Spieler X hat gewonnen!/i);
  expect(winnerMessage).toBeInTheDocument();

  const scoreElement = screen.getByText(/Spielstand:/i);
  expect(scoreElement).toHaveTextContent("Spielstand: X: 1 - O: 0");
});

test("klick auf eine Zelle trägt den Zug ein", () => {
  render(<GameBoard />);
  const cells = screen.getAllByRole("button");

  fireEvent.click(cells[0]); // Klick auf die erste Zelle

  expect(cells[0]).toHaveTextContent("X"); // Erster Spieler ist 'X'
});

test("Spieler wechseln nach jedem Zug", () => {
  render(<GameBoard />);
  const cells = screen.getAllByRole("button");
  const statusElement = screen.getByText(/Aktueller Spieler: X/i);

  fireEvent.click(cells[0]); // 'X'
  expect(statusElement.textContent).toBe("Aktueller Spieler: O");

  fireEvent.click(cells[1]); // 'O'
  expect(statusElement.textContent).toBe("Aktueller Spieler: X");
});

test("Zelle kann nicht überschrieben werden", () => {
  render(<GameBoard />);
  const cells = screen.getAllByRole("button");

  fireEvent.click(cells[0]); // 'X'
  fireEvent.click(cells[0]); // Versuch, erneut zu klicken

  expect(cells[0]).toHaveTextContent("X"); // Wert bleibt 'X'
});
```

## Zusammenfassung

In diesem Kapitel haben wir den `useState`-Hook verwendet, um den Zustand unserer Tic-Tac-Toe-Anwendung zu verwalten. Wir haben nicht nur den aktuellen Spieler und das Spielbrett überwacht, sondern auch den Spielstand der einzelnen Spieler verfolgt. Durch die Implementierung mehrerer `useState`-Hooks konnten wir verschiedene Aspekte des Zustands separat und effizient verwalten. Dies ermöglicht eine flexible und skalierbare Entwicklung von React-Anwendungen.
