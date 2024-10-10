## Leitfrage

Was sind funktionale Komponenten in React, und wie erstellen wir diese?

## Antwort

Im letzten Schritt haben wir unsere Anwendung gestartet und eine einfache Begrüßungsnachricht angezeigt. Dabei haben wir bereits eine **Komponente** verwendet – die `App`-Komponente. Aber was genau ist eine Komponente und wie arbeiten wir mit ihr?

Stell dir eine Webseite wie ein großes Haus vor. Um ein Haus zu bauen, verwenden wir verschiedene Bauteile wie Türen, Fenster und Wände. Ähnlich dazu bauen wir in React unsere Benutzeroberfläche aus kleineren Bausteinen, die wir **Komponenten**nennen.

Eine **funktionale Komponente** ist einer dieser Bausteine. Sie ist einfach eine JavaScript-Funktion, die beschreibt, was auf dem Bildschirm angezeigt werden soll. Obwohl sie "funktional" heißt, musst du dich nicht von dem Begriff einschüchtern lassen! Es bedeutet nur, dass wir eine Funktion verwenden, um eine Komponente zu erstellen.

## Codebeispiel

```jsx
const Welcome = () => {
  return (
    <div>
      <h1>Willkommen zum Tic-Tac-Toe-Spiel! 🎉</h1>
    </div>
  );
};
```

- **Funktion:** `Welcome` ist eine Funktion. Sie hat keine Eingaben (Parameter) und gibt etwas zurück.
- **Rückgabe:** Was sie zurückgibt, ist das, was auf dem Bildschirm angezeigt wird.
- **Sieht aus wie HTML:** Der Code innerhalb des `return`-Statements sieht aus wie HTML. Das nennt man **JSX**, aber darauf gehen wir später genauer ein.

### Warum nutzen wir funktionale Komponenten?

- **Einfachheit:** Sie sind leicht zu schreiben und zu verstehen.
- **Wiederverwendbarkeit:** Wir können sie an verschiedenen Stellen unserer Anwendung wiederverwenden.
- **Strukturierung:** Sie helfen uns, den Code zu organisieren, indem wir die Benutzeroberfläche in kleinere, überschaubare Teile aufteilen.

---

## Ein kurzer Blick auf Klassenkomponenten

Bevor funktionale Komponenten so beliebt wurden, haben Entwickler oft **Klassenkomponenten** verwendet. Das sind Komponenten, die als JavaScript-Klassen definiert sind. Sie sehen etwas anders aus und haben zusätzliche Funktionen.

**Beispiel einer Klassenkomponente:**

```jsx
class Welcome extends React.Component {
  render() {
    return (
      <div>
        <h1>Willkommen zum Tic-Tac-Toe-Spiel! 🎉</h1>
      </div>
    );
  }
}
```

- **Klasse:** `Welcome` wird als Klasse definiert, die von `React.Component` erbt.
- **`render`-Methode:** Klassenkomponenten haben immer eine `render`-Methode, die beschreibt, was angezeigt werden soll.

**Wichtig zu wissen:**

- **Komplexer:** Klassenkomponenten sind etwas komplizierter zu schreiben und zu verstehen.
- **Aktueller Stand:** In modernen React-Anwendungen werden funktionale Komponenten bevorzugt, weil sie einfacher sind und leistungsfähiger sein können.
- **Wir fokussieren uns auf funktionale Komponenten:** Für unseren Workshop konzentrieren wir uns auf funktionale Komponenten, da sie für Anfänger zugänglicher sind.
- ***

## Hands-on Aufgaben

### **Aufgabe 1: Begrüßungsnachricht als eigene funktionale Komponente erstellen**

#### **Schritt 1: Verstehe den bereitgestellten Test**

```tsx
// src/Components/Welcome/Welcome.test.tsx
import { render, screen } from "@testing-library/react";
import Welcome from "./Welcome";

test("zeigt die Begrüßungsnachricht an", () => {
  render(<Welcome />);
  const greetingElement = screen.getByText(
    /Willkommen zum Tic-Tac-Toe-Spiel!/i
  );
  expect(greetingElement).toBeInTheDocument();
});
```

3. **Erklärung**
   - **Importe:**
     - `render` und `screen` stammen aus der Testing Library und helfen dabei, die Komponente zu rendern und Elemente im DOM zu finden.
     - `Welcome` ist die Komponente, die getestet wird.
   - **Testbeschreibung:**
     - Der Test prüft, ob die Begrüßungsnachricht "Willkommen zum Tic-Tac-Toe-Spiel!" in der `Welcome`-Komponente angezeigt wird.
   - **Erwartung:**
     - Es wird erwartet, dass das gefundene Element (`greetingElement`) im Dokument vorhanden ist.

#### **Schritt 2: Test ausführen und initiales Ergebnis beobachten**

1. **Terminal öffnen:**

   - Öffne das Terminal (z.B. über VS Code oder dein bevorzugtes Terminal-Programm) in deinem Projektordner.

2. **Testbefehl ausführen:**

   - Gib folgenden Befehl ein und drücke Enter:

     ```bash
     npm run test:watch
     ```

   - **Hinweis:** Dieser Befehl startet die Tests im Überwachungsmodus, sodass sie bei jeder Änderung automatisch erneut ausgeführt werden.

3. **Erwartetes Ergebnis:**

   - Da die `Welcome`-Komponente noch nicht erstellt wurde, sollte der Test **fehlschlagen**.
   - **Begründung:**
     - Der Test sucht nach der Begrüßungsnachricht, die momentan nicht vorhanden ist.

#### **Schritt 3: `Welcome`-Komponente erstellen**

- Passe die Datei `Welcome.tsx` im `src`-Ordner deines Projekts so an, dass der Test nicht mehr fehlschlägt.

#### **Schritt 4: Test erneut überprüfen**

2. **Erwartetes Ergebnis:**
   - Der Test sollte jetzt **erfolgreich** sein, da die Begrüßungsnachricht vorhanden ist.

#### **Schritt 5: `Welcome`-Komponente in der Anwendung anzeigen**

1. **App.tsx bearbeiten:**
   - Öffne die Datei `App.tsx` in deinem Projektordner.
2. Binde die **`Welcome`-Komponente ** ein

3. **Entwicklungsserver starten:**
   - Im Terminal, starte den Entwicklungsserver mit:
     `npm run dev`
4. **Browser öffnen:**

   - Öffne deinen bevorzugten Webbrowser und navigiere zur angezeigten lokalen Adresse

5. **Ergebnis überprüfen:**

   - Du solltest die Begrüßungsnachricht **"Willkommen zum Tic-Tac-Toe-Spiel! 🎉"** auf der Seite sehen.

---

### **Aufgabe 2: Einführung in das Spiel (GameIntroduction) erstellen**

#### **Ziel:**

Erstelle eine neue Komponente namens `GameIntroduction`, die eine Einführung in das Tic-Tac-Toe-Spiel enthält. Du wirst die Komponente implementieren, damit die bereitgestellten Tests erfolgreich sind.

#### **Schritt 1: Verstehe die bereitgestellten Tests**

```tsx
// src/GameIntroduction/GameIntroduction.test.tsx
import { render, screen } from "@testing-library/react";
import GameIntroduction from "./GameIntroduction";

test("zeigt die Einführung zum Spiel an", () => {
  render(<GameIntroduction />);
  const headingElement = screen.getByText(/Einführung in Tic-Tac-Toe/i);
  expect(headingElement).toBeInTheDocument();
});

test("zeigt die Beschreibung des Spiels an", () => {
  render(<GameIntroduction />);
  const descriptionElement = screen.getByText(
    /Tic-Tac-Toe ist ein einfaches Strategiespiel für zwei Spieler/i
  );
  expect(descriptionElement).toBeInTheDocument();
});
```

**Erklärung:**

- **Erster Test:** Prüft, ob die Überschrift "Einführung in Tic-Tac-Toe" vorhanden ist.
- **Zweiter Test:** Prüft, ob die Beschreibung des Spiels im Absatz (`<p>`) vorhanden ist.

#### **Schritt 2: Test ausführen und initiales Ergebnis beobachten**

1. **Terminal öffnen:**

   - Stelle sicher, dass der Testmodus noch läuft (`npm run test:watch`). Falls nicht, starte ihn erneut.

2. **Erwartetes Ergebnis:**

   - Da die `GameIntroduction`-Komponente noch nicht erstellt wurde, sollte der Test **fehlschlagen**.

#### **Schritt 3: `GameIntroduction`-Komponente erstellen oder anpassen**

- Passe die Datei `GameIntroduction.tsx` im `src`-Ordner deines Projekts so an, dass der Test nicht mehr fehlschlägt.

#### **Schritt 4: Test erneut überprüfen**

2. **Erwartetes Ergebnis:**
   - Der Test sollte jetzt **erfolgreich** sein, da die Begrüßungsnachricht vorhanden ist.

#### **Schritt 5: `GameIntroduction`-Komponente in der Anwendung anzeigen**

1. **App.tsx bearbeiten:**

   - Öffne die Datei `App.tsx` in deinem Projektordner.

2. **`GameIntroduction`-Komponente einbinden:**

   - Importiere die `GameIntroduction`-Komponente und füge sie in die App ein:

3. **Entwicklungsserver überprüfen:**

   - Falls der Entwicklungsserver bereits läuft (`npm run dev`), sollte er automatisch die neuesten Änderungen anzeigen.
   - Andernfalls starte ihn erneut:
     `npm run dev`

4. **Browser öffnen:**

   - Öffne deinen bevorzugten Webbrowser und navigiere zur angezeigten lokalen Adresse .

5. **Ergebnis überprüfen:**

   - Du solltest sowohl die Begrüßungsnachricht **"Willkommen zum Tic-Tac-Toe-Spiel! 🎉"** als auch die Einführung **"Einführung in Tic-Tac-Toe"** und die Beschreibung des Spiels auf der Seite sehen.

## Zusammenfassung

- **Funktionale Komponenten** sind einfache Funktionen, die beschreiben, was auf dem Bildschirm angezeigt wird.
- Sie helfen uns, unseren Code zu strukturieren und sauber zu halten.
- **Klassenkomponenten** sind eine ältere Art, Komponenten zu schreiben, werden aber heute weniger verwendet.
