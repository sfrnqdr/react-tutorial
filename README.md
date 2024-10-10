# Schritt 4: Props vs. State

## Leitfrage

**Was sind Props und State in React, und wie unterscheiden sie sich bei der Verwaltung von Daten in unseren Komponenten?**

## Verständliche Antwort der Leitfrage für Anfänger

Hey du! 👋 Jetzt, wo wir das Spielfeld haben, ist es Zeit, uns anzusehen, wie wir Daten in unseren React-Komponenten verwalten können. Dazu müssen wir die Konzepte **Props** und **State** verstehen.

**Props** (Properties) sind wie die Parameter einer Funktion. Sie werden von außen an eine Komponente übergeben und sind unveränderlich innerhalb dieser Komponente.

**State** hingegen ist intern in einer Komponente. Es ermöglicht einer Komponente, ihren eigenen Datenzustand zu verwalten und zu ändern.

Stell dir Props als den Input vor, den eine Komponente von ihrem Elternteil bekommt, und State als die eigenen Daten der Komponente, die sich ändern können.

Lass uns sehen, wie wir das in unserem Tic-Tac-Toe-Spiel anwenden können! 🕹️

## Exemplarisches Codebeispiel (Tic Tac Toe)

**Erstellen einer `Cell`-Komponente mit Props und State:**

```tsx
// src/Cell.tsx
import React, { useState } from "react";

type CellProps = {
  value: string;
};

function Cell({ value }: CellProps) {
  const [cellValue, setCellValue] = useState(value);

  const handleClick = () => {
    if (cellValue === "") {
      setCellValue("X"); // Wir setzen vorerst immer 'X' als Beispiel
    }
  };

  return (
    <div className="cell" role="button" onClick={handleClick}>
      {cellValue}
    </div>
  );
}

export default Cell;
```

**Anpassen von `GameBoard.tsx`, um `Cell` zu verwenden:**

```tsx
// src/GameBoard.tsx
import React from "react";
import Cell from "./Cell";
import "./GameBoard.css";

function GameBoard() {
  const initialCells = Array(9).fill("");

  return (
    <div>
      <h2>Tic Tac Toe</h2>
      <div className="board">
        {initialCells.map((cell, index) => (
          <Cell key={index} value={cell} />
        ))}
      </div>
    </div>
  );
}

export default GameBoard;
```

## Ausführliche vertiefende Erläuterung des Konzepts für Fortgeschrittene

In React sind **Props** die Daten, die von einer Elternkomponente an eine Kindkomponente übergeben werden. Sie sind unveränderlich innerhalb der Kindkomponente. Das bedeutet, dass die Kindkomponente die Props nicht verändern sollte.

Der **State** hingegen stellt den internen Zustand einer Komponente dar. Mit Hooks wie `useState` können wir den State innerhalb einer funktionalen Komponente verwalten.

In unserem Beispiel:

- In `GameBoard.tsx` erzeugen wir ein Array `initialCells`, das aus neun leeren Strings besteht. Dieses Array repräsentiert den Anfangszustand unseres Spielfelds.
- Wir verwenden `map`, um über jedes Element des Arrays zu iterieren und eine `Cell`-Komponente zu rendern.
- Wir übergeben die `value`-Prop an jede `Cell`, initialisiert mit einem leeren String.

In der `Cell`-Komponente:

- Wir verwenden die `useState`-Hook, um den Zustand `cellValue` zu verwalten, initialisiert mit dem übergebenen `value`.
- Beim Klick auf die Zelle (`handleClick`) prüfen wir, ob `cellValue` leer ist. Wenn ja, setzen wir es auf `'X'` (als einfaches Beispiel).
- Dadurch wird die Komponente neu gerendert und zeigt den aktualisierten Wert an.

Dies zeigt, wie Props und State zusammenarbeiten:

- **Props**: Die `Cell`-Komponente erhält ihren Anfangswert von der Elternkomponente `GameBoard` über die `value`-Prop.
- **State**: Die `Cell`-Komponente verwaltet ihren eigenen Zustand `cellValue`, der sich ändern kann, wenn der Nutzer mit der Komponente interagiert.

## Hands-on Aufgaben zum Selbstprobieren

### Aufgabe: Verwendung von Props und State in Komponenten

**Anforderungen:**

1. **Erstelle eine neue Datei `Cell.tsx` im `src`-Verzeichnis.**

   - Definiere eine funktionale Komponente `Cell`, die eine `value`-Prop erhält.
   - Verwende `useState`, um den internen Zustand `cellValue` zu verwalten, initialisiert mit `value`.
   - Implementiere eine Klickfunktion (`handleClick`), die `cellValue` auf `'X'` setzt, wenn es leer ist.
   - Render die Zelle mit dem aktuellen `cellValue`.

2. **Passe `GameBoard.tsx` an, um die `Cell`-Komponente zu verwenden.**

   - Importiere die `Cell`-Komponente.
   - Erzeuge ein Array `initialCells` mit neun leeren Strings.
   - Verwende `map`, um über `initialCells` zu iterieren und für jedes Element eine `Cell` zu rendern, wobei `value` übergeben wird.

3. **Starte die Anwendung und teste das Spielfeld.**

   - Führe im Terminal aus:

     ```bash
     npm install
     npm run dev
     ```

   - Öffne die Anwendung im Browser.
   - Klicke auf eine Zelle; sie sollte ein `'X'` anzeigen. 📝

### Zugehöriger Vitest für TDD

**Erstelle eine Testdatei `Cell.test.tsx` für die `Cell`-Komponente:**

```tsx
// src/Cell.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Cell from "./Cell";

test("zeigt den initialen Wert an", () => {
  render(<Cell value="" />);
  const cellElement = screen.getByRole("button");
  expect(cellElement).toHaveTextContent("");
});

test('ändert den Wert auf "X" bei Klick, wenn leer', () => {
  render(<Cell value="" />);
  const cellElement = screen.getByRole("button");
  fireEvent.click(cellElement);
  expect(cellElement).toHaveTextContent("X");
});

test("ändert den Wert nicht, wenn bereits gesetzt", () => {
  render(<Cell value="O" />);
  const cellElement = screen.getByRole("button");
  fireEvent.click(cellElement);
  expect(cellElement).toHaveTextContent("O");
});
```

**Anforderungen aus dem Test abgeleitet:**

- Die `Cell`-Komponente soll den initialen Wert aus der `value`-Prop anzeigen.
- Beim Klick auf eine leere Zelle soll der Wert auf `'X'` geändert werden.
- Wenn die Zelle bereits einen Wert hat, soll ein Klick den Wert nicht ändern.

**Test ausführen:**

- Führe im Terminal aus:

  ```bash
  npm run test
  ```

- Stelle sicher, dass alle Tests erfolgreich durchlaufen. ✅

## Fertige Musterlösung dieses Kapitels

1. **Erstellen der `Cell`-Komponente:**

   ```tsx
   // src/Cell.tsx
   import React, { useState } from "react";

   type CellProps = {
     value: string;
   };

   function Cell({ value }: CellProps) {
     const [cellValue, setCellValue] = useState(value);

     const handleClick = () => {
       if (cellValue === "") {
         setCellValue("X");
       }
     };

     return (
       <div className="cell" role="button" onClick={handleClick}>
         {cellValue}
       </div>
     );
   }

   export default Cell;
   ```

2. **Anpassen von `GameBoard.tsx`:**

   ```tsx
   // src/GameBoard.tsx
   import React from "react";
   import Cell from "./Cell";
   import "./GameBoard.css";

   function GameBoard() {
     const initialCells = Array(9).fill("");

     return (
       <div>
         <h2>Tic Tac Toe</h2>
         <div className="board">
           {initialCells.map((cell, index) => (
             <Cell key={index} value={cell} />
           ))}
         </div>
       </div>
     );
   }

   export default GameBoard;
   ```

3. **Erstellen der Tests für `Cell`:**

   ```tsx
   // src/Cell.test.tsx
   import { render, screen, fireEvent } from "@testing-library/react";
   import Cell from "./Cell";

   test("zeigt den initialen Wert an", () => {
     render(<Cell value="" />);
     const cellElement = screen.getByRole("button");
     expect(cellElement).toHaveTextContent("");
   });

   test('ändert den Wert auf "X" bei Klick, wenn leer', () => {
     render(<Cell value="" />);
     const cellElement = screen.getByRole("button");
     fireEvent.click(cellElement);
     expect(cellElement).toHaveTextContent("X");
   });

   test("ändert den Wert nicht, wenn bereits gesetzt", () => {
     render(<Cell value="O" />);
     const cellElement = screen.getByRole("button");
     fireEvent.click(cellElement);
     expect(cellElement).toHaveTextContent("O");
   });
   ```

4. **Anwendung starten und Tests ausführen:**

   - **Anwendung starten:**

     ```bash
     npm install
     npm run dev
     ```

     - Überprüfe im Browser, dass das Spielfeld angezeigt wird und die Zellen bei Klick korrekt reagieren.

   - **Tests ausführen:**

     ```bash
     npm run test
     ```

     - Stelle sicher, dass alle Tests erfolgreich sind. ✅

5. **Optional: Anpassung des CSS für die `Cell`-Komponente**

   - Passe die CSS-Datei `GameBoard.css` an, um die Darstellung der Zellen mit Werten zu verbessern.

     ```css
     /* src/GameBoard.css */

     .board {
       display: grid;
       grid-template-columns: repeat(3, 100px);
       grid-template-rows: repeat(3, 100px);
       gap: 5px;
       margin: 20px auto;
       width: max-content;
     }

     .cell {
       width: 100px;
       height: 100px;
       background-color: #f0f0f0;
       display: flex;
       align-items: center;
       justify-content: center;
       font-size: 2rem;
       cursor: pointer;
       user-select: none;
     }
     ```

---

**Super Arbeit!** 🎉 Du hast erfolgreich die Unterschiede zwischen Props und State verstanden und angewendet. Jetzt können unsere Zellen auf Klicks reagieren und ihren Zustand ändern. Damit haben wir einen wichtigen Schritt gemacht, um unser Tic-Tac-Toe-Spiel zum Laufen zu bringen. Weiter so! 💪
