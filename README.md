# Schritt 9: Ereignisbehandlung (Event Handling)

## Leitfrage

**Wie funktioniert die Ereignisbehandlung (Event Handling) in React, und wie können wir Benutzerinteraktionen in unserem Tic-Tac-Toe-Spiel umsetzen?**

## Verständliche Antwort der Leitfrage für Anfänger

Hey du! 👋 In diesem Schritt lernen wir, wie wir auf Benutzerinteraktionen wie Klicks reagieren können. Das nennt man **Ereignisbehandlung**. In React können wir Ereignisse wie `onClick`, `onChange` und viele andere nutzen, um unsere App interaktiv zu machen.

Für unser Tic-Tac-Toe-Spiel bedeutet das, dass wir die Klicks auf die Zellen erfassen und darauf reagieren können, indem wir zum Beispiel den Spielzug des aktuellen Spielers eintragen. Lass uns sehen, wie wir das umsetzen! 🎮

## Exemplarisches Codebeispiel (Tic Tac Toe)

**Implementierung der Ereignisbehandlung für die Zellen:**

```tsx
import React, { useState } from "react";

type CellProps = {
  value: string;
  onClick: () => void;
};

const Cell = React.memo(({ value, onClick }: CellProps) => {
  return (
    <div>
      <h1>Meine React App</h1>
      <button onClick={() => setCount(count + 1)}>Klick mich: {count}</button>
      <ChildComponent />
    </div>
  );
});

export default Cell;
```

**Anpassung von `GameBoard.tsx` zur Verarbeitung von Klickereignissen:**

```tsx
// src/GameBoard.tsx
import React, { useState } from "react";
import Cell from "./Cell";
import StatusMessage from "./StatusMessage";
import "./GameBoard.css";

function GameBoard() {
  const [cells, setCells] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");

  const checkWinner = (updatedCells: string[]) => {
    // ... (Gewinnlogik bleibt unverändert)
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
      <h2>Tic Tac Toe</h2>
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
}

export default GameBoard;
```

## Ausführliche vertiefende Erläuterung des Konzepts für Fortgeschrittene

In React erfolgt die **Ereignisbehandlung** (Event Handling) über Props, die Event-Handler-Funktionen enthalten. Diese Props haben ähnliche Namen wie die nativen DOM-Ereignisse, jedoch in CamelCase-Notation (z. B. `onClick` statt `onclick`).

**Wie funktioniert das in unserem Beispiel?**

- **`Cell`-Komponente:**

  - Die `Cell`-Komponente erhält eine `onClick`-Prop, die eine Funktion ist.
  - Beim Klick auf die Zelle wird die `onClick`-Funktion aufgerufen:

    ```tsx
    <div className="cell" role="button" onClick={onClick}>
      {value}
    </div>
    ```

- **`GameBoard`-Komponente:**
  - Die `handleCellClick`-Funktion verarbeitet den Klick auf eine Zelle.
  - Sie prüft, ob die Zelle leer ist und ob es bereits einen Gewinner gibt.
  - Wenn alles in Ordnung ist, wird der aktuelle Spieler in die Zelle gesetzt, der Gewinner geprüft und der Spieler gewechselt.

**Warum verwenden wir `onClick={() => handleCellClick(index)}`?**

- Wir möchten der `Cell`-Komponente mitteilen, welche Zelle geklickt wurde.
- Durch die Verwendung einer anonymen Funktion `() => handleCellClick(index)` erzeugen wir eine neue Funktion, die bei Klick ausgeführt wird und den Index der geklickten Zelle an `handleCellClick` übergibt.

**Achtung bei der Performance:**

- Das Erzeugen neuer Funktionen in der Render-Methode kann Auswirkungen auf die Performance haben.
- In unserem Fall ist das akzeptabel, aber in größeren Anwendungen sollte man dies im Auge behalten und gegebenenfalls mit `useCallback` optimieren.

## Hands-on Aufgaben zum Selbstprobieren

### Aufgabe: Implementierung der Ereignisbehandlung für Zellenklicks

**Anforderungen:**

1. **Passe die `Cell`-Komponente an:**

   - Stelle sicher, dass die `Cell`-Komponente eine `onClick`-Prop erhält.
   - Verwende `onClick` im `div`, um auf Klickereignisse zu reagieren.

2. **Implementiere die Klickverarbeitung in `GameBoard`:**

   - Definiere die Funktion `handleCellClick`, die einen Index als Parameter erhält.
   - Aktualisiere das `cells`-Array, um den Zug des aktuellen Spielers einzutragen.
   - Überprüfe, ob ein Gewinner ermittelt wurde.
   - Wechsle den aktuellen Spieler, wenn es keinen Gewinner gibt.

3. **Teste das Spiel:**
   - Starte die Anwendung mit:
     ```bash
     npm run dev
     ```
   - Spiele das Spiel, indem du auf die Zellen klickst.
   - Beobachte, wie die Züge eingetragen und der Spieler gewechselt wird.

### Zugehöriger Vitest für TDD

**Erstelle eine Testdatei `GameBoard.test.tsx` mit Tests für die Ereignisbehandlung:**

```tsx
// src/GameBoard.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import GameBoard from "./GameBoard";

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

**Anforderungen aus dem Test abgeleitet:**

- Beim Klick auf eine leere Zelle soll der Zug des aktuellen Spielers eingetragen werden.
- Nach jedem Zug soll der Spieler wechseln.
- Eine bereits belegte Zelle kann nicht überschrieben werden.

**Test ausführen:**

```bash
npm run test
```

- Stelle sicher, dass alle Tests erfolgreich sind. ✅

## Fertige Musterlösung dieses Kapitels

1. **Anpassen der `Cell`-Komponente:**

```tsx
// src/components/Cell/Cell.tsx

import React from "react";

type CellProps = {
  value: string;
  onClick: () => void;
};

const Cell = React.memo(({ value, onClick }: CellProps) => {
  return (
    <div className="cell" role="button" onClick={onClick}>
      {value}
    </div>
  );
});

export default Cell;
```

2. **Anpassen von `GameBoard.tsx`:**

   ```tsx
   // src/GameBoard.tsx
   import React, { useState } from "react";
   import Cell from "./Cell";
   import StatusMessage from "./StatusMessage";
   import "./GameBoard.css";

   function GameBoard() {
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

       for (let combination of winningCombinations) {
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
         <h2>Tic Tac Toe</h2>
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
   }

   export default GameBoard;
   ```

3. **Erstellen der Tests für `GameBoard`:**

   ```tsx
   // src/GameBoard.test.tsx
   import { render, screen, fireEvent } from "@testing-library/react";
   import GameBoard from "./GameBoard";

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

4. **Anwendung starten und Tests ausführen:**

   - **Anwendung starten:**

     ```bash
     npm run dev
     ```

     - Spiele das Spiel im Browser und stelle sicher, dass die Ereignisbehandlung funktioniert. 🎉

   - **Tests ausführen:**

     ```bash
     npm run test
     ```

     - Stelle sicher, dass alle Tests erfolgreich sind. ✅

5. **Optional: Konsolenausgaben entfernen**

   - Entferne die `console.log`-Anweisungen aus den vorherigen Kapiteln, um die Konsole sauber zu halten.

## Zusammenfassung

**Super gemacht!** 🎉 Du hast gelernt, wie die Ereignisbehandlung in React funktioniert und wie du Benutzerinteraktionen in deinem Tic-Tac-Toe-Spiel umsetzen kannst.

Durch das Hinzufügen von Ereignis-Handlern können wir auf Klicks und andere Aktionen reagieren und unsere Anwendung interaktiv gestalten. Dies ist ein grundlegender Bestandteil jeder modernen Webanwendung. 🚀

Du siehst, wie sich unser Spiel mit jedem Schritt weiterentwickelt. Bleib dran! 💪
