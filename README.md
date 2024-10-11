````markdown
# Kapitel 12: Erstellung und Nutzung von Custom Hooks in React

## Leitfrage

**Wie erstelle und verwende ich eigene Hooks (Custom Hooks) in React, um wiederverwendbare Logik zu implementieren?**

## Antwort

In React kannst du eigene Hooks erstellen, sogenannte **Custom Hooks**, um wiederverwendbare Logik in deinen Komponenten zu kapseln. Ein Custom Hook ist einfach eine JavaScript-Funktion, die interne Hooks wie `useState` oder `useEffect` verwendet und dabei hilft, bestimmte Funktionalitäten logisch zu gruppieren und mehrfach in verschiedenen Komponenten zu nutzen. In deinem Tic-Tac-Toe-Spiel kannst du beispielsweise einen Custom Hook erstellen, der die Spiel- und Gewinnerlogik verwaltet. Dadurch bleibt deine Hauptkomponente übersichtlich und die Logik ist leichter zu pflegen und wiederzuverwenden.

## Exemplarisches Codebeispiel

Wir erstellen einen Custom Hook namens `useGameLogic`, der die gesamte Spiel- und Gewinnerlogik kapselt. Dadurch wird die `GameBoard`-Komponente sauberer und fokussiert sich nur noch auf die Darstellung.

```typescript
// src/hooks/useGameLogic.ts
import { useState } from "react";

type Score = {
  X: number;
  O: number;
};

const useGameLogic = () => {
  const [cells, setCells] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<string>("X");
  const [winner, setWinner] = useState<string>("");
  const [score, setScore] = useState<Score>({ X: 0, O: 0 });

  const winningCombinations: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (updatedCells: string[]): string => {
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

  return {
    cells,
    currentPlayer,
    winner,
    score,
    handleCellClick,
    resetBoard,
  };
};

export default useGameLogic;
```
````

```typescript
// src/GameBoard.tsx
import React, { useEffect, useRef } from "react";
import useGameLogic from "../hooks/useGameLogic";
import Cell from "../Cell/Cell";
import StatusMessage from "../StatusMessage/StatusMessage";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import "./GameBoard.css";

const GameBoard = () => {
  const { cells, currentPlayer, winner, score, handleCellClick, resetBoard } =
    useGameLogic();
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

## Ausführliche vertiefende Erläuterung des Konzepts für Fortgeschrittene

### Was sind Custom Hooks?

Custom Hooks sind benutzerdefinierte Funktionen in React, die die Funktionalität von bestehenden Hooks kombinieren und wiederverwenden. Sie ermöglichen es dir, komplexe Logik in modulare und wiederverwendbare Teile zu zerlegen, wodurch deine Komponenten sauberer und leichter verständlich bleiben.

### Vorteile von Custom Hooks

1. **Wiederverwendbarkeit**: Du kannst die gleiche Logik in verschiedenen Komponenten nutzen, ohne sie duplizieren zu müssen.
2. **Lesbarkeit**: Komponenten bleiben fokussiert auf die Darstellung und weniger auf die Geschäftslogik.
3. **Testbarkeit**: Logik in Custom Hooks kann isoliert und einfacher getestet werden.

### Erstellung eines Custom Hooks

Beim Erstellen eines Custom Hooks solltest du die folgenden Regeln beachten:

- **Namenskonvention**: Custom Hooks müssen mit `use` beginnen, zum Beispiel `useGameLogic`.
- **Nur Hooks innerhalb von Custom Hooks verwenden**: Du darfst nur andere Hooks (wie `useState`, `useEffect`) innerhalb von Custom Hooks oder Komponenten aufrufen.

### Anwendung im Tic-Tac-Toe-Spiel

Im Tic-Tac-Toe-Spiel kapselt der `useGameLogic`-Hook die gesamte Logik für das Spiel, einschließlich des Spielstatus, der aktuellen Spieler, der Gewinnerermittlung und der Spielstandverfolgung. Dadurch bleibt die `GameBoard`-Komponente übersichtlich und konzentriert sich nur auf das Rendern der Benutzeroberfläche.

### Tiefergehende Implementierung

Der `useGameLogic`-Hook verwaltet mehrere Zustände:

- **cells**: Ein Array, das den Inhalt jeder Zelle auf dem Spielbrett speichert.
- **currentPlayer**: Gibt an, welcher Spieler gerade am Zug ist ("X" oder "O").
- **winner**: Speichert den Gewinner des Spiels, falls vorhanden.
- **score**: Ein Objekt, das die Anzahl der Siege für jeden Spieler verfolgt.

Der Hook bietet auch Funktionen zur Handhabung von Zellklicks (`handleCellClick`) und zum Zurücksetzen des Spielbretts (`resetBoard`).

Durch die Trennung dieser Logik in einen eigenen Hook wird die `GameBoard`-Komponente einfacher und fokussierter auf das Rendering.

## Hands-on Aufgaben

### Aufgabe 1: Erstellung eines Custom Hooks für die Spiellogik

**Aufgabenstellung:**
Erstelle einen Custom Hook namens `useGameLogic`, der die gesamte Spiel- und Gewinnerlogik deines Tic-Tac-Toe-Spiels verwaltet. Dieser Hook sollte die Zustände und Funktionen kapseln, die zur Verwaltung des Spiels erforderlich sind.

**Anforderungen:**

- Verwende den `useState`-Hook innerhalb des Custom Hooks, um die Zustände `cells`, `currentPlayer`, `winner` und `score` zu verwalten.
- Implementiere die `checkWinner`-Funktion innerhalb des Hooks.
- Implementiere die `handleCellClick`-Funktion, die den Spielzustand aktualisiert, wenn eine Zelle angeklickt wird.
- Implementiere die `resetBoard`-Funktion zum Zurücksetzen des Spielbretts.
- Gib alle Zustände und Funktionen als Rückgabewerte des Hooks zurück.
- Aktualisiere die `GameBoard`-Komponente, um den neuen Custom Hook zu verwenden.

**Vite-Test (`useGameLogic.test.ts`):**

```typescript
// src/hooks/useGameLogic.test.ts
import { renderHook, act } from "@testing-library/react";
import useGameLogic from "./useGameLogic";

describe("useGameLogic Hook", () => {
  test("initialisiert die Zustände korrekt", () => {
    const { result } = renderHook(() => useGameLogic());

    expect(result.current.cells).toEqual(["", "", "", "", "", "", "", "", ""]);
    expect(result.current.currentPlayer).toBe("X");
    expect(result.current.winner).toBe("");
    expect(result.current.score).toEqual({ X: 0, O: 0 });
  });

  test("fügt einen Zug hinzu und wechselt den Spieler", () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.handleCellClick(0);
    });

    expect(result.current.cells[0]).toBe("X");
    expect(result.current.currentPlayer).toBe("O");
    expect(result.current.winner).toBe("");
  });

  test("ermittelt den Gewinner korrekt", () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      // Spieler X gewinnt durch die Zellen 0, 1, 2
      result.current.handleCellClick(0); // X
      result.current.handleCellClick(3); // O
      result.current.handleCellClick(1); // X
      result.current.handleCellClick(4); // O
      result.current.handleCellClick(2); // X
    });

    expect(result.current.winner).toBe("X");
    expect(result.current.score).toEqual({ X: 1, O: 0 });
  });

  test("kann das Spielbrett zurücksetzen", () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.handleCellClick(0); // X
      result.current.handleCellClick(1); // O
      result.current.resetBoard();
    });

    expect(result.current.cells).toEqual(["", "", "", "", "", "", "", "", ""]);
    expect(result.current.currentPlayer).toBe("X");
    expect(result.current.winner).toBe("");
    expect(result.current.score).toEqual({ X: 0, O: 0 });
  });
});
```

### Aufgabe 2: Nutzung des Custom Hooks in der `GameBoard`-Komponente

**Aufgabenstellung:**
Integriere den neu erstellten `useGameLogic`-Hook in deine `GameBoard`-Komponente, um die Spiellogik aus der Komponente auszulagern. Stelle sicher, dass die `GameBoard`-Komponente nur noch für das Rendering zuständig ist.

**Anforderungen:**

- Importiere den `useGameLogic`-Hook in die `GameBoard`-Komponente.
- Verwende den Hook, um die Zustände und Funktionen zu erhalten.
- Entferne die zuvor in der `GameBoard`-Komponente definierten Zustände und Funktionen.
- Passe das JSX-Rendering entsprechend an.

**Vite-Test (`GameBoard.test.tsx`):**

Die bestehenden Tests sollten weiterhin funktionieren. Es sind keine zusätzlichen Tests erforderlich, aber du kannst sicherstellen, dass die Integration funktioniert.

```typescript
// src/GameBoard.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

## Musterlösung

### Schritt 1: Erstellung des `useGameLogic`-Hooks

```typescript
// src/hooks/useGameLogic.ts
import { useState } from "react";

type Score = {
  X: number;
  O: number;
};

const useGameLogic = () => {
  const [cells, setCells] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<string>("X");
  const [winner, setWinner] = useState<string>("");
  const [score, setScore] = useState<Score>({ X: 0, O: 0 });

  const winningCombinations: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (updatedCells: string[]): string => {
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

  return {
    cells,
    currentPlayer,
    winner,
    score,
    handleCellClick,
    resetBoard,
  };
};

export default useGameLogic;
```

### Schritt 2: Nutzung des `useGameLogic`-Hooks in der `GameBoard`-Komponente

```typescript
// src/GameBoard.tsx
import React, { useEffect, useRef } from "react";
import useGameLogic from "../hooks/useGameLogic";
import Cell from "../Cell/Cell";
import StatusMessage from "../StatusMessage/StatusMessage";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import "./GameBoard.css";

const GameBoard = () => {
  const { cells, currentPlayer, winner, score, handleCellClick, resetBoard } =
    useGameLogic();
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

### Schritt 3: Erstellung der Tests für den Custom Hook

```typescript
// src/hooks/useGameLogic.test.ts
import { renderHook, act } from "@testing-library/react";
import useGameLogic from "./useGameLogic";

describe("useGameLogic Hook", () => {
  test("initialisiert die Zustände korrekt", () => {
    const { result } = renderHook(() => useGameLogic());

    expect(result.current.cells).toEqual(["", "", "", "", "", "", "", "", ""]);
    expect(result.current.currentPlayer).toBe("X");
    expect(result.current.winner).toBe("");
    expect(result.current.score).toEqual({ X: 0, O: 0 });
  });

  test("fügt einen Zug hinzu und wechselt den Spieler", () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.handleCellClick(0);
    });

    expect(result.current.cells[0]).toBe("X");
    expect(result.current.currentPlayer).toBe("O");
    expect(result.current.winner).toBe("");
  });

  test("ermittelt den Gewinner korrekt", () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      // Spieler X gewinnt durch die Zellen 0, 1, 2
      result.current.handleCellClick(0); // X
      result.current.handleCellClick(3); // O
      result.current.handleCellClick(1); // X
      result.current.handleCellClick(4); // O
      result.current.handleCellClick(2); // X
    });

    expect(result.current.winner).toBe("X");
    expect(result.current.score).toEqual({ X: 1, O: 0 });
  });

  test("kann das Spielbrett zurücksetzen", () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.handleCellClick(0); // X
      result.current.handleCellClick(1); // O
      result.current.resetBoard();
    });

    expect(result.current.cells).toEqual(["", "", "", "", "", "", "", "", ""]);
    expect(result.current.currentPlayer).toBe("X");
    expect(result.current.winner).toBe("");
    expect(result.current.score).toEqual({ X: 0, O: 0 });
  });
});
```

### Schritt 4: Aktualisieren der `GameBoard`-Tests

Da die gesamte Logik nun im `useGameLogic`-Hook enthalten ist, bleibt die `GameBoard`-Komponente für Rendering zuständig. Die bestehenden Tests bleiben größtenteils unverändert, stellen jedoch sicher, dass die Integration des Hooks korrekt funktioniert.

```typescript
// src/GameBoard.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

## Zusammenfassung

In diesem Kapitel haben wir gelernt, wie man **Custom Hooks** in React erstellt und nutzt, um wiederverwendbare und modulare Logik in einem Tic-Tac-Toe-Spiel zu implementieren. Durch die Erstellung des `useGameLogic`-Hooks haben wir die Spiel- und Gewinnerlogik von der Präsentationskomponente `GameBoard` getrennt, was zu einer saubereren und besser wartbaren Codebasis führt.

Custom Hooks sind ein mächtiges Werkzeug in React, das es Entwicklern ermöglicht, komplexe Logik zu abstrahieren und in wiederverwendbare Einheiten zu zerlegen. Dies fördert nicht nur die Wiederverwendbarkeit, sondern auch die Lesbarkeit und Testbarkeit des Codes. Indem du Custom Hooks meisterst, kannst du deine React-Anwendungen effizienter gestalten und skalierbarer machen.
