# Schritt 7: Komponentenkomposition

## Leitfrage

Wie nutzen wir in React Komponentenkomposition?

## Antwort

In React dreht sich alles um Komponenten. Komponenten sind wiederverwendbare Bausteine, aus denen Benutzeroberflächen aufgebaut werden. Komponentenkomposition ist ein grundlegendes Konzept in React, das beschreibt, wie kleinere Komponenten zu komplexeren Benutzeroberflächen zusammengesetzt werden.

### Warum nutzen wir Komponentenkomposition?

- Wiederverwendung: Einmal erstellte Komponenten können an verschiedenen Stellen der Anwendung wiederverwendet werden.
- Klarheit und Struktur: Die Anwendung wird in überschaubare Teile zerlegt, was die Wartung und Weiterentwicklung erleichtert.
- Flexibilität: Durch das Kombinieren von Komponenten auf unterschiedliche Weise können vielfältige Layouts und Funktionen erreicht werden.
- Wartbarkeit: Änderungen müssen oft nur in einer Komponente vorgenommen werden und wirken sich automatisch überall dort aus, wo die Komponente verwendet wird.

## Codebeispiel

Nehmen wir an, wir möchten eine Webseite mit einem Header, einem Hauptinhalt und einem Footer erstellen. Wir erstellen dafür drei separate Komponenten und setzen sie dann in der Haupt-App-Komponente zusammen.

```tsx
// Header.js

const Header = () => {
  return (
    <header
      style={{ backgroundColor: "#282c34", padding: "20px", color: "white" }}
    >
      <h1>Meine Webseite</h1>
    </header>
  );
};

export default Header;
```

```tsx
// MainContent.js

const MainContent = () => {
  return (
    <main style={{ padding: "20px" }}>
      <p>
        Willkommen auf meiner Webseite! Hier findest du viele interessante
        Inhalte.
      </p>
    </main>
  );
};

export default MainContent;
```

```tsx
// Footer.js

cosnt Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#f1f1f1",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <p>&copy; 2023 Meine Webseite</p>
    </footer>
  );
}

export default Footer;
```

```tsx
// App.js
import Header from "./Header";
import MainContent from "./MainContent";
import Footer from "./Footer";

const App = () => {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default App;
```

### Erklärung des Codes

1. **Header.js, MainContent.js, Footer.js:**

   - Jede dieser Dateien definiert eine einfache React-Komponente.
   - Sie enthalten JSX-Code, der HTML-ähnliche Strukturen beschreibt.
   - Jede Komponente ist individuell gestaltet und kann unabhängig verwendet werden.

2. **App.js:**

   - Importiert die drei Komponenten: `Header`, `MainContent` und `Footer`.
   - Setzt diese Komponenten innerhalb eines `div`-Elements zusammen.
   - Das Ergebnis ist eine vollständige Webseite, die aus den zusammengesetzten Komponenten besteht.

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

### Zusammenfassung:

In React nutzen wir die Komponentenkomposition, um eine saubere und übersichtliche Struktur unserer Anwendung zu gewährleisten. Durch das Zusammenfügen kleiner, wiederverwendbarer Komponenten können wir komplexe Benutzeroberflächen effizient erstellen und pflegen.

---

## Ergebnis veröffentlichen:

```bash
git add .
git commit -m "update: step-7-component-composition"
git push
```

## Nächstes Kapitel:

```bash
git checkout -b mustermann-max-step-8-component-rendering origin/step-8-component-rendering
```
