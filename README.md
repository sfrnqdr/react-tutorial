# Schritt 6: Bedingtes Rendern

## Leitfrage

**Was ist bedingtes Rendern in React, und wie können wir es nutzen, um bestimmte Elemente in unserem Tic-Tac-Toe-Spiel anzuzeigen oder zu verbergen?**

## Verständliche Antwort der Leitfrage für Anfänger

Hey du! 👋 In diesem Schritt lernen wir, wie wir in React Inhalte basierend auf bestimmten Bedingungen ein- oder ausblenden können. Das nennt man **bedingtes Rendern**.

Stell dir vor, du möchtest nur dann eine Nachricht anzeigen, wenn jemand das Tic-Tac-Toe-Spiel gewonnen hat. Wenn das Spiel noch läuft, soll die Nachricht nicht zu sehen sein. Mit bedingtem Rendern kannst du genau das erreichen! 🚀

Wir werden gemeinsam eine Siegesnachricht hinzufügen, die nur erscheint, wenn ein Spieler gewonnen hat.

## Exemplarisches Codebeispiel (Tic Tac Toe)

**Hinzufügen einer Siegesnachricht mit bedingtem Rendern:**

```tsx
// src/GameBoard.tsx
import React, { useState } from "react";
import Cell from "./Cell";
import "./GameBoard.css";

function GameBoard() {
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState("");

  const checkWinner = (updatedCells: string[]) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Reihen
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Spalten
      [0, 4, 8],
      [2, 4, 6], // Diagonalen
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
      newCells[index] = "X"; // Fürs Erste setzen wir immer 'X'
      setCells(newCells);
      const gameWinner = checkWinner(newCells);
      if (gameWinner) {
        setWinner(gameWinner);
      }
    }
  };

  return (
    <div>
      <h2>Tic Tac Toe</h2>
      {winner && <h3>🎉 Spieler {winner} hat gewonnen!</h3>}
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

**Anpassen der `Cell`-Komponente:**

```tsx
// src/Cell.tsx
import React from "react";

type CellProps = {
  value: string;
  onClick: () => void;
};

function Cell({ value, onClick }: CellProps) {
  return (
    <div className="cell" role="button" onClick={onClick}>
      {value}
    </div>
  );
}

export default Cell;
```

## Ausführliche vertiefende Erläuterung des Konzepts für Fortgeschrittene

Beim **bedingten Rendern** in React entscheiden wir, ob ein bestimmtes Element gerendert wird oder nicht, basierend auf einer Bedingung. Dies ähnelt der Bedingungslogik in JavaScript mit `if`-Anweisungen.

In unserem Beispiel:

- Wir haben den Zustand `winner` hinzugefügt, um den Gewinner des Spiels zu speichern.
- Die Funktion `checkWinner` überprüft nach jedem Zug, ob es eine Gewinnkombination gibt.
- In der Render-Methode verwenden wir `{winner && <h3>🎉 Spieler {winner} hat gewonnen!</h3>}`.
  - Das ist eine Kurzschlussauswertung: Wenn `winner` einen Wert hat (nicht leer ist), wird die Nachricht angezeigt.
  - Wenn `winner` leer ist, wird die Nachricht nicht gerendert.

Dies ist ein gängiges Muster für bedingtes Rendern in React:

- **Mit logischem UND (`&&`):** `{condition && <Element />}`
  - Rendert `<Element />` nur, wenn `condition` wahr ist.
- **Mit dem ternären Operator:** `{condition ? <ElementA /> : <ElementB />}`
  - Rendert `<ElementA />` wenn `condition` wahr ist, sonst `<ElementB />`.

Bedingtes Rendern ermöglicht es uns, die Benutzeroberfläche dynamisch an den Zustand unserer Anwendung anzupassen. Im Kontext unseres Spiels können wir so verschiedene Nachrichten oder Elemente anzeigen, je nachdem, was gerade passiert. 🎮

## Hands-on Aufgaben zum Selbstprobieren

### Aufgabe: Implementierung einer Siegesnachricht mit bedingtem Rendern

**Anforderungen:**

1. **Erweitere den Zustand in `GameBoard.tsx`:**
   - Füge `cells` und `winner` zum Zustand hinzu.
   - Implementiere eine Funktion `checkWinner`, die überprüft, ob ein Spieler gewonnen hat.
   - Aktualisiere `handleCellClick`, um Züge zu verarbeiten und den Gewinner zu ermitteln.
2. **Passe das Rendern in `GameBoard.tsx` an:**
   - Verwende bedingtes Rendern, um die Siegesnachricht nur anzuzeigen, wenn ein Gewinner ermittelt wurde.
3. **Aktualisiere die `Cell`-Komponente:**
   - Entferne den internen Zustand `cellValue`.
   - Verwende stattdessen die `value`-Prop zum Anzeigen des Werts.
   - Füge eine `onClick`-Prop hinzu, um Klicks an die Elternkomponente zu melden.
4. **Teste das Spiel:**
   - Starte die Anwendung:
     ```bash
     npm run dev
     ```
   - Spiele das Spiel, bis ein Spieler gewinnt. Die Siegesnachricht sollte erscheinen! 🏆

### Zugehöriger Vitest für TDD

**Erstelle eine Testdatei `GameBoard.test.tsx` mit Tests für das bedingte Rendern:**

```tsx
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

  // Simuliere einen Sieg für 'X' in der oberen Reihe
  fireEvent.click(cells[0]); // X
  fireEvent.click(cells[3]); // Ignoriert, da wir nur 'X' setzen
  fireEvent.click(cells[1]); // X
  fireEvent.click(cells[4]); // Ignoriert
  fireEvent.click(cells[2]); // X

  const winnerMessage = screen.getByText(/Spieler X hat gewonnen!/i);
  expect(winnerMessage).toBeInTheDocument();
});
```

**Anforderungen aus dem Test abgeleitet:**

- **Test 1:** Zu Beginn des Spiels wird keine Siegesnachricht angezeigt.
- **Test 2:** Wenn ein Spieler gewinnt, wird die entsprechende Siegesnachricht angezeigt.

**Test ausführen:**

```bash
npm run test
```

- Stelle sicher, dass beide Tests erfolgreich sind. ✅

## Fertige Musterlösung dieses Kapitels

1. **Aktualisiere `GameBoard.tsx`:**

   ```tsx
   // src/GameBoard.tsx
   import React, { useState } from "react";
   import Cell from "./Cell";
   import "./GameBoard.css";

   function GameBoard() {
     const [cells, setCells] = useState(Array(9).fill(""));
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
         newCells[index] = "X";
         setCells(newCells);
         const gameWinner = checkWinner(newCells);
         if (gameWinner) {
           setWinner(gameWinner);
         }
       }
     };

     return (
       <div>
         <h2>Tic Tac Toe</h2>
         {winner && <h3>🎉 Spieler {winner} hat gewonnen!</h3>}
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

2. **Aktualisiere `Cell.tsx`:**

   ```tsx
   // src/Cell.tsx
   import React from "react";

   type CellProps = {
     value: string;
     onClick: () => void;
   };

   function Cell({ value, onClick }: CellProps) {
     return (
       <div className="cell" role="button" onClick={onClick}>
         {value}
       </div>
     );
   }

   export default Cell;
   ```

3. **Aktualisiere `GameBoard.test.tsx`:**

   ```tsx
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

     // Simuliere einen Sieg für 'X' in der oberen Reihe
     fireEvent.click(cells[0]); // X
     fireEvent.click(cells[1]); // X
     fireEvent.click(cells[2]); // X

     const winnerMessage = screen.getByText(/Spieler X hat gewonnen!/i);
     expect(winnerMessage).toBeInTheDocument();
   });
   ```

4. **Anwendung starten und Tests ausführen:**

   - **Anwendung starten:**

     ```bash
     npm run dev
     ```

     - Spiele das Spiel im Browser und achte darauf, dass die Siegesnachricht erscheint, wenn du gewinnst. 🥳

   - **Tests ausführen:**

     ```bash
     npm run test
     ```

     - Stelle sicher, dass alle Tests erfolgreich sind. ✅

5. **Optional: Styles anpassen**

   - Füge Styles hinzu, um die Siegesnachricht hervorzuheben.

     ```css
     /* src/GameBoard.css */
     h3 {
       text-align: center;
       color: green;
     }
     ```

---

**Herzlichen Glückwunsch!** 🎉 Du hast gelernt, wie man bedingtes Rendern in React verwendet. Jetzt zeigt unser Tic-Tac-Toe-Spiel eine Siegesnachricht an, sobald ein Spieler gewinnt. 🏆

Das Verständnis von bedingtem Rendern ist entscheidend, um dynamische und interaktive Benutzeroberflächen zu erstellen. Du bist auf dem besten Weg, ein React-Profi zu werden! 🚀
