## Leitfrage

Wie können wir Daten innerhalb unserer React-Komponenten verwalten und was ist der Unterschied zwischen Props und States?

## Antwort

In React bauen wir unsere Benutzeroberfläche aus Komponenten auf. Diese Komponenten sollen nicht nur statische Inhalte anzeigen, sondern auch auf Änderungen reagieren können. Um unsere Anwendung interaktiv zu machen, müssen wir Daten zwischen Komponenten austauschen und innerhalb von Komponenten verwalten können. In React gibt es zwei Hauptwege, um Daten zu handhaben:

1. **Props (Properties)**
2. **State**

Diese beiden Konzepte helfen uns dabei, Informationen innerhalb unserer Anwendung zu organisieren und zu steuern, wie sich unsere Benutzeroberfläche basierend auf diesen Daten verhält.

### Props (Properties)

**Props** sind wie die **Eingabeparameter** einer Funktion. Sie ermöglichen es uns, Daten von einer **übergeordneten Komponente** (Elternkomponente) an eine **untergeordnete Komponente** (Kindkomponente) weiterzugeben. Wichtig dabei ist:

- **Von außen übergeben:** Props werden an eine Komponente übergeben, genau wie Argumente an eine Funktion.
- **Unveränderlich:** Innerhalb der Komponente können Props nicht geändert werden. Sie sind **read-only**.
- **Kommunikation zwischen Komponenten:** Mit Props können wir Daten von einer Elternkomponente an eine Kindkomponente weitergeben.

## Codebeispiel (Props)

Stell dir vor, wir haben eine Komponente `Begruessung`, die einen Namen anzeigt.

```jsx
const Begruessung = (props) => {
  return <h1>Hallo, {props.name}!</h1>;
};
```

- **`props`:** Ein Objekt, das alle übergebenen Eigenschaften enthält.
- **`props.name`:** Wir greifen auf die Eigenschaft `name` zu, die an die Komponente übergeben wurde.

**Verwendung der Komponente mit Props:**

```jsx
<Begruessung name="Max" />
```

- **Was passiert hier?**
  - Wir verwenden die Komponente `Begruessung` und geben ihr ein Prop `name`mit dem Wert `"Max"`.
  - Innerhalb der Komponente wird `props.name` zu `"Max"`, und die Ausgabe ist `<h1>Hallo, Max!</h1>`.

### State

**State** hingegen ist wie der **interne Speicher** einer Komponente. Er ermöglicht es einer Komponente, **eigene Daten** zu verwalten und zu verändern. Diese Daten sind **veränderlich** und können sich im Laufe der Zeit basierend auf Benutzerinteraktionen oder anderen Ereignissen ändern.

### Eigenschaften von State:

- **Intern verwaltet:** State wird innerhalb der Komponente definiert und verändert.
- **Veränderlich:** Wir können den State aktualisieren, um auf Benutzerinteraktionen oder andere Ereignisse zu reagieren.
- **Beeinflusst die Darstellung:** Wenn sich der State ändert, wird die Komponente neu gerendert, um den aktuellen Zustand widerzuspiegeln.

## Codebeispiel (State)

Stellen wir uns vor, wir haben einen Zähler, der bei jedem Klick erhöht wird.

```tsx
import React, { useState } from "react";

const Zaehler = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Du hast {count} mal geklickt.</p>
      <button onClick={() => setCount(count + 1)}>Klick mich</button>
    </div>
  );
};
```

- **`useState(0)`:** Ein React-Hook, der uns ein State-Variable `count` und eine Funktion `setCount` zur Aktualisierung gibt. Wir starten mit dem Wert `0`.
- **`count`:** Der aktuelle Wert des Zählers.
- **`setCount`:** Eine Funktion, um den Wert von `count` zu ändern.
- **`onClick`:** Ein Event-Handler, der `setCount` aufruft, um den Zähler zu erhöhen.

**Was passiert hier?**

- Beim ersten Rendern ist `count` `0`.
- Jedes Mal, wenn der Button geklickt wird, erhöht sich `count` um `1`.
- Die Komponente aktualisiert sich automatisch und zeigt den neuen Wert von `count` an.

## Der Unterschied zwischen Props und State

### Props:

- **Eingabe von außen:** Werden von der Elternkomponente übergeben.
- **Unveränderlich innerhalb der Komponente.**
- **Beispiel:** Der Name in einer Begrüßungskomponente.

### State:

- **Interner Zustand einer Komponente.**
- **Kann innerhalb der Komponente verändert werden.**
- **Verwendung von `useState`:** Ermöglicht es uns, State in funktionalen Komponenten zu verwenden.
- **Beispiel:** Der Zählerstand in einer Zählerkomponente.

---

## Eine Analogie zur Veranschaulichung

Stell dir vor, du baust ein Auto.

- **Props sind wie die Farbe des Fahrzeugs.**

  - **Von außen hinzugefügt:** Das Auto wurde ab Werk in einer bestimmten Farbe ausgeliefert.
  - **Unveränderlich im Auto:** Die Farbe des Autos lässt sich nachträglich nicht ändern.

- **State ist wie der aktuelle Gang des Autos.**
  - **Intern verwaltet:** Du schaltest die Gänge, um schneller oder langsamer zu fahren.
  - **Veränderlich:** Du kannst jederzeit den Gang wechseln.
  - **Beeinflusst die Fahrt:** Der gewählte Gang beeinflusst, wie sich das Auto bewegt.

## Hands-on Aufgaben: Props vs State

### Ziel der Aufgabe

Das Ziel dieser Aufgabe ist es, eine interaktive `GameBoard`-Komponente für ein Tic-Tac-Toe-Spiel zu erstellen. Dabei entwickeln wir zunächst eine einzelne `Cell`-Komponente, die in das `GameBoard` integriert wird. Der gesamte Prozess erfolgt testgetrieben, indem wir zunächst Tests schreiben, die die Funktionalität der Zellen überprüfen, und anschließend den Code so anpassen, dass die Tests bestehen. Zusätzlich verbessern wir die visuelle Darstellung des Spielfelds durch CSS-Anpassungen.

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

```bashgit
clean -fd
```

- **Vorsicht:** Dieser Befehl entfernt unwiderruflich alle nicht verfolgten Dateien und Verzeichnisse. Stelle sicher, dass keine wichtigen Dateien verloren gehen.

---

### Schritt 1: Den Test verstehen

Zunächst erstellen wir einen Test für die `Cell`-Komponente, um sicherzustellen, dass jede Zelle im Spielfeld korrekt funktioniert.

```tsx
// src/components/Cell/Cell.test.tsx
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

**Was macht dieser Test?**

Dieser Test überprüft die Funktionalität der `Cell`-Komponente in einem Tic-Tac-Toe-Spiel:

1. **Initialen Wert anzeigen:** Stellt sicher, dass eine leere Zelle initial keinen Wert anzeigt.
2. **Wertänderung bei Klick:** Prüft, ob beim Klicken auf eine leere Zelle der Wert auf "X" gesetzt wird.
3. **Keine Änderung bei gesetztem Wert:** Verifiziert, dass eine Zelle, die bereits einen Wert hat (z.B. "O"), durch weitere Klicks nicht verändert wird.

---

### Schritt 2: Den Test ausführen

Falls der "Watch"-Modus nicht bereits läuft, gebe den Befehl `npm run test:watch` im Terminal ein.

**Erwarte folgendes Ergebnis:**

- Der Test sollte **fehlschlagen**. ❌
- Dies ist beabsichtigt, da die `Cell`-Komponente noch nicht implementiert ist und der Test die noch fehlende Funktionalität erkennt.

---

### Schritt 3: Den Code anpassen, um den Test zu bestehen

Jetzt schreiben wir den notwendigen Code, damit der Test erfolgreich ist.

**So geht's:**

1. **Erstellen der `Cell`-Komponente:**

```tsx
// src/components/Cell/Cell.tsx
import React, { useState } from "react";

type CellProps = {
  value: string;
};

function Cell({ value }: CellProps) {
  const [cellValue, setCellValue] = useState(value);

  const handleClick = () => {
    if (cellValue === "") {
      // TODO: Bei Klick auf eine leere Zelle soll sich der State von cellValue ändern
    }
  };

  return (
    <div className="cell" role="button" onClick={handleClick}>
      {/* TODO: Hier cell value ausgeben */}
    </div>
  );
}

export default Cell;
```

2. **Anpassen von `GameBoard.tsx`, um die `Cell`-Komponente einzubinden:**

```tsx
// src/components/GameBoard/GameBoard.tsx

import React from "react";
// Hier Cell-Komponente importieren
import "./GameBoard.css";

function GameBoard() {
  const initialCells = Array(9).fill("");

  return (
    <div>
      <h2>Tic Tac Toe</h2>
      <div className="board">
        {initialCells.map((cell, index) => (
         // Hier Cell-Komponente einbinden
        ))}
      </div>
    </div>
  );
}

export default GameBoard;
```

3. Erstellung der CSS-Datei für die `Cell`-Komponente für bessere Darstellung:\*\*

```css
/* src/components/Gameboard/GameBoard.css */

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

**Erklärung:**

- **Grid-Layout:** Das Spielfeld wird als 3x3-Grid dargestellt.
- **Zell-Styling:** Jede Zelle hat eine feste Größe, eine Hintergrundfarbe, zentrierten Text und einen Zeiger-Cursor, um die Interaktivität zu signalisieren.

---

### Schritt 4: Den Test erneut ausführen

Da der Test im "Watch"-Modus läuft, wird er automatisch erneut ausgeführt, sobald du die Datei gespeichert hast.

**Erwarte folgendes Ergebnis:**

- Der Test sollte jetzt **erfolgreich** sein. ✅
- Dies bedeutet, dass dein Code die erwartete Funktionalität erfüllt und die Zellen korrekt reagieren.

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

   - Im Terminal wird eine lokale Adresse angezeigt, z. B. `http://localhost:3000`.
   - Öffne diese Adresse in deinem Browser.

3. **Überprüfe die Anzeige:**

   - Du solltest die Begrüßungsnachricht aus der `Welcome`-Komponente sehen.
   - Darunter sollte das Tic-Tac-Toe-Spielfeld mit neun klickbaren Zellen angezeigt werden.
   - Klicke auf eine leere Zelle, um zu sehen, wie sich der Wert auf "X" ändert. Bereits gesetzte Zellen sollten unverändert bleiben.

---

### Zusammenfassung

In diesem Kapitel haben wir eine interaktive `GameBoard`-Komponente für ein Tic-Tac-Toe-Spiel erstellt. Wir begannen mit der Entwicklung einer einzelnen `Cell`-Komponente und integrierten diese in das `GameBoard`. Durch testgetriebenes Entwickeln (TDD) stellten wir sicher, dass jede Zelle wie erwartet funktioniert. Anschließend verbesserten wir die visuelle Darstellung des Spielfelds mittels CSS. Dieser strukturierte Ansatz gewährleistet, dass unsere Komponenten zuverlässig sind und den Anforderungen entsprechen.

---

## Ergebnis veröffentlichen

Zum Abschluss dieses Kapitels solltest du deine Änderungen im remote Repository sichern:

```bash
git add .
git commit -m "Schritt 3: Interaktive Zellen mit JSX erstellt"
git push
```

---

## Nächstes Kapitel

```bash
git checkout -b mustermann-max-step-1-welcome origin/step-4-props-vs-state
```
