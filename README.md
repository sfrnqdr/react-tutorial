# Kapitel 13: API-Integration (REST/GraphQL)

## Leitfrage

**Wie können wir unser Tic-Tac-Toe-Spiel mit einer externen API verbinden, um Daten wie Spielergebnisse zu speichern und abzurufen?**

## Verständliche Antwort

Wir können unser Tic-Tac-Toe-Spiel mit einer externen API verbinden, indem wir HTTP-Anfragen senden und empfangen. Dadurch können wir beispielsweise Spielergebnisse speichern, abrufen oder analysieren. Dazu verwenden wir in React Bibliotheken wie `axios` für REST-APIs oder `graphql-request` für GraphQL-APIs. Im nächsten Schritt integrieren wir diese Funktionen in unser Spiel, sodass die Ergebnisse automatisch gespeichert und angezeigt werden können.

## Exemplarisches Codebeispiel (Tic-Tac-Toe mit REST API)

````markdown
```javascript
// src/api/api.ts
import axios from "axios";

const API_URL = "https://example.com/api"; // Ersetze dies mit deiner API-URL

export const saveGameResult = async (result: {
  winner: string,
  timestamp: string,
}) => {
  try {
    const response = await axios.post(`${API_URL}/results`, result);
    return response.data;
  } catch (error) {
    console.error("Fehler beim Speichern des Spielergebnisses:", error);
    throw error;
  }
};

export const fetchGameResults = async () => {
  try {
    const response = await axios.get(`${API_URL}/results`);
    return response.data;
  } catch (error) {
    console.error("Fehler beim Abrufen der Spielergebnisse:", error);
    throw error;
  }
};
```
````

```javascript
// src/hooks/useGameLogic.ts
import { useState, useEffect } from 'react';
import { saveGameResult, fetchGameResults } from '../api/api';

type Score = {
  X: number;
  O: number;
};

const useGameLogic = () => {
  const [cells, setCells] = useState<string[]>(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState<string>('X');
  const [winner, setWinner] = useState<string>('');
  const [score, setScore] = useState<Score>({ X: 0, O: 0 });
  const [gameResults, setGameResults] = useState<{ winner: string; timestamp: string }[]>([]);

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
    return '';
  };

  const resetBoard = () => {
    setCells(Array(9).fill(''));
    setCurrentPlayer('X');
    setWinner('');
  };

  const handleCellClick = async (index: number) => {
    setCells((prevCells) => {
      if (prevCells[index] !== '' || winner !== '') {
        return prevCells;
      }

      const newCells = [...prevCells];
      newCells[index] = currentPlayer;
      const gameWinner = checkWinner(newCells);

      if (gameWinner) {
        setWinner(gameWinner);
        setScore((prevScore) => ({
          ...prevScore,
          [gameWinner]: prevScore[gameWinner] + 1,
        }));
        const result = { winner: gameWinner, timestamp: new Date().toISOString() };
        saveGameResult(result); // Speichere das Ergebnis in der API
        setTimeout(resetBoard, 2000);
      } else {
        setCurrentPlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));
      }

      return newCells;
    });
  };

  const loadGameResults = async () => {
    const results = await fetchGameResults();
    setGameResults(results);
  };

  useEffect(() => {
    loadGameResults();
  }, []);

  return {
    cells,
    currentPlayer,
    winner,
    score,
    handleCellClick,
    resetBoard,
    gameResults,
  };
};

export default useGameLogic;
```

```javascript
// src/ScoreBoard.tsx
import React from "react";

type ScoreBoardProps = {
  score: {
    X: number,
    O: number,
  },
};

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  return (
    <div className="scoreboard">
      <p>Spieler X: {score.X}</p>
      <p>Spieler O: {score.O}</p>
    </div>
  );
};

export default ScoreBoard;
```

````

## Ausführliche vertiefende Erläuterung des Konzepts

### Was ist eine API?
Eine **API (Application Programming Interface)** ist eine Schnittstelle, die es verschiedenen Softwareanwendungen ermöglicht, miteinander zu kommunizieren. In unserem Fall verwenden wir eine externe API, um Daten wie Spielergebnisse zu speichern und abzurufen. Dadurch können wir Informationen zwischen unserem Spiel und einem Server austauschen.

### REST vs. GraphQL
Es gibt verschiedene Arten von APIs, aber die häufigsten sind **REST** und **GraphQL**.

- **REST (Representational State Transfer):**
  - Arbeitet mit klar definierten Endpunkten (URLs) für verschiedene Ressourcen.
  - Verwendet HTTP-Methoden wie GET, POST, PUT und DELETE.
  - Einfach zu implementieren und weit verbreitet.

- **GraphQL:**
  - Bietet eine flexible Abfragesprache, mit der der Client genau die benötigten Daten anfordern kann.
  - Reduziert die Anzahl der erforderlichen API-Aufrufe.
  - Komplexer in der Einrichtung, aber mächtiger bei komplexen Datenanforderungen.

Für diesen Schritt verwenden wir **REST**, da es einfacher zu verstehen und zu integrieren ist, besonders für Anfänger.

### Integration einer REST-API in unser React-Projekt

1. **Installation von Axios:**
   - `axios` ist eine beliebte Bibliothek zum Durchführen von HTTP-Anfragen.
   - Installation: Führe im Terminal `npm install axios` aus.

2. **Erstellen eines API-Moduls:**
   - Wir erstellen eine Datei `api.ts`, die Funktionen zum Speichern und Abrufen von Spielergebnissen enthält.
   - Diese Funktionen verwenden `axios`, um HTTP-Anfragen an unsere API zu senden.

3. **Anpassen des Game-Logic-Hooks:**
   - In unserem Hook `useGameLogic` importieren wir die API-Funktionen.
   - Nach jedem Sieg speichern wir das Ergebnis in der API.
   - Beim Laden der Anwendung rufen wir alle gespeicherten Spiele ab, um sie anzuzeigen oder anderweitig zu verwenden.

4. **Fehlerbehandlung:**
   - Es ist wichtig, Fehler bei API-Anfragen zu behandeln, um Abstürze der Anwendung zu vermeiden und dem Benutzer hilfreiche Informationen bereitzustellen.

### Vorteile der API-Integration
- **Persistenz:** Spielergebnisse bleiben auch nach dem Schließen der Anwendung erhalten.
- **Analyse:** Wir können Daten sammeln und analysieren, um das Spiel zu verbessern oder Einblicke in das Spielerlebnis zu gewinnen.
- **Skalierbarkeit:** Eine API ermöglicht es uns, das Spiel später auf mehrere Geräte oder Benutzer auszudehnen.

## Hands-on Aufgaben

### Aufgabe 1: Spielergebnisse speichern

**Beschreibung:** Integriere die Funktionalität, um jede Spielrunde in einer externen REST-API zu speichern. Jedes Mal, wenn ein Spieler gewinnt, soll das Ergebnis automatisch an die API gesendet werden.

**Anforderungen:**
- Sende eine POST-Anfrage an die API mit den Daten `{ winner: 'X', timestamp: '2023-10-01T12:00:00Z' }`.
- Behandle mögliche Fehler während der Anfrage.
- Aktualisiere die Anzeige der Spielstände nach dem Speichern.

**Vitest-Test:**

```javascript
// src/api/api.test.ts
import { saveGameResult, fetchGameResults } from './api';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

describe('API Integration', () => {
  test('sollte Spielergebnis erfolgreich speichern', async () => {
    const mockResult = { winner: 'X', timestamp: '2023-10-01T12:00:00Z' };
    (axios.post as vi.Mock).mockResolvedValue({ data: mockResult });

    const result = await saveGameResult(mockResult);
    expect(axios.post).toHaveBeenCalledWith('https://example.com/api/results', mockResult);
    expect(result).toEqual(mockResult);
  });

  test('sollte Fehler beim Speichern des Spielergebnisses behandeln', async () => {
    const mockResult = { winner: 'O', timestamp: '2023-10-01T12:05:00Z' };
    (axios.post as vi.Mock).mockRejectedValue(new Error('Netzwerkfehler'));

    await expect(saveGameResult(mockResult)).rejects.toThrow('Netzwerkfehler');
  });
});
````

### Aufgabe 2: Spielergebnisse abrufen

**Beschreibung:** Füge die Funktionalität hinzu, um alle gespeicherten Spielergebnisse von der API abzurufen und in der Anwendung anzuzeigen.

**Anforderungen:**

- Sende eine GET-Anfrage an die API, um alle Ergebnisse zu erhalten.
- Zeige die abgerufenen Ergebnisse in einer neuen Komponente `GameResults` an.
- Aktualisiere die Ergebnisse automatisch, wenn ein neues Spiel gespeichert wird.

**Vitest-Test:**

```javascript
// src/api/api.test.ts (weiter)
test('sollte Spielresultate erfolgreich abrufen', async () => {
  const mockResults = [
    { winner: 'X', timestamp: '2023-10-01T12:00:00Z' },
    { winner: 'O', timestamp: '2023-10-01T12:05:00Z' },
  ];
  (axios.get as vi.Mock).mockResolvedValue({ data: mockResults });

  const results = await fetchGameResults();
  expect(axios.get).toHaveBeenCalledWith('https://example.com/api/results');
  expect(results).toEqual(mockResults);
});

test('sollte Fehler beim Abrufen der Spielresultate behandeln', async () => {
  (axios.get as vi.Mock).mockRejectedValue(new Error('Serverfehler'));

  await expect(fetchGameResults()).rejects.toThrow('Serverfehler');
});
```

## Musterlösung dieses Kapitels

### 1. Installation von Axios

Führe im Projektverzeichnis im Terminal folgenden Befehl aus:

```bash
npm install axios
```

### 2. Erstellen des API-Moduls

Erstelle die Datei `src/api/api.ts` mit folgendem Inhalt:

```javascript
// src/api/api.ts
import axios from "axios";

const API_URL = "https://example.com/api"; // Ersetze dies mit deiner API-URL

export const saveGameResult = async (result: {
  winner: string,
  timestamp: string,
}) => {
  try {
    const response = await axios.post(`${API_URL}/results`, result);
    return response.data;
  } catch (error) {
    console.error("Fehler beim Speichern des Spielergebnisses:", error);
    throw error;
  }
};

export const fetchGameResults = async () => {
  try {
    const response = await axios.get(`${API_URL}/results`);
    return response.data;
  } catch (error) {
    console.error("Fehler beim Abrufen der Spielergebnisse:", error);
    throw error;
  }
};
```

### 3. Anpassen des Game-Logic-Hooks

Ersetze den Inhalt von `src/hooks/useGameLogic.ts` mit dem folgenden Code:

```javascript
// src/hooks/useGameLogic.ts
import { useState, useEffect } from 'react';
import { saveGameResult, fetchGameResults } from '../api/api';

type Score = {
  X: number;
  O: number;
};

const useGameLogic = () => {
  const [cells, setCells] = useState<string[]>(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState<string>('X');
  const [winner, setWinner] = useState<string>('');
  const [score, setScore] = useState<Score>({ X: 0, O: 0 });
  const [gameResults, setGameResults] = useState<{ winner: string; timestamp: string }[]>([]);

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
    return '';
  };

  const resetBoard = () => {
    setCells(Array(9).fill(''));
    setCurrentPlayer('X');
    setWinner('');
  };

  const handleCellClick = async (index: number) => {
    setCells((prevCells) => {
      if (prevCells[index] !== '' || winner !== '') {
        return prevCells;
      }

      const newCells = [...prevCells];
      newCells[index] = currentPlayer;
      const gameWinner = checkWinner(newCells);

      if (gameWinner) {
        setWinner(gameWinner);
        setScore((prevScore) => ({
          ...prevScore,
          [gameWinner]: prevScore[gameWinner] + 1,
        }));
        const result = { winner: gameWinner, timestamp: new Date().toISOString() };
        saveGameResult(result); // Speichere das Ergebnis in der API
        setTimeout(resetBoard, 2000);
      } else {
        setCurrentPlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));
      }

      return newCells;
    });
  };

  const loadGameResults = async () => {
    const results = await fetchGameResults();
    setGameResults(results);
  };

  useEffect(() => {
    loadGameResults();
  }, []);

  return {
    cells,
    currentPlayer,
    winner,
    score,
    handleCellClick,
    resetBoard,
    gameResults,
  };
};

export default useGameLogic;
```

### 4. Anzeigen der Spielergebnisse

Erstelle eine neue Komponente `src/GameResults.tsx`:

```javascript
// src/GameResults.tsx
import React from "react";

type GameResultsProps = {
  results: { winner: string, timestamp: string }[],
};

const GameResults: React.FC<GameResultsProps> = ({ results }) => {
  return (
    <div className="game-results">
      <h3>Frühere Spiele</h3>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            Spieler {result.winner} gewann am{" "}
            {new Date(result.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameResults;
```

### 5. Einbinden der Spielergebnisse in das Spielbrett

Passe die `GameBoard`-Komponente an, um die `GameResults`-Komponente anzuzeigen:

```javascript
// src/GameBoard.tsx
import { useEffect, useRef } from "react";
import useGameLogic from "../../hooks/useGameLogic";
import Cell from "../Cell/Cell";
import StatusMessage from "../StatusMessage/StatusMessage";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import GameResults from "../GameResults/GameResults";
import "./GameBoard.css";

const GameBoard = () => {
  const {
    cells,
    currentPlayer,
    winner,
    score,
    handleCellClick,
    resetBoard,
    gameResults,
  } = useGameLogic();
  const firstCellRef = useRef < HTMLDivElement > null;

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
      <GameResults results={gameResults} />
    </div>
  );
};

export default GameBoard;
```

### 6. Styling der Spielergebnisse (optional)

Füge der Datei `GameBoard.css` oder einer entsprechenden CSS-Datei folgendes Styling hinzu:

```css
/* src/GameBoard.css */
.game-results {
  margin-top: 20px;
}

.game-results ul {
  list-style-type: none;
  padding: 0;
}

.game-results li {
  background-color: #f9f9f9;
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 4px;
}
```

### 7. Schreiben der Tests

Erstelle die Datei `src/api/api.test.ts` mit folgenden Tests:

```javascript
// src/api/api.test.ts
import { saveGameResult, fetchGameResults } from './api';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

describe('API Integration', () => {
  test('sollte Spielergebnis erfolgreich speichern', async () => {
    const mockResult = { winner: 'X', timestamp: '2023-10-01T12:00:00Z' };
    (axios.post as vi.Mock).mockResolvedValue({ data: mockResult });

    const result = await saveGameResult(mockResult);
    expect(axios.post).toHaveBeenCalledWith('https://example.com/api/results', mockResult);
    expect(result).toEqual(mockResult);
  });

  test('sollte Fehler beim Speichern des Spielergebnisses behandeln', async () => {
    const mockResult = { winner: 'O', timestamp: '2023-10-01T12:05:00Z' };
    (axios.post as vi.Mock).mockRejectedValue(new Error('Netzwerkfehler'));

    await expect(saveGameResult(mockResult)).rejects.toThrow('Netzwerkfehler');
  });

  test('sollte Spielresultate erfolgreich abrufen', async () => {
    const mockResults = [
      { winner: 'X', timestamp: '2023-10-01T12:00:00Z' },
      { winner: 'O', timestamp: '2023-10-01T12:05:00Z' },
    ];
    (axios.get as vi.Mock).mockResolvedValue({ data: mockResults });

    const results = await fetchGameResults();
    expect(axios.get).toHaveBeenCalledWith('https://example.com/api/results');
    expect(results).toEqual(mockResults);
  });

  test('sollte Fehler beim Abrufen der Spielresultate behandeln', async () => {
    (axios.get as vi.Mock).mockRejectedValue(new Error('Serverfehler'));

    await expect(fetchGameResults()).rejects.toThrow('Serverfehler');
  });
});
```

Füge außerdem einen Test für die `GameResults`-Komponente hinzu:

```javascript
// src/GameResults.test.tsx
import { render, screen } from "@testing-library/react";
import GameResults from "./GameResults";
import { test, expect } from "vitest";

test("zeigt keine Ergebnisse an, wenn keine vorhanden sind", () => {
  render(<GameResults results={[]} />);
  const header = screen.getByText(/Frühere Spiele/i);
  expect(header).toBeInTheDocument();
  const listItems = screen.queryAllByRole("listitem");
  expect(listItems.length).toBe(0);
});

test("zeigt eine Liste von Spielergebnissen an", () => {
  const mockResults = [
    { winner: "X", timestamp: "2023-10-01T12:00:00Z" },
    { winner: "O", timestamp: "2023-10-01T12:05:00Z" },
  ];
  render(<GameResults results={mockResults} />);
  const listItems = screen.getAllByRole("listitem");
  expect(listItems.length).toBe(2);
  expect(listItems[0]).toHaveTextContent("Spieler X gewinnt am");
  expect(listItems[1]).toHaveTextContent("Spieler O gewinnt am");
});
```

### 8. Ausführen der Tests

Führe im Terminal den Testbefehl aus, um sicherzustellen, dass alle Tests bestehen:

```bash
npm run test
```

### 9. Anwendung testen

Starte die Anwendung mit:

```bash
npm start
```

Spiele einige Runden Tic-Tac-Toe und überprüfe, ob die Ergebnisse in der `GameResults`-Sektion angezeigt werden. Stelle sicher, dass die Ergebnisse auch nach einem Neuladen der Seite vorhanden sind, was bestätigt, dass sie erfolgreich in der API gespeichert wurden.

## Zusammenfassung

In diesem Kapitel haben wir gelernt, wie man eine externe REST-API in unser Tic-Tac-Toe-Spiel integriert. Wir haben Funktionen zum Speichern und Abrufen von Spielergebnissen erstellt, diese in unseren Spiel-Logik-Hook eingebunden und eine neue Komponente erstellt, um die Ergebnisse anzuzeigen. Außerdem haben wir Tests geschrieben, um sicherzustellen, dass unsere API-Integration zuverlässig funktioniert. Mit dieser neuen Funktionalität ist unser Spiel nun in der Lage, Daten persistieren zu können, was das Spielerlebnis verbessert und weitere Analyseoptionen eröffnet.
