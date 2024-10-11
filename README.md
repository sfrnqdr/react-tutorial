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

---

## Hands-on Aufgaben: Komposition anwenden

### Ziel der Aufgabe

Erweitere das Tic-Tac-Toe-Spiel zu einem vollständigen Zwei-Spieler-Spiel!

- **Implementiere den Wechsel zwischen zwei Spielern**, die abwechselnd "X" und "O" setzen.
- **Zeige an, welcher Spieler gerade am Zug ist.**
- **Nutze Komponentenkomposition**, um die Anzeigelogik (z.B. aktueller Spieler, Gewinner) in eine eigene Komponente auszulagern.
- **Verstehe die vorgegebenen Vitest-Tests** und entwickle den Code so, dass alle Tests erfolgreich sind.

---

### Schritt 0: Clean Workspace herstellen

Bevor wir mit der eigentlichen Entwicklung beginnen, ist es wichtig, sicherzustellen, dass dein Arbeitsbereich sauber ist und mit dem Remote-Repository synchronisiert ist. Dies verhindert mögliche Konflikte und stellt sicher, dass du von einem stabilen Ausgangspunkt aus startest.

**Warum ist das sinnvoll für das Tutorial?**

- **Vermeidung von Konflikten:** Ein sauberer Arbeitsbereich minimiert das Risiko von Merge-Konflikten, die den Lernprozess unterbrechen könnten.
- **Konsistenz:** Durch das Zurücksetzen auf den Remote-Branch stellst du sicher, dass alle Beteiligten mit derselben Codebasis arbeiten.
- **Stabilität:** Ein synchronisierter Arbeitsbereich sorgt dafür, dass alle notwendigen Abhängigkeiten und Konfigurationen aktuell sind.

**So gehst du vor:**

1. **Überprüfe den aktuellen Status deines Arbeitsbereichs:**

   ```bash
   git status
   ```

   - Stelle sicher, dass keine ungespeicherten Änderungen oder nicht committeten Dateien vorhanden sind. Wenn es solche gibt, committe sie oder sichere sie anderweitig ab.

2. **Hole die neuesten Änderungen vom Remote-Repository:**

   ```bash
   git fetch origin
   ```

3. **Setze deinen lokalen Branch auf den Stand des Remote-Branches zurück:**

   ```bash
   git reset --hard origin/main
   ```

   - **Hinweis:** Ersetze `main` durch den entsprechenden Branch-Namen, falls du einen anderen Branch verwendest.

4. **Bereinige nicht verfolgte Dateien und Verzeichnisse:**

   ```bash
   git clean -fd
   ```

   - **Vorsicht:** Dieser Befehl entfernt unwiderruflich alle nicht verfolgten Dateien und Verzeichnisse. Stelle sicher, dass keine wichtigen Dateien verloren gehen.

---

### Schritt 1: Den Test verstehen

In diesem Schritt analysieren wir die vorgegebenen Vitest-Tests, die sicherstellen, dass der Spielerwechsel korrekt funktioniert, der Gewinner richtig erkannt wird und ein Unentschieden korrekt angezeigt wird.

**Vorgegebene Vitest-Tests:**

```tsx
// src/GameBoard.test.tsx
import { render, fireEvent, screen } from "@testing-library/react";
import GameBoard from "./GameBoard";
import { describe, it, expect } from "vitest";

describe("GameBoard Component", () => {
  it("Wechselt den Spieler nach jedem Zug", () => {
    render(<GameBoard />);
    const cells = screen.getAllByRole("button");

    // Spieler X klickt auf das erste Feld
    fireEvent.click(cells[0]);
    expect(cells[0]).toHaveTextContent("X");

    // Überprüfe, ob Spieler O an der Reihe ist
    expect(screen.getByText("Spieler O ist am Zug")).toBeInTheDocument();

    // Spieler O klickt auf das zweite Feld
    fireEvent.click(cells[1]);
    expect(cells[1]).toHaveTextContent("O");

    // Überprüfe, ob Spieler X an der Reihe ist
    expect(screen.getByText("Spieler X ist am Zug")).toBeInTheDocument();
  });

  it("Erkennt den Gewinner korrekt", () => {
    render(<GameBoard />);
    const cells = screen.getAllByRole("button");

    // Simuliere eine Gewinnsituation für Spieler X
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[3]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[2]); // X

    expect(screen.getByText("🎉 Spieler X hat gewonnen!")).toBeInTheDocument();
  });

  it("Erkennt ein Unentschieden korrekt", () => {
    render(<GameBoard />);
    const cells = screen.getAllByRole("button");

    // Simuliere ein Unentschieden
    const drawMoves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
    drawMoves.forEach((index) => {
      fireEvent.click(cells[index]);
    });

    expect(
      screen.getByText("Das Spiel endet unentschieden!")
    ).toBeInTheDocument();
  });
});
```

**Was macht dieser Test?**

- **Spielerwechsel:**
  - Überprüft, ob nach jedem Zug der aktuelle Spieler korrekt wechselt.
  - Spieler "X" klickt zuerst und setzt sein Symbol.
  - Anschließend sollte Spieler "O" am Zug sein, um sein Symbol zu setzen.
- **Gewinnererkennung:**
  - Simuliert Spielzüge, bei denen Spieler "X" eine Gewinnkombination erreicht.
  - Überprüft, ob die Anwendung den Gewinner korrekt erkennt und anzeigt.
- **Unentschieden:**
  - Simuliert ein vollständiges Spiel ohne Sieger.
  - Überprüft, ob die Anwendung ein Unentschieden korrekt erkennt und anzeigt.

---

### Schritt 2: Den Test ausführen

Stelle sicher, dass der "Watch"-Modus der Tests läuft, um automatisch die Testergebnisse nach Änderungen zu sehen. Falls der "Watch"-Modus nicht bereits aktiv ist, starte ihn mit folgendem Befehl:

```bash
npm run test:watch
```

**Erwarte folgendes Ergebnis:**

- Alle Tests sollten **fehlschlagen**. ❌
- Das ist beabsichtigt, da die erforderliche Funktionalität noch nicht implementiert ist.

---

### Schritt 3: Den Code anpassen, um den Test zu bestehen

Jetzt entwickeln wir den notwendigen Code, damit die vorgegebenen Tests erfolgreich sind.

**So geht's:**

1. **Spielerwechsel implementieren:**

   - Füge in der `GameBoard`-Komponente einen neuen Zustand `currentPlayer`hinzu, der den aktuellen Spieler ("X" oder "O") speichert.
   - Passe die Funktion `handleCellClick` an, sodass nach jedem Zug der Spieler wechselt.
   - Aktualisiere die Anzeige, um den aktuellen Spieler zu zeigen.

2. **Komponentenkomposition anwenden:**

   - Erstelle eine neue Komponente `GameStatus`, die Informationen über den Spielstatus (aktueller Spieler, Gewinner) anzeigt.
   - Binde `GameStatus` in `GameBoard` ein und übergib die notwendigen Daten über Props.

3. **Gewinnererkennung implementieren:**

   - Implementiere eine Funktion `checkWinner`, die prüft, ob ein Spieler gewonnen hat.
   - Aktualisiere den Spielstatus entsprechend.

4. **Unentschieden erkennen:**

   - Überprüfe, ob alle Felder gefüllt sind und kein Spieler gewonnen hat, um ein Unentschieden anzuzeigen.

---

**Inspiration gefällig?**

1. **Spielerwechsel und Gewinnererkennung implementieren**

   Aktualisiere `GameBoard.tsx`:

```tsx
// src/components/GameBoard/GameBoard.tsx

import { useState } from "react";
import Cell from "../Cell/Cell";
import GameStatus from "../GameStatus/GameStatus"; // Neue Komponente importieren
import "./GameBoard.css";

const GameBoard = () => {
  // Zustand für die Zellen des Spielfelds
  const [cells, setCells] = useState(Array(9).fill(""));

  // TODO: Füge hier den Zustand für den aktuellen Spieler hinzu
  // Beispiel:
  // const [currentPlayer, setCurrentPlayer] = useState("X");

  // TODO: Füge hier den Zustand für den Gewinner hinzu
  // Beispiel:
  // const [winner, setWinner] = useState("");

  // Funktion zur Überprüfung des Gewinners
  const checkWinner = (updatedCells: string[]) => {
    // Definiere die Gewinnmuster
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // TODO: Implementiere die Logik zur Überprüfung der Gewinnmuster
    // Beispiel:
    // for (let pattern of winPatterns) {
    //   const [a, b, c] = pattern;
    //   if (
    //     updatedCells[a] &&
    //     updatedCells[a] === updatedCells[b] &&
    //     updatedCells[a] === updatedCells[c]
    //   ) {
    //     return updatedCells[a];
    //   }
    // }
    // return null;
  };

  // Funktion zur Behandlung des Zell-Klicks
  const handleCellClick = (index: number) => {
    // TODO: Implementiere die Logik, die beim Klicken auf eine Zelle ausgeführt wird
    // - Aktualisiere die Zelle mit dem aktuellen Spieler
    // - Überprüfe auf einen Gewinner
    // - Wechsle den Spieler, falls das Spiel fortgesetzt wird
  };

  return (
    <div>
      <h2>Tic Tac Toe</h2>
      {/* TODO: Binde die GameStatus-Komponente ein und übergib die notwendigen Props */}
      {/* Beispiel:
          <GameStatus currentPlayer={currentPlayer} winner={winner} />
      */}
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
};

export default GameBoard;
```

2. **Komponentenkomposition anwenden**

   Erstelle `GameStatus.tsx`:

```tsx
// src/components/GameStatus/GameStatus.tsx

type GameStatusProps = {
  // TODO: Definiere die Props, die diese Komponente benötigt
  // Beispiel:
  // currentPlayer: string;
  // winner: string;
};

const GameStatus =
  ({}: /* TODO: Destrukturiere die Props hier */ GameStatusProps) => {
    return (
      <div>
        {/* TODO: Implementiere die Logik zur Anzeige des Spielstatus */}
        {/* Beispiel:
          {winner === "draw" ? (
            <h3>Das Spiel endet unentschieden!</h3>
          ) : winner ? (
            <h3>🎉 Spieler {winner} hat gewonnen!</h3>
          ) : (
            <h3>Spieler {currentPlayer} ist am Zug</h3>
          )}
      */}
      </div>
    );
  };

export default GameStatus;
```

---

### Schritt 4: Den Test erneut ausführen

Da der Test im "Watch"-Modus läuft, wird er automatisch erneut ausgeführt, sobald du die Datei gespeichert hast.

**Erwarte folgendes Ergebnis:**

- Alle Tests sollten jetzt **erfolgreich** sein. ✅
- Dies bedeutet, dass dein Code die erwartete Funktionalität erfüllt:
  - Der Spielerwechsel funktioniert korrekt.
  - Gewinner und Unentschieden werden korrekt erkannt und angezeigt.

---

### Schritt 5: Die Anwendung im Browser betrachten

**So gehst du vor:**

1. **Starte die Entwicklungsumgebung:**

   - Falls der Entwicklungsserver nicht bereits läuft, starte ihn mit folgendem Befehl im Terminal:
     ```bash
     npm run dev
     ```
   - Dies startet deinen Entwicklungsserver.

2. **Öffne deinen Browser:**

   - Im Terminal wird eine lokale Adresse angezeigt, z.B. `http://localhost:3000`.
   - Öffne diese Adresse in deinem Browser.

3. **Überprüfe die Anzeige:**

   - Du solltest das Tic-Tac-Toe-Spielfeld sehen.
   - Die aktuelle Spielstatusanzeige zeigt an, welcher Spieler am Zug ist.
   - Nach jedem Zug wechselt der Spieler, und bei einem Gewinn oder Unentschieden wird die entsprechende Nachricht angezeigt.

---

### Zusammenfassung

In diesem Kapitel haben wir das Tic-Tac-Toe-Spiel zu einem vollständigen Zwei-Spieler-Spiel erweitert. Wir haben den Spielerwechsel implementiert, eine separate Komponente für den Spielstatus erstellt und den Code so entwickelt, dass er die vorgegebenen Vitest-Tests erfolgreich besteht. Durch das Verstehen und Nutzen der vorgegebenen Tests konnten wir sicherstellen, dass unsere Anwendung die gewünschte Funktionalität zuverlässig erfüllt. Komponentenkomposition und testgetriebene Entwicklung haben die Wartbarkeit und Zuverlässigkeit unserer Anwendung verbessert.

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
