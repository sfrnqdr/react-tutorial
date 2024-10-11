## Leitfrage

Was ist bedingtes Rendern?

## Antwort

**Bedingtes Rendern** bedeutet, dass wir in unserer React-Anwendung entscheiden können, **was** auf dem Bildschirm angezeigt wird, abhängig von bestimmten **Bedingungen**. Das ist wie eine wenn-dann-Logik:

- **Wenn** etwas **wahr** ist, dann zeige **A** an.
- **Ansonsten** zeige **B** an.

Dieses Konzept ermöglicht es uns, **interaktive** und **dynamische** Benutzeroberflächen zu erstellen, die auf den Zustand der Anwendung oder Benutzerinteraktionen reagieren.

## Warum ist bedingtes Rendern nützlich?

- **Interaktivität:** Zeige oder verberge Elemente basierend auf Benutzereingaben.
- **Benutzerführung:** Zeige Fehlermeldungen, Warnungen oder Erfolgsmeldungen nur dann an, wenn sie relevant sind.
- **Komplexe UIs vereinfachen:** Teile der Benutzeroberfläche können ausgeblendet werden, um den Fokus auf wichtige Elemente zu lenken.

## Wie funktioniert bedingtes Rendern in React?

In React können wir JavaScript **Kontrollstrukturen** wie `if`-Anweisungen, den **ternären Operator** `? :` oder den **logischen UND-Operator** `&&` innerhalb unseres JSX-Codes verwenden, um Entscheidungen zu treffen.

## Codebeispiel

### Szenario

Stell dir vor, wir möchten in unserer Anwendung einen Begrüßungstext anzeigen, der sich ändert, je nachdem, ob der Benutzer eingeloggt ist oder nicht.

### Ternärer Operator

Wir verwenden den React-Hook `useState`, um den Zustand des Logins zu verwalten.

```tsx
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? <h1>Willkommen zurück!</h1> : <h1>Willkommen, Gast!</h1>}
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? "Ausloggen" : "Einloggen"}
      </button>
    </div>
  );
};

export default App;
```

### If-Else-Bedingungen

Wir können innerhalb unserer Komponente `if`-Anweisungen verwenden.

```tsx
const App() => {
  const [isMember, setIsMember] = useState(false);
  let message;

  if (isMember) {
    message = <h2>Danke für Ihre Mitgliedschaft!</h2>;
  } else {
    message = <h2>Bitte treten Sie unserer Community bei.</h2>;
  }

  return <div>{message}</div>;
}
```

### Logischer UND-Operator `&&`

Wenn wir nur dann etwas anzeigen wollen, wenn eine Bedingung wahr ist.

```tsx
const Notification = ({ isVisible }) => {
  return <div>{isVisible && <p>Sie haben eine neue Nachricht!</p>}</div>;
};
```

## Hands-on Aufgaben: Conditional Rendering

### Ziel der Aufgabe

In dieser Aufgabe erweitern wir unsere `GameBoard`-Komponente um bedingtes Rendern, um eine Siegesnachricht anzuzeigen, sobald ein Spieler das Tic-Tac-Toe-Spiel gewinnt. Dabei fügen wir eine `winner`-State hinzu, implementieren die Logik zur Gewinnerermittlung und passen die Benutzeroberfläche entsprechend an. Zusätzlich aktualisieren wir die Tests, um sicherzustellen, dass die bedingte Anzeige korrekt funktioniert.

---

### Schritt 0: Clean Workspace herstellen

Bevor wir mit der eigentlichen Entwicklung beginnen, ist es wichtig, sicherzustellen, dass dein Arbeitsbereich sauber ist und mit dem Remote-Repository synchronisiert ist. Dies verhindert mögliche Konflikte und stellt sicher, dass du von einem stabilen Ausgangspunkt aus startest.

**Warum ist das sinnvoll für das Tutorial?**

- **Vermeidung von Konflikten:** Ein sauberer Arbeitsbereich minimiert das Risiko von Merge-Konflikten, die den Lernprozess unterbrechen könnten.
- **Konsistenz:** Durch das Zurücksetzen auf den Remote-Branch stellst du sicher, dass alle Beteiligten mit derselben Codebasis arbeiten.
- **Stabilität:** Ein synchronisierter Arbeitsbereich sorgt dafür, dass alle notwendigen Abhängigkeiten und Konfigurationen aktuell sind.

**So gehst du vor:**

1. **Überprüfe den aktuellen Status deines Arbeitsbereichs:**

   `git status`

   - Stelle sicher, dass keine ungespeicherten Änderungen oder nicht committeten Dateien vorhanden sind. Wenn es solche gibt, committe sie oder sichere sie anderweitig ab.

-

1. **Hole die neuesten Änderungen vom Remote-Repository:**

   `git fetch origin`

2. **Setze deinen lokalen Branch auf den Stand des Remote-Branches zurück:**

   `git reset --hard origin/main`

   - **Hinweis:** Ersetze `main` durch den entsprechenden Branch-Namen, falls du einen anderen Branch verwendest.

3. **Bereinige nicht verfolgte Dateien und Verzeichnisse:**

   `git clean -fd`

   - **Vorsicht:** Dieser Befehl entfernt unwiderruflich alle nicht verfolgten Dateien und Verzeichnisse. Stelle sicher, dass keine wichtigen Dateien verloren gehen.

---

### Schritt 1: Den Test verstehen

Zunächst erstellen wir Tests für die `GameBoard`-Komponente, um sicherzustellen, dass die bedingte Rendering-Logik korrekt funktioniert und eine Siegesnachricht angezeigt wird, wenn ein Spieler gewinnt.

```tsx
// src/components/GameBoard/GameBoard.test.tsx

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

**Was macht dieser Test?**

Dieser Test überprüft die bedingte Rendering-Logik der `GameBoard`-Komponente:

1. **Keine Siegesnachricht zu Spielbeginn:** Überprüft, dass keine Siegesnachricht angezeigt wird, wenn das Spiel gerade begonnen hat und noch kein Gewinner feststeht.
2. **Siegesnachricht bei Gewinn:** Simuliert Spielzüge, die einen Sieg für Spieler "X" auslösen, und überprüft, ob die entsprechende Siegesnachricht korrekt angezeigt wird.

---

### Schritt 2: Den Test ausführen

Falls der "Watch"-Modus nicht bereits läuft, gebe den Befehl `npm run test:watch` im Terminal ein.

**Erwarte folgendes Ergebnis:**

- Der Test sollte **fehlschlagen**. ❌
- Dies ist beabsichtigt, da die bedingte Rendering-Logik noch nicht implementiert ist und der Test die noch fehlende Funktionalität erkennt.

---

### Schritt 3: Den Code anpassen, um den Test zu bestehen

Jetzt schreiben wir den notwendigen Code, damit die Tests erfolgreich sind.

**So geht's:**

1. **Aktualisiere `GameBoard.tsx`:**

```tsx
// src/components/GameBoard/GameBoard.tsx

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
      {/* TODO: Hier Siegesnachricht in Abhängigkeit zum Sieger implementieren */}
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

3. **Erstellen der CSS-Datei für die `GameBoard`-Komponente:**

Die Siegesnachricht soll in Grün dargestellt werden.

---

### Schritt 4: Den Test erneut ausführen

Da der Test im "Watch"-Modus läuft, wird er automatisch erneut ausgeführt, sobald du die Dateien gespeichert hast.

**Erwarte folgendes Ergebnis:**

- Der Test sollte jetzt **erfolgreich** sein. ✅
- Dies bedeutet, dass dein Code die erwartete Funktionalität erfüllt und die bedingte Anzeige der Siegesnachricht korrekt funktioniert.

---

### Schritt 5: Die Anwendung im Browser betrachten

**So gehst du vor:**

1. **Starte die Entwicklungsumgebung:**

   - Falls der Entwicklungsserver nicht bereits läuft, gebe folgenden Befehl im Terminal ein:

     `npm run dev`

   - Dies startet deinen Entwicklungsserver.

2. **Öffne deinen Browser:**

   - Im Terminal wird eine lokale Adresse angezeigt, z. B. `http://localhost:3000`.
   - Öffne diese Adresse in deinem Browser.

3. **Überprüfe die Anzeige:**

   - Du solltest die Begrüßungsnachricht aus der `Welcome`-Komponente sehen.
   - Darunter sollte das Tic-Tac-Toe-Spielfeld mit neun klickbaren Zellen angezeigt werden.
   - Spiele einige Züge, bis ein Spieler gewinnt. Sobald ein Spieler gewonnen hat, sollte die Siegesnachricht angezeigt werden, z. B. "🎉 Spieler X hat gewonnen!".

---

### Zusammenfassung

- **Bedingtes Rendern** erlaubt es uns, die angezeigten Inhalte dynamisch zu steuern.
- **Methoden des bedingten Renderns:**
  - **If-Else-Bedingungen**
  - **Ternärer Operator `? :`**
  - **Logischer UND-Operator `&&`**
- **Anwendungsfälle:**
  - Anzeigen von Statusmeldungen
  - Steuerung der Sichtbarkeit von Elementen
  - Reaktionen auf Benutzeraktionen

---

## Ergebnis veröffentlichen:

```bash
git add .
git commit -m "update: step-6-conditional-rendering"
git push
```

## Nächstes Kapitel:

```bash
git checkout -b mustermann-max-step-7-component-composition origin/step-7-component-composition
```
