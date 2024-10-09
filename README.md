````markdown
# Kapitel 11: Verwendung von häufig genutzten React-Hooks

## Leitfrage

**Welche häufig genutzten React-Hooks gibt es und wie setze ich sie in meinem Tic-Tac-Toe-Spiel effektiv ein?**

## Verständliche Antwort für Anfänger

Neben dem `useState`-Hook gibt es in React noch weitere wichtige Hooks, die dir helfen, deine Anwendung effizienter und mächtiger zu gestalten. Zu den häufig genutzten Hooks gehören:

- **`useEffect`**: Ermöglicht es dir, Nebenwirkungen in deiner Komponente auszuführen, wie das Abrufen von Daten oder das Aktualisieren des Dokumenttitels.
- **`useRef`**: Ermöglicht den Zugriff auf DOM-Elemente oder das Speichern von veränderbaren Werten, die beim Neurendern der Komponente beibehalten werden sollen.
- **`useContext`**: Ermöglicht es dir, Daten global in deiner Anwendung zu teilen, ohne sie durch jede Komponente zu propasen.

In deinem Tic-Tac-Toe-Spiel kannst du diese Hooks verwenden, um beispielsweise den Spielstatus zu überwachen, Timer zu implementieren oder globale Einstellungen zu verwalten.

## Exemplarisches Codebeispiel

Hier erweitern wir unser Tic-Tac-Toe-Spiel, indem wir den `useEffect`-Hook verwenden, um den Dokumenttitel basierend auf dem aktuellen Spielstatus zu aktualisieren.

```typescript
// src/GameBoard.tsx
import { useState, useEffect } from "react";
import Cell from "../Cell/Cell";
import StatusMessage from "../StatusMessage/StatusMessage";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import "./GameBoard.css";

const GameBoard = () => {
  const [cells, setCells] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");
  const [score, setScore] = useState({ X: 0, O: 0 });

  useEffect(() => {
    if (winner) {
      document.title = `Spieler ${winner} gewinnt!`;
    } else {
      document.title = `Tic Tac Toe - Spieler ${currentPlayer} ist am Zug`;
    }
  }, [winner, currentPlayer]);

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
````

## Ausführliche vertiefende Erläuterung des Konzepts für Fortgeschrittene

### `useEffect`-Hook

Der `useEffect`-Hook ermöglicht es dir, Nebenwirkungen in funktionalen Komponenten zu handhaben. Eine Nebenwirkung ist jede Aktion, die außerhalb der reinen JavaScript-Funktion hinausgeht, wie das Manipulieren des DOM, das Abrufen von Daten oder das Verwalten von Timern.

#### Grundlagen von `useEffect`

Der `useEffect`-Hook wird wie folgt verwendet:

```javascript
useEffect(() => {
  // Effektlogik hier
  return () => {
    // Optional: Bereinigungscode hier
  };
}, [Abhängigkeiten]);
```

- **Effektfunktion**: Der erste Parameter ist eine Funktion, die den Effekt beschreibt.
- **Bereinigungsfunktion**: Optional kann die Effektfunktion eine Bereinigungsfunktion zurückgeben, die ausgeführt wird, bevor der Effekt erneut ausgeführt wird oder die Komponente unmontiert wird.
- **Abhängigkeiten**: Der zweite Parameter ist ein Array von Abhängigkeiten. Der Effekt wird nur dann ausgeführt, wenn sich eine der Abhängigkeiten geändert hat.

#### Anwendung im Tic-Tac-Toe-Spiel

In unserem Beispiel verwenden wir `useEffect`, um den Dokumenttitel basierend auf dem aktuellen Spielstatus zu aktualisieren. Dies ermöglicht eine bessere Benutzererfahrung, da der Benutzer sofort weiß, welcher Spieler gerade am Zug ist oder wer gewonnen hat, auch wenn er den Tab wechselt.

```javascript
useEffect(() => {
  if (winner) {
    document.title = `Spieler ${winner} gewinnt!`;
  } else {
    document.title = `Tic Tac Toe - Spieler ${currentPlayer} ist am Zug`;
  }
}, [winner, currentPlayer]);
```

Hier überwachen wir die `winner`- und `currentPlayer`-Zustände. Jedes Mal, wenn sich einer dieser Zustände ändert, wird der Effekt ausgeführt und der Dokumenttitel aktualisiert.

### Weitere häufig genutzte Hooks

#### `useRef`-Hook

Der `useRef`-Hook ermöglicht den Zugriff auf DOM-Elemente oder das Speichern von veränderbaren Werten, die beim Neurendern der Komponente beibehalten werden sollen.

Beispielanwendung könnte das Fokussieren eines Eingabefeldes sein.

#### `useContext`-Hook

Der `useContext`-Hook ermöglicht es dir, Daten global in deiner Anwendung zu teilen, ohne sie durch jede Komponente zu propasen. Dies ist besonders nützlich für Themen, Benutzerinformationen oder andere globale Einstellungen.

### Best Practices

- **Effekte nur dort definieren, wo sie benötigt werden**: Platziere `useEffect`-Hooks möglichst nah an den Komponenten, die die Effekte benötigen.
- **Abhängigkeiten korrekt angeben**: Vergiss nicht, alle externen Variablen, die innerhalb des Effekts verwendet werden, in das Abhängigkeitsarray aufzunehmen, um unerwartetes Verhalten zu vermeiden.
- **Bereinigung von Effekten**: Wenn dein Effekt Ressourcen wie Timer oder Abonnements verwendet, stelle sicher, dass du diese im Bereinigungscode freigibst, um Speicherlecks zu vermeiden.

## Hands-on Aufgaben

### Aufgabe 1: Dokumenttitel aktualisieren mit `useEffect`

**Aufgabenstellung:**
Verwende den `useEffect`-Hook, um den Dokumenttitel so zu aktualisieren, dass er anzeigt, welcher Spieler gerade am Zug ist oder wer gewonnen hat.

**Anforderungen:**

- Importiere `useEffect` aus React.
- Implementiere einen Effekt, der den Dokumenttitel basierend auf `currentPlayer` und `winner` aktualisiert.
- Stelle sicher, dass der Effekt nur ausgeführt wird, wenn sich `currentPlayer` oder `winner` ändern.

**Vite-Test (`GameBoard.test.tsx`):**

Da die Manipulation des Dokumenttitels schwer direkt zu testen ist, kannst du einen einfachen Test schreiben, der überprüft, ob der Titel korrekt gesetzt wird, nachdem bestimmte Aktionen ausgeführt wurden.

```typescript
// src/GameBoard.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import GameBoard from "./GameBoard";

test("aktualisiert den Dokumenttitel beim Spielstart", () => {
  render(<GameBoard />);
  expect(document.title).toBe("Tic Tac Toe - Spieler X ist am Zug");
});

test("aktualisiert den Dokumenttitel, wenn ein Spieler gewinnt", () => {
  render(<GameBoard />);
  const cells = screen.getAllByRole("button");

  // Simuliere einen Sieg für 'X'
  fireEvent.click(cells[0]); // X
  fireEvent.click(cells[3]); // O
  fireEvent.click(cells[1]); // X
  fireEvent.click(cells[4]); // O
  fireEvent.click(cells[2]); // X

  expect(document.title).toBe("Spieler X gewinnt!");
});
```

### Aufgabe 2: Verwendung von `useRef` zum Fokussieren einer Zelle

**Aufgabenstellung:**
Nutze den `useRef`-Hook, um das erste Feld des Spielbretts automatisch zu fokussieren, wenn das Spiel neu gestartet wird.

**Anforderungen:**

- Importiere `useRef` aus React.
- Erstelle ein Ref für das erste `Cell`-Element.
- Fokussiere das erste Feld im `resetBoard`-Funktionsaufruf.

**Vite-Test (`GameBoard.test.tsx` Erweiterung):**

```typescript
// src/GameBoard.test.tsx
test("fokussiert die erste Zelle nach dem Zurücksetzen des Spielbretts", () => {
  render(<GameBoard />);
  const cells = screen.getAllByRole("button");

  // Simuliere einen Sieg für 'X' und das Zurücksetzen des Brettes
  fireEvent.click(cells[0]); // X
  fireEvent.click(cells[3]); // O
  fireEvent.click(cells[1]); // X
  fireEvent.click(cells[4]); // O
  fireEvent.click(cells[2]); // X

  // Warte auf das automatische Zurücksetzen
  setTimeout(() => {
    expect(document.activeElement).toBe(cells[0]);
  }, 2000);
});
```

_Hinweis: Zeitverzögerungen in Tests können unzuverlässig sein. In realen Tests solltest du Mocking oder andere Techniken verwenden, um asynchrone Aktionen zu handhaben._

## Musterlösung

### Schritt 1: Aktualisieren des `GameBoard` mit `useEffect`

```typescript
// src/GameBoard.tsx
import { useState, useEffect, useRef } from "react";
import Cell from "../Cell/Cell";
import StatusMessage from "../StatusMessage/StatusMessage";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import "./GameBoard.css";

const GameBoard = () => {
  const [cells, setCells] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");
  const [score, setScore] = useState({ X: 0, O: 0 });
  const firstCellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (winner) {
      document.title = `Spieler ${winner} gewinnt!`;
    } else {
      document.title = `Tic Tac Toe - Spieler ${currentPlayer} ist am Zug`;
    }
  }, [winner, currentPlayer]);

  useEffect(() => {
    if (firstCellRef.current) {
      firstCellRef.current.focus();
    }
  }, [cells]);

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
            ref={index === 0 ? firstCellRef : null}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
```

### Schritt 2: Aktualisieren der `Cell`-Komponente zur Unterstützung von Refs

```typescript
// src/Cell.tsx
import React, { forwardRef } from "react";

type CellProps = {
  value: string;
  onClick: () => void;
};

const Cell = forwardRef<HTMLDivElement, CellProps>(
  ({ value, onClick }, ref) => {
    return (
      <div
        className="cell"
        role="button"
        onClick={onClick}
        tabIndex={0}
        ref={ref}
        onKeyPress={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClick();
          }
        }}
      >
        {value}
      </div>
    );
  }
);

export default React.memo(Cell);
```

_Hinweis: Um Refs mit funktionalen Komponenten zu verwenden, müssen wir `forwardRef` und `tabIndex` hinzufügen, um die Zugänglichkeit zu verbessern._

### Schritt 3: Aktualisieren der Tests

#### `GameBoard.test.tsx`

```typescript
// src/GameBoard.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GameBoard from "./GameBoard";

test("aktualisiert den Dokumenttitel beim Spielstart", () => {
  render(<GameBoard />);
  expect(document.title).toBe("Tic Tac Toe - Spieler X ist am Zug");
});

test("aktualisiert den Dokumenttitel, wenn ein Spieler gewinnt", () => {
  render(<GameBoard />);
  const cells = screen.getAllByRole("button");

  // Simuliere einen Sieg für 'X'
  fireEvent.click(cells[0]); // X
  fireEvent.click(cells[3]); // O
  fireEvent.click(cells[1]); // X
  fireEvent.click(cells[4]); // O
  fireEvent.click(cells[2]); // X

  expect(document.title).toBe("Spieler X gewinnt!");
});

test("fokussiert die erste Zelle nach dem Zurücksetzen des Spielbretts", async () => {
  render(<GameBoard />);
  const cells = screen.getAllByRole("button");

  // Simuliere einen Sieg für 'X' und das Zurücksetzen des Brettes
  fireEvent.click(cells[0]); // X
  fireEvent.click(cells[3]); // O
  fireEvent.click(cells[1]); // X
  fireEvent.click(cells[4]); // O
  fireEvent.click(cells[2]); // X

  // Warte auf das automatische Zurücksetzen
  await waitFor(
    () => {
      expect(document.activeElement).toBe(cells[0]);
    },
    { timeout: 2500 }
  );
});
```

_Hinweis: Die Verwendung von `waitFor` ermöglicht es dem Test, asynchrone Updates abzuwarten._

#### `Cell.test.tsx`

Keine Änderungen erforderlich, da die `Cell`-Komponente bereits auf Tastaturinteraktionen getestet wird.

## Zusammenfassung

In diesem Kapitel haben wir uns mit den häufig genutzten React-Hooks wie `useEffect` und `useRef` beschäftigt. Durch den Einsatz von `useEffect` konnten wir den Dokumenttitel dynamisch basierend auf dem Spielstatus aktualisieren, was die Benutzererfahrung verbessert. Mit `useRef` haben wir die Möglichkeit geschaffen, DOM-Elemente direkt zu manipulieren, indem wir beispielsweise das erste Feld nach dem Zurücksetzen des Spielbretts fokussieren.

Diese Hooks erweitern die Funktionalität deiner React-Anwendungen erheblich und ermöglichen es dir, komplexere Logiken und Interaktionen effizient zu implementieren. Indem du diese Werkzeuge meisterst, kannst du deine Tic-Tac-Toe-Anwendung weiter verbessern und erweitern.
