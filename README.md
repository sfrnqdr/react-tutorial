# Schritt 3: JSX-Implementierung

## Leitfrage

**Was ist JSX, und wie verwenden wir es, um unsere Benutzeroberfläche in React zu gestalten?**

## Verständliche Antwort der Leitfrage für Anfänger

Hey du! 😊 Jetzt tauchen wir tiefer in React ein und sprechen über JSX. JSX steht für JavaScript XML und erlaubt es uns, HTML-ähnliche Syntax direkt in unserem JavaScript-Code zu schreiben. Das macht es viel einfacher und übersichtlicher, die Benutzeroberfläche unserer Anwendung zu gestalten.

Statt komplizierten JavaScript-Code zu schreiben, können wir mit JSX unsere Komponenten strukturieren, als würden wir HTML schreiben. Lass uns gemeinsam sehen, wie wir das für unser Tic-Tac-Toe-Spiel nutzen können! 🕹️

## Exemplarisches Codebeispiel (Tic Tac Toe)

**Erstellen des Spielfeldes mit JSX:**

```tsx
// src/GameBoard.tsx
import React from "react";

function GameBoard() {
  return (
    <div>
      <h2>Tic Tac Toe</h2>
      <div className="board">
        <div className="cell" role="button">
          {" "}
        </div>
        <div className="cell" role="button">
          {" "}
        </div>
        <div className="cell" role="button">
          {" "}
        </div>
        <div className="cell" role="button">
          {" "}
        </div>
        <div className="cell" role="button">
          {" "}
        </div>
        <div className="cell" role="button">
          {" "}
        </div>
        <div className="cell" role="button">
          {" "}
        </div>
        <div className="cell" role="button">
          {" "}
        </div>
        <div className="cell" role="button">
          {" "}
        </div>
      </div>
    </div>
  );
}

export default GameBoard;
```

**Anpassen von `App.tsx`, um `GameBoard` einzubinden:**

```tsx
// src/App.tsx
import React from "react";
import Welcome from "./Welcome";
import GameBoard from "./GameBoard";

function App() {
  return (
    <div>
      <Welcome />
      <GameBoard />
    </div>
  );
}

export default App;
```

## Ausführliche vertiefende Erläuterung des Konzepts für Fortgeschrittene

JSX (JavaScript XML) ermöglicht es uns, eine deklarative Syntax für die Erstellung von React-Elementen zu verwenden. Unter der Haube wird JSX zu regulären JavaScript-Funktionsaufrufen kompiliert (`React.createElement`).

In unserem `GameBoard`-Beispiel verwenden wir JSX, um die Struktur des Spielfelds zu definieren. Wir erstellen neun `div`-Elemente mit der Klasse `cell`, die jeweils ein Spielfeld repräsentieren. Wir haben das `role="button"`-Attribut hinzugefügt, um die Zellen interaktiv und für Assistenztechnologien zugänglich zu machen.

Durch die Trennung der Komponenten (`Welcome` und `GameBoard`) fördern wir die Wiederverwendbarkeit und Lesbarkeit unseres Codes. Jede Komponente ist für einen bestimmten Teil der Benutzeroberfläche verantwortlich.

## Hands-on Aufgaben zum Selbstprobieren

### Aufgabe: Das Spielfeld mit JSX erstellen

**Anforderungen:**

1. **Erstelle eine neue Datei `GameBoard.tsx` im `src`-Verzeichnis.**

   - Definiere eine funktionale Komponente `GameBoard`, die ein 3x3 Tic-Tac-Toe-Spielfeld als JSX-Elemente darstellt.
   - Verwende `<div>`-Elemente mit der Klasse `cell` für die einzelnen Spielfelder.
   - Füge das `role="button"`-Attribut hinzu, um die Zellen interaktiv zu machen.
   - Exportiere die Komponente standardmäßig.

2. **Passe `App.tsx` an, um die `GameBoard`-Komponente zu verwenden.**

   - Importiere die `GameBoard`-Komponente.
   - Füge `<GameBoard />` unterhalb von `<Welcome />` in das JSX von `App` ein.

3. **Starte die Anwendung und überprüfe, ob das Spielfeld angezeigt wird.**

   - Führe im Terminal aus:

     ```bash
     npm run dev
     ```

   - Öffne die Anwendung im Browser. Du solltest das Tic-Tac-Toe-Spielfeld sehen. 🎉

### Zugehöriger Vitest für TDD

**Erstelle eine Testdatei `GameBoard.test.tsx` für die `GameBoard`-Komponente:**

```tsx
// src/GameBoard.test.tsx
import { render, screen } from "@testing-library/react";
import GameBoard from "./GameBoard";

test("zeigt das Tic-Tac-Toe-Spielfeld an", () => {
  render(<GameBoard />);
  const titleElement = screen.getByText(/Tic Tac Toe/i);
  expect(titleElement).toBeInTheDocument();

  const cells = screen.getAllByRole("button");
  expect(cells.length).toBe(9);
});
```

**Anforderungen aus dem Test abgeleitet:**

- Die `GameBoard`-Komponente soll den Titel **"Tic Tac Toe"** anzeigen.
- Es sollen neun interaktive Zellen vorhanden sein (Rolle `button`).

#### **Schritt 2: Test ausführen und initiales Ergebnis beobachten**

1. **Terminal öffnen:**

   - Öffne das Terminal (z.B. über VS Code oder dein bevorzugtes Terminal-Programm) in deinem Projektordner.

2. **Testbefehl ausführen:**

   - Gib folgenden Befehl ein und drücke Enter:

```bash
npm run test
```

- Stelle sicher, dass der Test erfolgreich durchläuft. ✅

## Fertige Musterlösung dieses Kapitels

1. **Erstellen der `GameBoard`-Komponente:**

   ```tsx
   // src/GameBoard.tsx
   import React from "react";

   function GameBoard() {
     return (
       <div>
         <h2>Tic Tac Toe</h2>
         <div className="board">
           <div className="cell" role="button">
             {" "}
           </div>
           <div className="cell" role="button">
             {" "}
           </div>
           <div className="cell" role="button">
             {" "}
           </div>
           <div className="cell" role="button">
             {" "}
           </div>
           <div className="cell" role="button">
             {" "}
           </div>
           <div className="cell" role="button">
             {" "}
           </div>
           <div className="cell" role="button">
             {" "}
           </div>
           <div className="cell" role="button">
             {" "}
           </div>
           <div className="cell" role="button">
             {" "}
           </div>
         </div>
       </div>
     );
   }

   export default GameBoard;
   ```

2. **Anpassen von `App.tsx`:**

   ```tsx
   // src/App.tsx
   import React from "react";
   import Welcome from "./Welcome";
   import GameBoard from "./GameBoard";

   function App() {
     return (
       <div>
         <Welcome />
         <GameBoard />
       </div>
     );
   }

   export default App;
   ```

3. **Test für `GameBoard`-Komponente erstellen:**

   ```tsx
   // src/GameBoard.test.tsx
   import { render, screen } from "@testing-library/react";
   import GameBoard from "./GameBoard";

   test("zeigt das Tic-Tac-Toe-Spielfeld an", () => {
     render(<GameBoard />);
     const titleElement = screen.getByText(/Tic Tac Toe/i);
     expect(titleElement).toBeInTheDocument();

     const cells = screen.getAllByRole("button");
     expect(cells.length).toBe(9);
   });
   ```

**Erklärung:**

- **Erster Test:** Prüft, ob die Überschrift "Einführung in Tic-Tac-Toe" vorhanden ist.
- **Zweiter Test:** Prüft, ob die Beschreibung des Spiels im Absatz (`<p>`) vorhanden ist.

#### **Schritt 2: Test ausführen und initiales Ergebnis beobachten**

1. **Terminal öffnen:**

   - **Anwendung starten:**

     ```bash
     npm run dev
     ```

     - Öffne die Anwendung im Browser unter der angegebenen Adresse (z. B. `http://localhost:3000`).
     - Du solltest die Begrüßungsnachricht und darunter das Tic-Tac-Toe-Spielfeld sehen.

   - **Tests ausführen:**

     ```bash
     npm run test
     ```

     - Stelle sicher, dass alle Tests erfolgreich sind. ✅

2. **Optional: Style hinzufügen (CSS):**

   - Erstelle eine CSS-Datei `GameBoard.css` im `src`-Verzeichnis:

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
     }
     ```

   - Importiere das CSS in `GameBoard.tsx`:

     ```tsx
     // src/GameBoard.tsx
     import React from "react";
     import "./GameBoard.css";

     function GameBoard() {
       // ... restlicher Code bleibt gleich
     }

     export default GameBoard;
     ```

   - Jetzt sieht das Spielfeld schon viel ansprechender aus! 🎨

---

**Fantastisch!** 🌟 Du hast gelernt, wie man JSX verwendet, um die Benutzeroberfläche zu gestalten, und hast damit unser Tic-Tac-Toe-Spielfeld erstellt. Mit jedem Schritt kommen wir unserem funktionsfähigen Spiel näher. Mach weiter so! 💪
