## Leitfrage

Was ist JSX, und wie verwenden wir es, um unsere Benutzeroberfläche in React zu gestalten?

## Antwort

Jetzt tauchen wir tiefer in React ein und sprechen über JSX. JSX steht für JavaScript XML und erlaubt es uns, HTML-ähnliche Syntax direkt in unserem JavaScript-Code zu schreiben. Das macht es viel einfacher und übersichtlicher, die Benutzeroberfläche unserer Anwendung zu gestalten.

Anstatt komplizierten JavaScript-Code zu schreiben, können wir mit JSX unsere Komponenten strukturieren, als würden wir HTML schreiben. Lass uns gemeinsam sehen, wie wir das für unser Tic-Tac-Toe-Spiel nutzen können! 🕹️

**Vorteile von JSX:**

- **Lesbarkeit:** Der Code wird lesbarer und ähnelt dem, was letztendlich im Browser gerendert wird.
- **Kürzerer Code:** Weniger Boilerplate-Code im Vergleich zum manuellen Erstellen von Elementen.
- **Ausdrucksstark:** Ermöglicht das Einbetten von JavaScript-Ausdrücken innerhalb des Markups.

## Codebeispiel

```tsx
// src/components/GameBoard/GameBoard.tsx
const GameBoard = () => {
  return (
    <div>
      <h2>Tic Tac Toe</h2>

      <div className="board">
        <div className="cell" role="button"></div>
        <div className="cell" role="button"></div>
        <div className="cell" role="button"></div>
        <div className="cell" role="button"></div>
        <div className="cell" role="button"></div>
        <div className="cell" role="button"></div>
        <div className="cell" role="button"></div>
        <div className="cell" role="button"></div>
        <div className="cell" role="button"></div>
      </div>
    </div>
  );
};

export default GameBoard;
```

## Hands-on Aufgaben: Spielfeld erstellen

### Ziel der Aufgabe

Das Ziel dieser Aufgabe ist es, eine `GameBoard`-Komponente für ein Tic-Tac-Toe-Spiel zu erstellen, diese in die bestehende Anwendung zu integrieren und sicherzustellen, dass die Komponente ordnungsgemäß funktioniert und getestet wird. Dabei sollen sowohl die funktionalen als auch die visuellen Aspekte des Spielfelds implementiert und überprüft werden.

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

1. **Hole die neuesten Änderungen vom Remote-Repository:**

   ```bash
   git fetch origin
   ```

1. **Setze deinen lokalen Branch auf den Stand des Remote-Branches zurück:**

   ```bash
   git reset --hard origin/main
   ```

   - **Hinweis:** Ersetze `main` durch den entsprechenden Branch-Namen, falls du einen anderen Branch verwendest.

1. **Bereinige nicht verfolgte Dateien und Verzeichnisse:**

   ```bash
   git clean -fd
   ```

   - **Vorsicht:** Dieser Befehl entfernt unwiderruflich alle nicht verfolgten Dateien und Verzeichnisse. Stelle sicher, dass keine wichtigen Dateien verloren gehen.

---

### Schritt 1: Den Test verstehen

Zunächst erstellen wir einen Test für die `GameBoard`-Komponente, um sicherzustellen, dass das Spielfeld korrekt angezeigt wird.

```typescript
// src/components/GameBoard/GameBoard.test.tsx
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

**Was macht dieser Test?**
Dieser Test überprüft zwei Hauptaspekte der `GameBoard`-Komponente:

1. **Überschrift prüfen:** Es wird geprüft, ob die Überschrift "Tic Tac Toe" im Dokument vorhanden ist.
2. **Spielfeldzellen prüfen:** Es wird überprüft, ob genau neun Zellen (`button`-Elemente) im Spielfeld gerendert werden, was den neun Feldern eines Tic-Tac-Toe-Spiels entspricht.

---

### Schritt 2: Den Test ausführen

Falls der "Watch"-Modus nicht bereits läuft, gebe den Befehl `npm run test:watch` im Terminal ein.

**Erwarte folgendes Ergebnis:**

- Der Test sollte **fehlschlagen**. ❌
- Dies ist beabsichtigt, da die `GameBoard`-Komponente noch nicht implementiert ist und der Test die noch fehlende Funktionalität erkennt.

---

### Schritt 3: Den Code anpassen, um den Test zu bestehen

Jetzt schreiben wir den notwendigen Code, damit der Test erfolgreich ist.

**So geht's:**

1. **Erstellen der `GameBoard`-Komponente:**

   ```typescript
   // src/components/GameBoard/GameBoard.tsx
   ```

// TODO: Hier Gameboard-Komponente nach Test-Anforderungen implementieren

````

2. **Anpassen von `App.tsx`, um die `GameBoard`-Komponente einzubinden:**

```typescript
// src/components/App/App.tsx

import Welcome from "../Welcome/Welcome";
{/* TODO: Hier Gameboard-Komponente importieren */}

const App = () => {
  return (
    <div>
      <Welcome />
      <GameIntroduction />
      {/* TODO: Hier Gameboard-Komponente integrieren */}
      <GameBoard />
    </div>
  );
};

export default App;
````

3. **Erstellen der CSS-Datei für das Spielfeld (optional, für bessere Darstellung):**

   ```css
   /* src/components/GameBoard/GameBoard.css */

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

4. **Importieren der CSS-Datei in `GameBoard.tsx`:**

   ```typescript
   import "./GameBoard.css";
   ```

---

### Schritt 4: Den Test erneut ausführen

Da der Test im "Watch"-Modus läuft, wird er automatisch erneut ausgeführt, sobald du die Datei gespeichert hast.

**Erwarte folgendes Ergebnis:**

- Der Test sollte jetzt **erfolgreich** sein. ✅
- Dies bedeutet, dass dein Code die erwartete Funktionalität erfüllt und das Tic-Tac-Toe-Spielfeld korrekt angezeigt wird.

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

   - Im Terminal wird eine lokale Adresse angezeigt, z. B. `http://localhost:3000`.
   - Öffne diese Adresse in deinem Browser.

3. **Überprüfe die Anzeige:**

   - Du solltest die Begrüßungsnachricht aus der `Welcome`-Komponente sehen.
   - Darunter sollte das Tic-Tac-Toe-Spielfeld mit neun klickbaren Zellen angezeigt werden.

---

### Zusammenfassung

In diesem Kapitel haben wir eine `GameBoard`-Komponente für ein Tic-Tac-Toe-Spiel erstellt und in die bestehende Anwendung integriert. Wir haben einen Test geschrieben, der sicherstellt, dass das Spielfeld korrekt gerendert wird, und diesen Test erfolgreich bestanden. Zudem haben wir die visuelle Darstellung des Spielfelds mit CSS verbessert. Durch das Test-driven Development (TDD) Vorgehen haben wir sichergestellt, dass unsere Komponente den Anforderungen entspricht und zuverlässig funktioniert.

## Ergebnis veröffentlichen

Zum Abschluss dieses Kapitels solltest du deine Änderungen im remote Repository sichern:

```bash
git add .
git commit -m "Schritt 3: Interaktive Zellen mit JSX erstellt"
git push
```

## Nächstes Kapitel

```
git checkout -b mustermann-max-step-1-welcome origin/step-4-props-vs-state
```
