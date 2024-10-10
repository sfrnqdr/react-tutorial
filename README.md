# Schritt 5: Styling von Komponenten

## Leitfrage

Wie können wir unsere React-Komponenten stilvoll gestalten und CSS verwenden, um unser Tic-Tac-Toe-Spiel ansprechender zu machen?

## Antwort

In React können wir **CSS** verwenden, um unsere Komponenten zu stylen und das Aussehen unserer Anwendung zu verbessern. Das bedeutet, wir können Farben, Schriftarten, Abstände und vieles mehr hinzufügen, um unsere App ansprechender zu gestalten.

Es gibt verschiedene Möglichkeiten, **CSS in React** zu nutzen:

1. **Externe Stylesheets**
2. **Inline-Styles**
3. **CSS-Module**

Wir werden uns darauf konzentrieren, **wie wir externe Stylesheets nutzen können**, um unsere Komponenten schön und attraktiv zu gestalten. Lass uns unserem Spiel etwas Farbe und Stil hinzufügen! 🎨

## Warum sollten wir unsere App stylen?

Ein gut gestaltetes Spiel macht einfach mehr Spaß! 🕹️ Durch das Hinzufügen von Farben, Layouts und anderen Stilelementen können wir:

- Die Benutzererfahrung verbessern
- Das Spiel übersichtlicher und ansprechender gestalten
- Unsere Kreativität ausdrücken

## Wie verwenden wir CSS in React?

### 1. Externe Stylesheets

Wir erstellen eine separate CSS-Datei und verlinken sie in unseren Komponenten. Das ist eine übliche Methode, die auch bei normalen HTML-Seiten verwendet wird.

### 2. Inline-Styles

Wir fügen die CSS-Stile direkt in unsere Elemente ein. Das kann nützlich sein für einfache oder dynamische Stile, wird aber bei komplexeren Stilen schnell unübersichtlich.

### 3. CSS-Module

Eine fortgeschrittenere Methode, bei der CSS-Dateien wie Module behandelt werden. Das hilft, Namenskonflikte zu vermeiden, ist aber für den Anfang etwas komplexer.

## Codebeispiel

### Schritt 1: Erstelle die CSS-Datei

- **Datei erstellen:**
  - Navigiere in deinem Projektordner zu `src/components/App`.
  - Erstelle eine neue Datei und nenne sie `App.css`.

### Schritt 2: Füge CSS-Stile hinzu

- **Öffne `App.css`:**

```css
/* App.css */
/* Körper der Seite stylen */
body {
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
  text-align: center;
}

/* Überschrift stylen */
h1 {
  color: #333333;
  margin-top: 50px;
}
```

### Schritt 3: Importiere die CSS-Datei

- **Öffne `App.tsx` :**

```tsx
// src/components/App/App.tsx

import "./App.css";

const App => () {
  return (
    <div>
      <h1>Willkommen zum Tic-Tac-Toe-Spiel! 🎉</h1>
      <Spielbrett />
    </div>
  );
}

export default App;
```

## Hands-on Aufgaben: Spielfeld erstellen

### Ziel der Aufgabe

Das Ziel dieser Aufgabe ist es, das Spielfeld für das Tic Tac Toe Spiel visuell ansprechend zu gestalten. Durch das Erstellen und Anpassen von CSS-Dateien sowie das Integrieren dieser in die React-Komponenten lernst du grundlegende Styling-Techniken und die Anwendung von CSS in einer React-Anwendung.

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

   bash

   `1git clean -fd`

   - **Vorsicht:** Dieser Befehl entfernt unwiderruflich alle nicht verfolgten Dateien und Verzeichnisse. Stelle sicher, dass keine wichtigen Dateien verloren gehen.

---

### Schritt 1: Den Test verstehen

**Was macht dieser Test?**

In diesem Schritt werden wir die vorhandenen Tests für das Spielfeld analysieren. Die Tests überprüfen, ob die CSS-Klassen korrekt angewendet werden, um sicherzustellen, dass das Spielfeld und die Zellen die gewünschten Stile erhalten.

Beispielhafte Tests in `GameBoard.test.tsx`:

```tsx
// src/components/Gameboard/GameBoard.test.tsx

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

Diese Tests stellen sicher, dass das Spielfeld die Klasse `board` und jede Zelle die Klasse `cell` besitzt. Dadurch können wir später spezifische CSS-Stile anwenden.

---

### Schritt 2: Den Test ausführen

Falls der "Watch"-Modus nicht bereits läuft, gebe den Befehl `npm run test:watch` im Terminal ein.

**Erwarte folgendes Ergebnis:**

- Der Test sollte **fehlschlagen**. ❌
  - Dies ist beabsichtigt, da die CSS-Klassen noch nicht implementiert wurden und somit die Tests nicht bestehen können.

---

### Schritt 3: Den Code anpassen, um den Test zu bestehen

Jetzt schreiben wir den notwendigen Code, damit die Tests erfolgreich sind und das Spielfeld entsprechend gestylt wird.

**So geht's:**

1. **Erstellen der CSS-Datei `GameBoard.css`:**

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

2. **Importieren des CSS in `GameBoard.tsx`:**

```tsx
// src/GameBoard/GameBoard.tsx

import Cell from "./Cell";
import "./GameBoard.css";

const GameBoard = () => {
  const initialCells = Array(9).fill("");

  return (
    <div>
      <h2>Tic Tac Toe</h2>
      {/* TODO: Hier CSS Klassen implementieren*/}
      <div>
        {initialCells.map((cell, index) => (
          <Cell key={index} value={cell} />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
```

---

### Schritt 4: Den Test erneut ausführen

Da der Test im "Watch"-Modus läuft, wird er automatisch erneut ausgeführt, sobald du die Dateien gespeichert hast.

**Erwarte folgendes Ergebnis:**

- Die Tests sollten jetzt **erfolgreich** sein. ✅
  - Dies bedeutet, dass dein Code die erwartete Funktionalität erfüllt und die CSS-Klassen korrekt angewendet wurden.

---

### Schritt 5: Die Anwendung im Browser betrachten

**So gehst du vor:**

1. **Starte die Entwicklungsumgebung:**

   - Falls der Entwicklungsserver nicht bereits läuft, gebe folgenden Befehl im Terminal ein:
     bash
     `1npm run dev`
   - Dies startet deinen Entwicklungsserver.

2. **Öffne deinen Browser:**

   - Im Terminal wird eine lokale Adresse angezeigt, typischerweise `http://localhost:3000`.
   - Öffne diese Adresse in deinem Browser.

3. **Überprüfe die Anzeige:**

   - Du solltest nun das gestylte Tic Tac Toe Spielfeld sehen, das aus einem 3x3 Raster von Zellen besteht.
   - Jede Zelle sollte die definierten Stile aufweisen, inklusive Hover-Effekt.

---

### Zusammenfassung

In diesem Kapitel haben wir gelernt, wie man ein Tic Tac Toe Spielfeld mit CSS stilisiert und diese Stile in einer React-Anwendung implementiert. Wir haben eine CSS-Datei erstellt, sie in die entsprechenden Komponenten importiert und Tests angepasst, um sicherzustellen, dass die Stile korrekt angewendet werden. Durch das Ausführen und Überprüfen der Tests sowie das Betrachtend der Anwendung im Browser konnten wir die erfolgreiche Implementierung der Styling-Funktionalität verifizieren.

Mit diesen Grundlagen bist du nun in der Lage, weitere Styling-Anpassungen vorzunehmen und dein Tic Tac Toe Spiel optisch weiter zu verbessern.

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
