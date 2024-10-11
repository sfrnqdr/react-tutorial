# Schritt 9: Ereignisbehandlung (Event Handling)

## Leitfrage

Wie funktioniert die Ereignisbehandlung (Event Handling) in React?

# Antwort

In React bezieht sich die **Ereignisbehandlung (Event Handling)** auf die Reaktion der Anwendung auf Benutzerinteraktionen wie Klicks, Tastendrücke oder Mausbewegungen. Ähnlich wie in traditionellen HTML-Seiten verwendet React Funktionen, um auf solche Ereignisse zu reagieren. Der Hauptunterschied besteht darin, wie diese Ereignisse gehandhabt und an die Komponenten gebunden werden.

### Allgemeine Struktur eines Ereignisbehandlers

Die allgemeine Struktur besteht aus drei Hauptkomponenten:

- **Das Ereignis**: Die Aktion, auf die wir reagieren möchten (z. B. ein Klick auf einen Button).
- **Das Ereignisattribut**: Ein Attribut des JSX-Elements, das das Ereignis darstellt (z. B. `onClick`).
- **Der Ereignisbehandler**: Eine Funktion, die ausgeführt wird, wenn das Ereignis ausgelöst wird.

### 2. **Event-Typen in React**

React unterstützt eine Vielzahl von Events, die den meisten HTML-Events ähneln. Diese Events werden in React mit **CamelCase** (Großschreibung der Anfangsbuchstaben innerlich) benannt, im Gegensatz zu den kleingeschriebenen HTML-Eventnamen. Hier einige gängige Event-Typen:

- `onClick` – Reagiert auf Klicks
- `onChange` – Reagiert auf Änderungen in Eingabefeldern
- `onSubmit` – Reagiert auf Formularübermittlungen
- `onMouseEnter` – Reagiert, wenn die Maus über ein Element bewegt wird

### Codebeispiel

Hier ist ein einfaches Beispiel, das zeigt, wie ein Button in einer React-Komponente einen Ereignis-Handler verwendet, um auf Klicks zu reagieren.

```tsx
import { useState } from "react";

const ClickButton = () => {
  // State zum Speichern der Klicknachricht
  const [message, setMessage] = useState("");

  // Ereignis-Handler-Funktion
  const handleClick = () => {
    setMessage("Button wurde geklickt!");
  };

  return (
    <div>
      {/* Button mit onClick-Handler */}
      <button onClick={handleClick}>Klick mich</button>

      {/* Anzeige der Nachricht */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ClickButton;
```

### Erklärung des Codes:

1. **Importieren von useState**: Wir verwenden den `useState` Hook, um den Zustand der Nachricht zu verwalten.
2. **Definieren der Komponente `ClickButton`**: Dies ist eine funktionale Komponente.
3. **State-Variable `message`**: Initial ist `message` leer. Sobald der Button geklickt wird, aktualisieren wir `message` mit einem Text.
4. **Ereignis-Handler `handleClick`**: Diese Funktion wird aufgerufen, wenn der Button geklickt wird, und setzt die `message`.
5. **JSX-Struktur**:

   - Ein `<button>`-Element mit dem `onClick`-Attribut, das auf `handleClick`verweist.
   - Ein `<p>`-Element, das die Nachricht anzeigt, wenn `message` nicht leer ist.

### Wie es funktioniert:

- Wenn der Benutzer auf den Button klickt, wird die Funktion `handleClick`aufgerufen.
- `handleClick` aktualisiert den Zustand `message` mit der Zeichenkette "Button wurde geklickt!".
- Durch die Aktualisierung des Zustands wird die Komponente neu gerendert, und die Nachricht wird unter dem Button angezeigt.

Dieses einfache Beispiel veranschaulicht, wie Ereignisbehandlung in React funktioniert, indem Benutzerinteraktionen erfasst und entsprechende Reaktionen innerhalb der Anwendung ausgelöst werden.

## Hands-on Aufgaben: Event Handling

### Ziel der Aufgabe

In dieser Aufgabe wirst du lernen, wie man Ereignisse in einer React-Anwendung handhabt, indem du eine Funktionalität hinzufügst, die es den Spielern ermöglicht, das Spiel zurückzusetzen. Du wirst einen Test erstellen, der sicherstellt, dass der Reset-Button korrekt funktioniert, und anschließend den erforderlichen Code implementieren, um diesen Test zu bestehen.

---

### Schritt 0: Clean Workspace herstellen

Bevor wir mit der eigentlichen Entwicklung beginnen, ist es wichtig, sicherzustellen, dass dein Arbeitsbereich sauber ist und mit dem Remote-Repository synchronisiert ist. Dies verhindert mögliche Konflikte und stellt sicher, dass du von einem stabilen Ausgangspunkt aus startest.

**Warum ist das sinnvoll für das Tutorial?**

- **Vermeidung von Konflikten:** Ein sauberer Arbeitsbereich minimiert das Risiko von Merge-Konflikten, die den Lernprozess unterbrechen könnten.
- **Konsistenz:** Durch das Zurücksetzen auf den Remote-Branch stellst du sicher, dass alle Beteiligten mit derselben Codebasis arbeiten.
- **Stabilität:** Ein synchronisierter Arbeitsbereich sorgt dafür, dass alle notwendigen Abhängigkeiten und Konfigurationen aktuell sind.

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

   - **Hinweis:** Ersetze `main` durch den entsprechenden Branch-Namen, falls du einen anderen Branch verwendest.

4. **Bereinige nicht verfolgte Dateien und Verzeichnisse:**

   ```bash
   git clean -fd
   ```

   - **Vorsicht:** Dieser Befehl entfernt unwiderruflich alle nicht verfolgten Dateien und Verzeichnisse. Stelle sicher, dass keine wichtigen Dateien verloren gehen.

---

### Schritt 1: Den Test verstehen

Zunächst betrachten wir den Test, der sicherstellt, dass der Reset-Button korrekt angezeigt wird und die Spielzustände zurückgesetzt werden, wenn er geklickt wird.

**Test für den Reset-Button:**

```typescript
// src/components/GameBoard/GameBoard.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import GameBoard from "./GameBoard";
import { describe, it, expect } from "vitest";

describe("GameBoard Komponente - Reset-Button", () => {
  it("zeigt den Reset-Button an", () => {
    render(<GameBoard />);
    const resetButton = screen.getByText("Spiel zurücksetzen");
    expect(resetButton).toBeInTheDocument();
  });

  it("setzt das Spiel zurück, wenn der Reset-Button geklickt wird", () => {
    render(<GameBoard />);
    const cells = screen.getAllByRole("button");

    // Simuliere einige Klicks auf Zellen
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[1]); // O
    expect(cells[0]).toHaveTextContent("X");
    expect(cells[1]).toHaveTextContent("O");

    // Klicke auf den Reset-Button
    const resetButton = screen.getByText("Spiel zurücksetzen");
    fireEvent.click(resetButton);

    // Überprüfe, dass alle Zellen zurückgesetzt sind
    cells.forEach((cell) => {
      expect(cell).toHaveTextContent("");
    });

    // Überprüfe den Spielstatus
    expect(screen.getByText("Spieler X ist am Zug")).toBeInTheDocument();
  });
});
```

**Was macht dieser Test?**

1. **Erster Test (`"zeigt den Reset-Button an"`):**
   - Überprüft, ob der Reset-Button mit der Beschriftung "Spiel zurücksetzen" in der `GameBoard`-Komponente gerendert wird.
2. **Zweiter Test (`"setzt das Spiel zurück, wenn der Reset-Button geklickt wird"`):**
   - Simuliert Klicks auf zwei Zellen, um das Spiel in einen nicht-standardmäßigen Zustand zu versetzen.
   - Überprüft, ob die Zellen die entsprechenden Werte ("X" und "O") anzeigen.
   - Klicke auf den Reset-Button.
   - Überprüft, ob alle Zellen wieder leer sind und der Spielstatus auf den Anfangszustand zurückgesetzt wurde.

---

### Schritt 2: Den Test ausführen

Falls der "Watch"-Modus nicht bereits läuft, gebe den Befehl `npm run test:watch` im Terminal ein.

**Erwarte folgendes Ergebnis:**

- Der neue Test sollte **fehlschlagen**. ❌
- Dies ist beabsichtigt, da die Funktionalität des Reset-Buttons noch nicht implementiert ist.

---

### Schritt 3: Den Code anpassen, um den Test zu bestehen

Jetzt schreiben wir den notwendigen Code, damit die Tests erfolgreich sind.

**So geht's:**

1. **Reset-Button zur GameBoard-Komponente hinzufügen:**

   - Füge einen Button mit der Beschriftung "Spiel zurücksetzen" zur `GameBoard`-Komponente hinzu.

2. **Event-Handler für den Reset-Button implementieren:**

   - Erstelle eine Funktion, die den Spielzustand (`cells`, `currentPlayer`, `winner`) zurücksetzt, wenn der Reset-Button geklickt wird.

3. **Button in der Benutzeroberfläche einbinden:**
   - Platziere den Reset-Button an einer geeigneten Stelle innerhalb der `GameBoard`-Komponente, z.B. unter dem Spielfeld.

---

### Schritt 4: Den Test erneut ausführen

Da der Test im "Watch"-Modus läuft, wird er automatisch erneut ausgeführt, sobald du die Datei gespeichert hast.

**Erwarte folgendes Ergebnis:**

- Der Test sollte jetzt **erfolgreich** sein. ✅
- Dies bedeutet, dass dein Code die erwartete Funktionalität des Reset-Buttons korrekt implementiert hat.

---

### Schritt 5: Die Anwendung im Browser betrachten

**So gehst du vor:**

1. **Starte die Entwicklungsumgebung:**

   - Falls der Entwicklungsserver nicht bereits läuft, gebe folgenden Befehl im Terminal ein:
     ```bash
     npm run dev
     ```
   - Dies startet deinen Entwicklungsserver.

2. **Öffne deinen Browser:**

   - Im Terminal wird eine lokale Adresse angezeigt, z.B. `http://localhost:3000`.
   - Öffne diese Adresse in deinem Browser.

3. **Überprüfe die Anzeige:**

   - Du solltest den Spielbereich mit dem Tic Tac Toe-Brett sehen.
   - Nach dem Spielen eines oder mehrerer Züge sollte der "Spiel zurücksetzen"-Button sichtbar sein.
   - Klicke auf den "Spiel zurücksetzen"-Button und überprüfe, ob das Spiel auf den Anfangszustand zurückgesetzt wird (alle Zellen sind leer, der aktuelle Spieler ist "X", und es gibt keine Gewinnernachricht).

### Zusammenfassung

In diesem Kapitel haben wir gelernt, wie man Ereignisse in einer React-Anwendung handhabt, indem wir einen Reset-Button hinzugefügt haben, der das Spiel zurücksetzt. Wir haben einen Test geschrieben, der sicherstellt, dass der Reset-Button korrekt angezeigt wird und die Spielzustände zurückgesetzt werden, wenn er geklickt wird. Anschließend haben wir den notwendigen Code implementiert, um diesen Test zu bestehen, und die Funktionalität in der Anwendung überprüft.

Durch diese Übung hast du praxisnah erfahren, wie Event Handling in React funktioniert und wie Tests (TDD) dir dabei helfen können, stabile und fehlerfreie Funktionen zu entwickeln.

---

**Inspiration gefällig?**

Hier ist ein teilweise auskommentierter Scaffolding-Code mit Anweisungen, der dir beim entdeckenden Lernen helfen kann:

```typescript
// src/components/GameBoard/GameBoard.tsx
import { useState } from "react";
import Cell from "../Cell/Cell";
import GameStatus from "../GameStatus/GameStatus.tsx";
import "./GameBoard.css";

const GameBoard = () => {
  const initialCells = Array(9).fill("");
  const [cells, setCells] = useState(initialCells);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");

  const checkWinner = (updatedCells: string[]) => {
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

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        updatedCells[a] &&
        updatedCells[a] === updatedCells[b] &&
        updatedCells[a] === updatedCells[c]
      ) {
        return updatedCells[a];
      }
    }
    return null;
  };

  const handleCellClick = (index: number) => {
    if (cells[index] === "" && winner === "") {
      const newCells = [...cells];
      newCells[index] = currentPlayer;
      setCells(newCells);

      const gameWinner = checkWinner(newCells);
      if (gameWinner) {
        setWinner(gameWinner);
      } else if (!newCells.includes("")) {
        setWinner("draw");
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    }
  };

  const handleReset = () => {
    // TODO: Implementiere die Reset-Logik
  };

  return (
    <div>
      <h2>Tic Tac Toe</h2>
      <GameStatus currentPlayer={currentPlayer} winner={winner} />
      <div className="board" role="grid">
        {cells.map((cell, index) => (
          <Cell
            key={index}
            value={cell}
            onClick={() => handleCellClick(index)}
          />
        ))}
      </div>
      {/* TODO: Füge den Reset-Button hinzu */}
    </div>
  );
};

export default GameBoard;
```

---

## Ergebnis veröffentlichen:

```shell
git add .
git commit -m "update: step-9-event-handling"
git push
```

## Nächstes Kapitel:

```shell
git checkout -b mustermann-max-step-10-use-state-hook origin/step-10-use-state-hook
```
