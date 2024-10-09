# Schritt 7: Komponentenkomposition

## Leitfrage

**Wie kombinieren wir in React mehrere Komponenten, um eine komplexere Benutzeroberfläche zu erstellen, und wie nutzen wir Komponentenkomposition in unserem Tic-Tac-Toe-Spiel?**

## Verständliche Antwort der Leitfrage für Anfänger

Hey du! 👋 In diesem Schritt schauen wir uns an, wie wir in React mehrere Komponenten zusammenfügen können, um eine vollständige und strukturierte Anwendung zu erstellen. Das nennt man **Komponentenkomposition**.

Stell dir vor, jede Komponente ist wie ein Baustein 🧩. Indem wir diese Bausteine zusammenfügen, können wir komplexere Strukturen bauen. In unserem Tic-Tac-Toe-Spiel können wir zum Beispiel das Spielfeld, die Zellen und zusätzliche Informationen wie die Spielstandsanzeige als separate Komponenten erstellen und sie miteinander kombinieren.

Durch Komponentenkomposition wird unser Code übersichtlicher, wiederverwendbarer und leichter zu warten. Lass uns sehen, wie wir das in unserem Spiel umsetzen können! 🎮

## Exemplarisches Codebeispiel (Tic Tac Toe)

**Erstellen einer `StatusMessage`-Komponente und Zusammensetzen der Komponenten:**

1. **Erstelle eine `StatusMessage`-Komponente:**

   ```tsx
   // src/StatusMessage.tsx
   import React from "react";

   type StatusMessageProps = {
     currentPlayer: string;
     winner: string;
   };

   function StatusMessage({ currentPlayer, winner }: StatusMessageProps) {
     return (
       <div className="status-message">
         {winner ? (
           <h3>🎉 Spieler {winner} hat gewonnen!</h3>
         ) : (
           <h3>Aktueller Spieler: {currentPlayer}</h3>
         )}
       </div>
     );
   }

   export default StatusMessage;
   ```

2. **Anpassen von `GameBoard.tsx`, um `StatusMessage` zu verwenden:**

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

## Ausführliche vertiefende Erläuterung des Konzepts für Fortgeschrittene

**Komponentenkomposition** ist ein grundlegendes Prinzip in React, das es uns ermöglicht, komplexe Benutzeroberflächen aus einfacheren, wiederverwendbaren Komponenten aufzubauen. Dadurch fördern wir die Modularität und Wartbarkeit unseres Codes.

Im obigen Beispiel:

- **`StatusMessage`-Komponente:**

  - Diese Komponente ist verantwortlich für die Anzeige des aktuellen Spielstatus.
  - Sie erhält `currentPlayer` und `winner` als Props.
  - Sie entscheidet, basierend auf dem Wert von `winner`, ob sie die Siegesnachricht oder den aktuellen Spieler anzeigt.
  - Durch das Auslagern dieser Logik in eine eigene Komponente halten wir `GameBoard` übersichtlich.

- **Zusammensetzen der Komponenten in `GameBoard`:**
  - Wir importieren `StatusMessage` und fügen sie in unser Render-Ergebnis ein.
  - Indem wir Komponenten verschachteln, bauen wir unsere Benutzeroberfläche hierarchisch auf.

**Vorteile der Komponentenkomposition:**

- **Wiederverwendbarkeit:** Komponenten können in verschiedenen Teilen der Anwendung oder sogar in anderen Projekten wiederverwendet werden.
- **Klarheit und Wartbarkeit:** Der Code ist sauberer und leichter zu verstehen, da jede Komponente eine spezifische Aufgabe hat.
- **Testbarkeit:** Einzelne Komponenten können isoliert getestet werden, was die Fehlerbehebung erleichtert.

Durch die Komposition von Komponenten erstellen wir eine übersichtliche und skalierbare Struktur für unsere Anwendung. Dies ist besonders wichtig in größeren Projekten, wo die Komplexität ohne klare Struktur schnell zunimmt.

## Hands-on Aufgaben zum Selbstprobieren

### Aufgabe: Komposition von Komponenten im Tic-Tac-Toe-Spiel

**Anforderungen:**

1. **Erstelle die `StatusMessage`-Komponente:**

   - Erstelle eine neue Datei `StatusMessage.tsx` im `src`-Verzeichnis.
   - Die Komponente soll die Props `currentPlayer` (aktueller Spieler) und `winner` erhalten.
   - Basierend auf dem Wert von `winner` soll sie entweder die Siegesnachricht oder den aktuellen Spieler anzeigen.

2. **Passe `GameBoard.tsx` an:**

   - Importiere die `StatusMessage`-Komponente.
   - Implementiere die Zustände `currentPlayer` und `winner`.
   - Aktualisiere die Funktion `handleCellClick`, um zwischen den Spielern zu wechseln und den Gewinner zu ermitteln.
   - Füge `<StatusMessage />` in das Render-Ergebnis ein und übergib die erforderlichen Props.

3. **Teste das Spiel:**
   - Starte die Anwendung:
     ```bash
     npm run dev
     ```
   - Spiele das Spiel und beobachte, wie die Anzeige zwischen den Spielern wechselt und die Siegesnachricht erscheint, wenn jemand gewinnt. 🎉

### Zugehöriger Vitest für TDD

**Erstelle eine Testdatei `StatusMessage.test.tsx` für die `StatusMessage`-Komponente:**

```tsx
// src/StatusMessage.test.tsx
import { render, screen } from "@testing-library/react";
import StatusMessage from "./StatusMessage";

test("zeigt den aktuellen Spieler an, wenn kein Gewinner vorhanden ist", () => {
  render(<StatusMessage currentPlayer="X" winner="" />);
  const statusElement = screen.getByText(/Aktueller Spieler: X/i);
  expect(statusElement).toBeInTheDocument();
});

test("zeigt die Siegesnachricht an, wenn ein Gewinner vorhanden ist", () => {
  render(<StatusMessage currentPlayer="O" winner="X" />);
  const winnerElement = screen.getByText(/Spieler X hat gewonnen!/i);
  expect(winnerElement).toBeInTheDocument();
});
```

**Anforderungen aus dem Test abgeleitet:**

- Die `StatusMessage`-Komponente soll:
  - Den aktuellen Spieler anzeigen, wenn `winner` leer ist.
  - Die Siegesnachricht anzeigen, wenn `winner` einen Wert hat.

**Test ausführen:**

- Führe im Terminal aus:

  ```bash
  npm run test
  ```

- Stelle sicher, dass beide Tests erfolgreich sind. ✅

## Fertige Musterlösung dieses Kapitels

1. **Erstellen der `StatusMessage`-Komponente:**

   ```tsx
   // src/StatusMessage.tsx
   import React from "react";

   type StatusMessageProps = {
     currentPlayer: string;
     winner: string;
   };

   function StatusMessage({ currentPlayer, winner }: StatusMessageProps) {
     return (
       <div className="status-message">
         {winner ? (
           <h3>🎉 Spieler {winner} hat gewonnen!</h3>
         ) : (
           <h3>Aktueller Spieler: {currentPlayer}</h3>
         )}
       </div>
     );
   }

   export default StatusMessage;
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

3. **Aktualisieren der `Cell`-Komponente (falls noch nicht geschehen):**

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

4. **Erstellen der Tests für `StatusMessage`:**

   ```tsx
   // src/StatusMessage.test.tsx
   import { render, screen } from "@testing-library/react";
   import StatusMessage from "./StatusMessage";

   test("zeigt den aktuellen Spieler an, wenn kein Gewinner vorhanden ist", () => {
     render(<StatusMessage currentPlayer="X" winner="" />);
     const statusElement = screen.getByText(/Aktueller Spieler: X/i);
     expect(statusElement).toBeInTheDocument();
   });

   test("zeigt die Siegesnachricht an, wenn ein Gewinner vorhanden ist", () => {
     render(<StatusMessage currentPlayer="O" winner="X" />);
     const winnerElement = screen.getByText(/Spieler X hat gewonnen!/i);
     expect(winnerElement).toBeInTheDocument();
   });
   ```

5. **Anwendung starten und Tests ausführen:**

   - **Anwendung starten:**

     ```bash
     npm run dev
     ```

     - Spiele das Spiel im Browser und beobachte, wie die Anzeige zwischen den Spielern wechselt und die Siegesnachricht erscheint, wenn jemand gewinnt. 🎉

   - **Tests ausführen:**

     ```bash
     npm run test
     ```

     - Stelle sicher, dass alle Tests erfolgreich sind. ✅

6. **Optional: Styles hinzufügen:**

   - **Styles für `StatusMessage`:**

     ```css
     /* src/GameBoard.css oder src/StatusMessage.css */
     .status-message h3 {
       text-align: center;
       margin: 10px 0;
     }
     ```

   - **Importieren der Styles (falls in `StatusMessage.css`):**

     ```tsx
     // src/StatusMessage.tsx
     import React from "react";
     import "./StatusMessage.css";

     // Restlicher Code bleibt gleich
     ```

---

**Fantastisch!** 🎉 Du hast gelernt, wie man Komponenten in React zusammensetzt, um eine modularere und besser strukturierte Anwendung zu erstellen.

Durch das Erstellen einer separaten `StatusMessage`-Komponente und das Zusammensetzen mit `GameBoard` und `Cell` haben wir unser Tic-Tac-Toe-Spiel verbessert und unseren Code sauberer gestaltet. 🧼

Die Komponentenkomposition ist ein wesentliches Konzept in React und wird dir dabei helfen, größere und komplexere Anwendungen zu bauen. Du machst großartige Fortschritte! 🚀
