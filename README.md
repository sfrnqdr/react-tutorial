# Schritt 5: Styling von Komponenten

## Leitfrage

**Wie können wir unsere React-Komponenten stilvoll gestalten und CSS verwenden, um unser Tic-Tac-Toe-Spiel ansprechender zu machen?**

## Verständliche Antwort der Leitfrage für Anfänger

Hey du! 👋 Jetzt, wo unser Tic-Tac-Toe-Spiel funktioniert, ist es an der Zeit, ihm einen coolen Look zu verpassen! ✨

In React können wir CSS verwenden, um unsere Komponenten zu stylen und das Aussehen unserer Anwendung zu verbessern. Es gibt verschiedene Möglichkeiten, CSS in React zu verwenden: externe Stylesheets, Inline-Styles oder CSS-Module.

Wir werden uns darauf konzentrieren, wie wir externe Stylesheets nutzen können, um unsere Komponenten schön und attraktiv zu gestalten. Lass uns unserem Spiel etwas Farbe und Stil hinzufügen! 🎨

## Exemplarisches Codebeispiel (Tic Tac Toe)

**Erstellen und Anwenden von Styles für das Spielfeld und die Zellen:**

1. **Erstelle eine CSS-Datei für das Spielfeld:**

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
     background-color: #fff;
     border: 2px solid #444;
     display: flex;
     align-items: center;
     justify-content: center;
     font-size: 2rem;
     cursor: pointer;
     user-select: none;
     transition: background-color 0.3s;
   }

   .cell:hover {
     background-color: #f0f0f0;
   }
   ```

2. **Importiere die CSS-Datei in `GameBoard.tsx`:**

   ```tsx
   // src/GameBoard.tsx
   import React from "react";
   import Cell from "./Cell";
   import "./GameBoard.css"; // CSS importieren

   function GameBoard() {
     // ... vorheriger Code bleibt gleich
   }

   export default GameBoard;
   ```

3. **Erstelle eine CSS-Datei für die `Cell`-Komponente (optional):**

   ```css
   /* src/Cell.css */
   .cell {
     /* Zusätzliche Styles können hier hinzugefügt werden */
   }
   ```

4. **Importiere die CSS-Datei in `Cell.tsx` (optional):**

   ```tsx
   // src/Cell.tsx
   import React, { useState } from "react";
   import "./Cell.css"; // CSS importieren

   // ... restlicher Code bleibt gleich
   ```

## Ausführliche vertiefende Erläuterung des Konzepts für Fortgeschrittene

In React können wir CSS nutzen, um unsere Komponenten zu stylen und ihnen ein ansprechendes Aussehen zu verleihen. Hier sind einige Möglichkeiten, wie wir CSS in React verwenden können:

1. **Externe Stylesheets:** Wir erstellen eine `.css`-Datei und importieren sie in unsere Komponente. Dies ist die gängigste Methode und fördert die Trennung von Anliegen (Separation of Concerns).

2. **Inline-Styles:** Wir verwenden das `style`-Attribut in JSX-Elementen und übergeben ein JavaScript-Objekt mit den CSS-Eigenschaften. Diese Methode eignet sich für dynamische Styles, ist aber weniger übersichtlich bei vielen Styles.

3. **CSS-Module:** Wir verwenden CSS-Dateien mit besonderen Erweiterungen (`.module.css`), die lokale Scope-Styles ermöglichen, um Namenskonflikte zu vermeiden.

Im obigen Beispiel verwenden wir externe Stylesheets:

- Wir erstellen `GameBoard.css` und definieren Styles für das `.board`-Container und die `.cell`-Elemente.
- Durch das Importieren von `./GameBoard.css` in `GameBoard.tsx` werden die Styles auf die Komponenten angewendet.
- Wir verwenden Grid Layout, um das Spielfeld zu gestalten, und fügen Hover-Effekte hinzu, um die Benutzerinteraktion zu verbessern.

Durch das Styling unserer Komponenten verbessern wir die Benutzererfahrung und machen unser Spiel visuell ansprechender. 🎮

## Hands-on Aufgaben zum Selbstprobieren

### Aufgabe: Styling des Tic-Tac-Toe-Spiels mit CSS

**Anforderungen:**

1. **Erstelle eine CSS-Datei `GameBoard.css` im `src`-Verzeichnis.**

   - Definiere Styles für die Klassen `.board` und `.cell`.
   - Gestalte das Spielfeld als Grid mit 3 Spalten und 3 Zeilen.
   - Füge optische Verbesserungen wie Ränder, Hintergrundfarben und Hover-Effekte hinzu.

2. **Importiere die CSS-Datei in `GameBoard.tsx`.**

   - Stelle sicher, dass die Styles auf das Spielfeld angewendet werden.

3. **(Optional) Erstelle eine CSS-Datei `Cell.css` für die `Cell`-Komponente.**

   - Füge spezifische Styles für die Zellen hinzu, wenn nötig.
   - Importiere die CSS-Datei in `Cell.tsx`.

4. **Starte die Anwendung und überprüfe das neue Styling.**

   - Führe im Terminal aus:

     ```bash
     npm run dev
     ```

   - Öffne die Anwendung im Browser. Das Spielfeld sollte nun gestylt sein! 🌟

### Zugehöriger Vitest für TDD

**Obwohl CSS schwer zu testen ist, können wir sicherstellen, dass die Klassen korrekt angewendet werden.**

**Erstelle eine Testdatei `GameBoard.test.tsx` mit zusätzlichen Tests:**

```tsx
// src/GameBoard.test.tsx
import { render, screen } from "@testing-library/react";
import GameBoard from "./GameBoard";

test('das Spielfeld hat die Klasse "board"', () => {
  render(<GameBoard />);
  const boardElement = screen.getByRole("grid");
  expect(boardElement).toHaveClass("board");
});

test('die Zellen haben die Klasse "cell"', () => {
  render(<GameBoard />);
  const cellElements = screen.getAllByRole("button");
  cellElements.forEach((cell) => {
    expect(cell).toHaveClass("cell");
  });
});
```

**Anpassungen im Code, um die Tests zu unterstützen:**

- Füge `role="grid"` zum Spielfeld-Container hinzu:

  ```tsx
  // src/GameBoard.tsx
  // ...
  <div className="board" role="grid">
    {/* Zellen */}
  </div>
  // ...
  ```

**Anforderungen aus dem Test abgeleitet:**

- Das Spielfeld (`div` mit Klasse `board`) soll das Attribut `role="grid"` haben und die Klasse `board` besitzen.
- Die Zellen sollen die Klasse `cell` haben.

**Test ausführen:**

- Führe im Terminal aus:

  ```bash
  npm run test
  ```

- Stelle sicher, dass die neuen Tests erfolgreich durchlaufen. ✅

## Fertige Musterlösung dieses Kapitels

1. **Erstellen der CSS-Datei `GameBoard.css`:**

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
     background-color: #fff;
     border: 2px solid #444;
     display: flex;
     align-items: center;
     justify-content: center;
     font-size: 2rem;
     cursor: pointer;
     user-select: none;
     transition: background-color 0.3s;
   }

   .cell:hover {
     background-color: #f0f0f0;
   }
   ```

2. **Importieren des CSS in `GameBoard.tsx`:**

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
         <div className="board" role="grid">
           {initialCells.map((cell, index) => (
             <Cell key={index} value={cell} />
           ))}
         </div>
       </div>
     );
   }

   export default GameBoard;
   ```

3. **Anpassen der `Cell`-Komponente (optional):**

   - **Cell.css** erstellen (falls benötigt):

     ```css
     /* src/Cell.css */
     /* Zusätzliche Styles für die Zelle */
     .cell {
       /* Styles hier hinzufügen */
     }
     ```

   - **Importieren von `Cell.css` in `Cell.tsx`:**

     ```tsx
     // src/Cell.tsx
     import React, { useState } from "react";
     import "./Cell.css";

     // ... restlicher Code bleibt gleich
     ```

4. **Anpassen der Tests in `GameBoard.test.tsx`:**

   ```tsx
   // src/GameBoard.test.tsx
   import { render, screen } from "@testing-library/react";
   import GameBoard from "./GameBoard";

   test('das Spielfeld hat die Klasse "board"', () => {
     render(<GameBoard />);
     const boardElement = screen.getByRole("grid");
     expect(boardElement).toHaveClass("board");
   });

   test('die Zellen haben die Klasse "cell"', () => {
     render(<GameBoard />);
     const cellElements = screen.getAllByRole("button");
     cellElements.forEach((cell) => {
       expect(cell).toHaveClass("cell");
     });
   });
   ```

5. **Anwendung starten und Tests ausführen:**

   - **Anwendung starten:**

     ```bash
     npm run dev
     ```

     - Öffne die Anwendung im Browser. Du solltest jetzt das gestylte Spielfeld sehen. 🌈

   - **Tests ausführen:**

     ```bash
     npm run test
     ```

     - Stelle sicher, dass alle Tests erfolgreich sind. ✅

6. **Zusätzliche Verbesserungen (optional):**

   - **Responsive Design:** Passe die Größenangaben an, um das Spielfeld auf verschiedenen Bildschirmgrößen gut aussehen zu lassen.

   - **Farbschema ändern:** Experimentiere mit verschiedenen Farben, um ein einzigartiges Design zu erstellen.

   - **Fonts hinzufügen:** Verwende benutzerdefinierte Schriftarten, um das Erscheinungsbild zu verbessern.

---

**Großartig!** 🎉 Du hast gelernt, wie man in React CSS verwendet, um Komponenten zu stylen. Dein Tic-Tac-Toe-Spiel sieht jetzt viel attraktiver aus, und du hast ein besseres Verständnis dafür, wie Styling in React funktioniert.

Durch das Anwenden von CSS auf deine Komponenten kannst du das Benutzererlebnis erheblich verbessern und deine Anwendung professioneller gestalten. 🚀

**Wenn du bereit bist, sage "weiter", um zum nächsten Kapitel zu gelangen.**
