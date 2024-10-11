# Schritt 8: Komponenten-Rendering

## Leitfrage

Was ist Rendering in React und wie funktioniert es?

## Antwort

**Rendering** bedeutet in React das Anzeigen von Komponenten auf dem Bildschirm. Wenn Sie eine Webseite öffnen, sorgt React dafür, dass alle Komponenten richtig dargestellt werden.

React hat eine clevere Methode, um Komponenten effizient zu rendern:

- **Virtuelles Fenster**: Stellen Sie sich vor, React hat ein "virtuelles Fenster" (Virtual DOM), in dem es Veränderungen vorbereitet.
- Wenn sich etwas ändert (z. B. Daten oder Zustand), aktualisiert React das virtuelle Fenster.
- **Vergleich**: React vergleicht das virtuelle Fenster mit dem echten Bildschirm.
- **Aktualisierung**: Nur die Teile, die sich geändert haben, werden auf dem Bildschirm aktualisiert.

### Wie funktioniert das Rendering?

1. **Initiales Rendering**: Beim ersten Laden der Anwendung erstellt React die gesamte UI basierend auf den Komponenten.
2. **Re-Rendering**: Wenn sich die Daten oder der Zustand einer Komponente ändern, rendern nur die betroffenen Teile erneut, anstatt die gesamte UI neu zu laden.

## Codebeispiel

### Beispiel ohne Optimierung

Schauen wir uns ein einfaches Beispiel an:

```tsx
import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  console.log("App gerendert");

  return (
    <div>
      <h1>Meine React App</h1>
      <button onClick={() => setCount(count + 1)}>Klick mich: {count}</button>
      <ChildComponent />
    </div>
  );
}

function ChildComponent() {
  console.log("ChildComponent gerendert");
  return <p>Ich bin eine Kindkomponente.</p>;
}

export default App;
```

**Was passiert hier?**

- **App-Komponente**: Hat einen Knopf, der bei jedem Klick einen Zähler erhöht.
- **ChildComponent**: Eine einfache Kindkomponente.

**Console-Ausgabe bei jedem Klick:**

```
App gerendert
ChildComponent gerendert
```

Wenn Sie also den Knopf klicken, wird **beide** Komponenten neu gerendert, auch wenn sich nur der Zähler `count` ändert.

### Optimierung des Renderings

Manchmal möchten wir verhindern, dass bestimmte Komponenten unnötig neu gerendert werden, um die Leistung zu verbessern. Eine Möglichkeit dafür ist die Verwendung von `React.memo`.

**Was ist `React.memo`?**

`React.memo` ist eine höhere Ordnungskomponente (HOC), die eine Komponente nur dann neu rendert, wenn sich ihre **Props** (Eigenschaften) ändern. Das kann die Leistung verbessern, indem es unnötige Renderings vermeidet.

### Optimiertes Beispiel

Lassen Sie uns das vorherige Beispiel optimieren:

```tsx
import React, { useState } from "react";

// Verwenden von React.memo, um die Neurenderung der ChildComponent zu verhindern, wenn sich ihre Props nicht ändern.
const ChildComponent = React.memo(function ChildComponent() {
  console.log("ChildComponent gerendert");
  return <p>Ich bin eine Kindkomponente.</p>;
});

function App() {
  const [count, setCount] = useState(0);

  console.log("App gerendert");

  return (
    <div>
      <h1>Meine React App</h1>
      <button onClick={() => setCount(count + 1)}>Klick mich: {count}</button>
      <ChildComponent />
    </div>
  );
}

export default App;
```

**Was hat sich geändert?**

- Wir haben `ChildComponent` mit `React.memo` umgeben.

**Console-Ausgabe bei jedem Klick:**

`App gerendert`

**ChildComponent wird **nicht** neu gerendert**, weil sich ihre Props nicht geändert haben. Dadurch wird die Leistung verbessert, besonders wenn `ChildComponent`komplex ist.

## Hands-on Aufgaben: Optimierung der Komponenten-Renderings mit `React.memo` in einem Tic-Tac-Toe Spiel

### Ziel der Aufgabe

In dieser Übung lernst du, wie du die Leistung deiner React-Anwendung verbessern kannst, indem du unnötige Neurenderings von Komponenten vermeidest. Dabei wirst du das Higher-Order-Component `React.memo` einsetzen. Zusätzlich wirst du mit **Test-Driven Development (TDD)** und **Vitest** sicherstellen, dass deine Optimierungen korrekt funktionieren.

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

#### Der Testcode für die `Cell`-Komponente:

```tsx
// src/components/Cell/Cell.test.tsx
import { render, fireEvent } from "@testing-library/react";
import Cell from "./Cell";
import { vi } from "vitest";

describe("Cell Komponente", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("rendert korrekt mit gegebenem Wert", () => {
    const { getByText } = render(<Cell value="X" onClick={() => {}} />);
    expect(getByText("X")).toBeInTheDocument();
  });

  it("ruft onClick-Funktion auf, wenn geklickt wird", () => {
    const handleClick = vi.fn();
    const { getByRole } = render(<Cell value="O" onClick={handleClick} />);
    fireEvent.click(getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("rendert nicht neu, wenn sich die Props nicht ändern", () => {
    const consoleSpy = vi.spyOn(console, "log");
    const { rerender } = render(<Cell value="X" onClick={() => {}} />);
    expect(consoleSpy).toHaveBeenCalledWith("Rendering Cell: X");
    consoleSpy.mockClear();

    // Erneutes Rendern mit gleichen Props
    rerender(<Cell value="X" onClick={() => {}} />);
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it("rendert neu, wenn sich die Props ändern", () => {
    const consoleSpy = vi.spyOn(console, "log");
    const { rerender } = render(<Cell value="X" onClick={() => {}} />);
    expect(consoleSpy).toHaveBeenCalledWith("Rendering Cell: X");
    consoleSpy.mockClear();

    // Erneutes Rendern mit geänderten Props
    rerender(<Cell value="O" onClick={() => {}} />);
    expect(consoleSpy).toHaveBeenCalledWith("Rendering Cell: O");
  });
});
```

#### Der Testcode für die `GameStatus`-Komponente:

```tsx
// src/components/GameStatus/GameStatus.test.tsx
import { render } from "@testing-library/react";
import GameStatus from "./GameStatus";
import { vi } from "vitest";

describe("GameStatus Komponente", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("zeigt den aktuellen Spieler an, wenn kein Gewinner", () => {
    const { getByText } = render(<GameStatus currentPlayer="X" winner="" />);
    expect(getByText("Spieler X ist am Zug")).toBeInTheDocument();
  });

  it("zeigt die Gewinnernachricht an, wenn es einen Gewinner gibt", () => {
    const { getByText } = render(<GameStatus currentPlayer="X" winner="O" />);
    expect(getByText("🎉 Spieler O hat gewonnen!")).toBeInTheDocument();
  });

  it("zeigt eine Unentschieden-Nachricht an, wenn das Spiel unentschieden endet", () => {
    const { getByText } = render(
      <GameStatus currentPlayer="X" winner="draw" />
    );
    expect(getByText("Das Spiel endet unentschieden!")).toBeInTheDocument();
  });

  it("rendert nicht neu, wenn sich die Props nicht ändern", () => {
    const consoleSpy = vi.spyOn(console, "log");
    const { rerender } = render(<GameStatus currentPlayer="X" winner="" />);
    expect(consoleSpy).toHaveBeenCalledWith("Rendering GameStatus");
    consoleSpy.mockClear();

    // Erneutes Rendern mit gleichen Props
    rerender(<GameStatus currentPlayer="X" winner="" />);
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it("rendert neu, wenn sich die Props ändern", () => {
    const consoleSpy = vi.spyOn(console, "log");
    const { rerender } = render(<GameStatus currentPlayer="X" winner="" />);
    expect(consoleSpy).toHaveBeenCalledWith("Rendering GameStatus");
    consoleSpy.mockClear();

    // Erneutes Rendern mit geänderten Props
    rerender(<GameStatus currentPlayer="O" winner="" />);
    expect(consoleSpy).toHaveBeenCalledWith("Rendering GameStatus");
  });
});
```

**Was macht dieser Test?**

- **Verifiziert die korrekte Darstellung der Komponenten:** Die Tests prüfen, ob die `Cell`- und `GameStatus`-Komponenten mit den gegebenen Props korrekt gerendert werden und die richtigen Informationen anzeigen.
- **Überprüft die Funktionalität der Komponenten:** Sie testen, ob die `onClick`-Funktion in `Cell` aufgerufen wird und ob `GameStatus` die richtigen Nachrichten basierend auf dem Spielstatus anzeigt.
- **Testet das Verhalten von `React.memo`:** Die Tests stellen sicher, dass die Komponenten nicht neu rendern, wenn sich die Props nicht ändern, und dass sie neu rendern, wenn sich die Props ändern.

---

### Schritt 2: Den Test ausführen

Falls der "Watch"-Modus nicht bereits läuft, gib den folgenden Befehl im Terminal ein:

```bash
npm run test:watch
```

**Erwarte folgendes Ergebnis:**

- Die Tests sollten **fehlschlagen**. ❌
- Das ist beabsichtigt, da wir die Optimierungen mit `React.memo` noch nicht implementiert haben.

---

### Schritt 3: Den Code anpassen, um den Test zu bestehen

Jetzt schreiben wir den notwendigen Code, damit die Tests erfolgreich sind.

**So geht's:**

1. **Komponente optimieren mit React.memo:**
   - Verwende `React.memo` für sowohl die `Cell`- als auch die `GameStatus`-Komponente, um unnötige Re-Renders zu vermeiden.
2. **Render-Log hinzufügen:**
   - Füge `console.log`-Anweisungen hinzu, um zu beobachten, wann die Komponente gerendert wird. Dies hilft bei der Analyse der Render-Performance.
3. **Props korrekt verwenden:**
   - Stelle sicher, dass die Props (`value` und `onClick`) korrekt in der Komponente verwendet werden, damit die Tests, die diese Aspekte überprüfen, erfolgreich sind.

---

**Inspiration gefällig?**

```tsx
// src/components/Cell/Cell.tsx

import React from "react";

type CellProps = {
  value: string;
  onClick: () => void;
};

// TODO: Nutze React.memo, um die Komponente zu optimieren
const Cell = ({ value, onClick }: CellProps) => {
  // TODO: Füge einen Console-Log entsprechend der Tests hinzu, um Renderings zu beobachten

  return (
    <div className="cell" role="button" onClick={onClick}>
      {value}
    </div>
  );
};

export default Cell;
```

```tsx
// src/components/GameStatus/GameStatus.tsx

import React from "react";

type GameStatusProps = {
  currentPlayer: string;
  winner: string;
};

// TODO: Nutze React.memo, um die Komponente zu optimieren
const GameStatus = ({ currentPlayer, winner }: GameStatusProps) => {
  // TODO: Füge einen Console-Log hinzu, um Renderings zu beobachten
  console.log("Rendering GameStatus");

  return (
    <div>
      {winner === "draw" ? (
        <h3>Das Spiel endet unentschieden!</h3>
      ) : winner ? (
        <h3>🎉 Spieler {winner} hat gewonnen!</h3>
      ) : (
        <h3>Spieler {currentPlayer} ist am Zug</h3>
      )}
    </div>
  );
};

export default GameStatus;
```

---

### Schritt 4: Den Test erneut ausführen

Da der Test im "Watch"-Modus läuft, wird er automatisch erneut ausgeführt, sobald du die Dateien gespeichert hast.

**Erwarte folgendes Ergebnis:**

- Die Tests sollten jetzt **erfolgreich** sein. ✅
- Dies bedeutet, dass dein Code die erwartete Funktionalität erfüllt und `React.memo` korrekt angewendet wurde.

---

### Schritt 5: Die Anwendung im Browser betrachten

**So gehst du vor:**

1. **Starte die Entwicklungsumgebung:**

   - Falls der Entwicklungsserver nicht bereits läuft, gib folgenden Befehl im Terminal ein:

     ```bash
     npm run dev
     ```

   - Dies startet deinen Entwicklungsserver und zeigt die lokale Adresse an (z. B. `http://localhost:3000`).

2. **Öffne deinen Browser:**

   - Gib die angezeigte lokale Adresse in die Adressleiste deines Browsers ein.

3. **Überprüfe die Anzeige:**

   - Öffne die Entwicklerkonsole deines Browsers.
   - Interagiere mit dem Tic-Tac-Toe-Spiel, indem du auf die Zellen klickst.
   - Beobachte die `console.log`-Ausgaben:
     - **`Cell`-Komponente:**
       - Du solltest feststellen, dass Zellen nur neu gerendert werden, wenn sich ihr Wert ändert.
     - **`GameStatus`-Komponente:**
       - Die `GameStatus`-Komponente rendert nur neu, wenn sich die Props `currentPlayer` oder `winner` ändern.
   - Dies bestätigt, dass `React.memo` effektiv unnötige Neurenderings verhindert.

---

### Zusammenfassung

In diesem Kapitel haben wir gelernt, wie man die Leistung einer React-Anwendung mithilfe von `React.memo` optimiert. Wir haben Tests geschrieben, die sicherstellen, dass die Komponenten `Cell` und `GameStatus` nur dann neu gerendert werden, wenn sich ihre Props ändern. Durch die Anwendung von `React.memo` haben wir unnötige Neurenderings vermieden und die Effizienz unserer Anwendung verbessert. Mit dem Ansatz des Test-Driven Development (TDD) und der Verwendung von Vitest konnten wir sicherstellen, dass unsere Änderungen korrekt funktionieren.

**Glückwunsch!** Du hast erfolgreich gelernt, wie man `React.memo` einsetzt, um die Performance einer React-Anwendung zu verbessern, und dabei mit Tests die Funktionalität sichergestellt.
