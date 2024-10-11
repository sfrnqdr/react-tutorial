# Schritt 12: Routing

## Leitfrage

Wie nutzen wir in React Routing?

## Antwort

### Einführung in das Routing

**Routing** in React ermöglicht es, unterschiedliche Komponenten basierend auf der URL anzuzeigen. Das heißt, je nachdem, welche Adresse der Benutzer im Browser eingibt oder auf Links klickt, zeigt die Anwendung verschiedene Seiten oder Inhalte an, ohne die gesamte Seite neu zu laden. Dies sorgt für eine flüssige und schnelle Benutzererfahrung.

In React wird Routing häufig mit der Bibliothek **React Router** umgesetzt. React Router bietet Werkzeuge, um die Navigation innerhalb der Anwendung zu steuern und verschiedene Komponenten für unterschiedliche Pfade zu rendern.

**Schritte zur Implementierung von Routing in React:**

1. **Installation:** Zuerst musst du React Router in deinem Projekt installieren. Dies haben wir in diesem Tutorial bereits für dich erledigt.
2. **BrowserRouter einrichten:** Um das Routing zu ermöglichen, umschließt du deine Anwendung mit dem `BrowserRouter`.
3. **Routen definieren:** Mithilfe von `<Routes>` und `<Route>` definierst du, welche Komponenten für welche Pfade angezeigt werden sollen.
4. **Navigation ermöglichen:** Mit dem `<Link>`-Komponent kannst du Links erstellen, die den Benutzer zu verschiedenen Routen führen, ohne die Seite neu zu laden.

## Codebeispiel

```tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Komponenten für die Seiten
const Home = () => <h2>Startseite</h2>;
const About = () => <h2>Über uns</h2>;

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigationslinks */}
        <nav>
          <ul>
            <li>
              <Link to="/">Startseite</Link>
            </li>
            <li>
              <Link to="/about">Über uns</Link>
            </li>
          </ul>
        </nav>

        {/* Routen definieren */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
```

**Erklärung des Codes:**

1. **Installation:** Stelle sicher, dass du `react-router-dom` installiert hast, indem du `npm install react-router-dom` im Terminal ausführst.
2. **Importe:** Wir importieren die notwendigen Komponenten aus `react-router-dom`.
3. **Komponenten:** Es gibt zwei einfache Komponenten, `Home` und `About`, die jeweils eine Überschrift anzeigen.
4. **Router einrichten:** Die gesamte Anwendung ist mit `<Router>` umschlossen.
5. **Navigation:** Mit `<Link>` erstellen wir Links, die den Benutzer zu den definierten Routen führen.
6. **Routen definieren:** Innerhalb von `<Routes>` legen wir fest, welche Komponente bei welchem Pfad gerendert wird. Der Pfad `/` zeigt die `Home`-Komponente und `/about` zeigt die `About`-Komponente.

Mit dieser Einrichtung kannst du zwischen der Startseite und der Über-uns-Seite navigieren, ohne die Seite neu zu laden. Dies ist die Grundlage für die meisten React-Anwendungen, die eine mehrseitige Struktur haben.

---

## Hands-on Aufgaben: Routing

### Ziel der Aufgabe

In dieser Aufgabe erweitern wir unsere bestehende Tic Tac Toe Anwendung um eine **Routing-Funktionalität**. Wir integrieren `React Router`, um zwischen verschiedenen Seiten zu navigieren:

- **Startseite**: Eine Begrüßungsseite mit Infos zum Spiel.
- **Spielseite**: Hier findet das eigentliche Spiel statt.
- **Ergebnisseite**: Anzeige der bisherigen Spielergebnisse.

Durch diese Aufteilung verbessern wir die Benutzererfahrung und lernen gleichzeitig, wie Routing in React-Anwendungen implementiert wird.

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

Wir beginnen mit einem Test, der erwartet, dass unsere Anwendung verschiedene Routen korrekt rendert. Dieser Test ist bereits geschrieben und hilft uns, die Anforderungen zu verstehen.

#### Testdatei: `src/App.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import App from "./App";

test("rendert die Startseite bei '/'", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Willkommen bei Tic Tac Toe/i)).toBeInTheDocument();
});

test("rendert das Spielbrett bei '/game'", () => {
  render(
    <MemoryRouter initialEntries={["/game"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
});

test("rendert die Ergebnisseite bei '/results'", () => {
  render(
    <MemoryRouter initialEntries={["/results"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Frühere Spiele/i)).toBeInTheDocument();
});
```

**Was macht dieser Test?**

- **Test 1:** Überprüft, ob bei Aufruf der Route `/` die Startseite gerendert wird, die den Text "Willkommen bei Tic Tac Toe" enthält.
- **Test 2:** Überprüft, ob bei Aufruf der Route `/game` das Spielbrett gerendert wird, erkennbar am Text "Tic Tac Toe".
- **Test 3:** Überprüft, ob bei Aufruf der Route `/results` die Ergebnisseite angezeigt wird, die den Text "Frühere Spiele" enthält.

Dieser Test stellt sicher, dass unsere Routing-Konfiguration korrekt ist und die entsprechenden Komponenten für jede Route rendert.

---

### Schritt 2: Den Test ausführen

Falls der "Watch"-Modus nicht bereits läuft, gebe den Befehl `npm run test:watch` im Terminal ein.

**Erwarte folgendes Ergebnis:**

- Die Tests sollten **fehlschlagen**. ❌
- Das ist beabsichtigt, da die Routing-Funktionalität noch nicht implementiert ist.

---

### Schritt 3: Den Code anpassen, um den Test zu bestehen

Jetzt implementieren wir den notwendigen Code, damit die Tests erfolgreich sind.

**So geht's:**

1. 1. **Erstelle die Seitenkomponenten:**

   - **Beschreibung Schritt 1:** Erstelle eine `Home` Komponente mit einer Willkommensnachricht und Links zur Spiel- und Statistikseite.
   - **Beschreibung Schritt 2:** Erstelle eine `Game` Komponente, die das bestehende `GameBoard` rendert.
   - **Beschreibung Schritt 3:** Erstelle eine `Statistics` Komponente, die die Spielstatistiken anzeigt.

2. **Richte das Routing in der `App` Komponente ein:**

   - **Beschreibung Schritt 1:** Importiere notwendige Komponenten und React Router Elemente.
   - **Beschreibung Schritt 2:** Definiere die Routen für die verschiedenen Seiten.

3. **Navigation hinzufügen**

   - Füge ein Navigationsmenü hinzu, damit der Benutzer zwischen den Seiten wechseln kann.
   - Nutze dazu das `Link`-Element aus `react-router-dom`.

---

**Inspiration gefällig?**

Hier ist ein Code-Snippet, das dir beim Implementieren helfen kann. Einige Teile sind absichtlich ausgelassen, damit du sie selbst ausfüllen kannst.

```tsx
// src/components/App/App.tsx
import { Link, Routes, Route } from "react-router-dom";
import Welcome from "../Welcome/Welcome";
import GameBoard from "../GameBoard/GameBoard";
import GameResults from "../GameResults/GameResults";

const App = () => {
  return (
    <div>
      {/* TODO: Füge hier eine Navigation ein */}

      {/* TODO: Definiere hier die Routen */}
      <Routes>
        {/* Die Route für die Startseite */}

        {/* Die Route für das Spiel */}

        {/* Die Route für die Ergebnisse */}
      </Routes>
    </div>
  );
};

export default App;
```

_Hinweis:_ Achte darauf, dass du die korrekten Pfade und Komponenten verwendest. Überlege dir, wie die Komponenten miteinander interagieren und welche Komponenten gerendert werden sollen, wenn bestimmte Routen aufgerufen werden.

---

### Schritt 4: Den Test erneut ausführen

Da der Test im "Watch"-Modus läuft, wird er automatisch erneut ausgeführt, sobald du die Datei gespeichert hast.

**Erwarte folgendes Ergebnis:**

- Die Tests sollten jetzt **erfolgreich** sein. ✅
- Dies bedeutet, dass deine Routing-Konfiguration korrekt ist und die entsprechenden Seiten angezeigt werden.

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

   - Du solltest die Startseite sehen, die eine Begrüßungsnachricht enthält.
   - Nutze die Navigationslinks, um zum Spiel und zu den Ergebnissen zu gelangen.
   - Beobachte, wie sich die URL in der Adressleiste ändert, wenn du zwischen den Seiten navigierst.

---

### Zusammenfassung

In diesem Kapitel haben wir:

- Die **Routing-Funktionalität** mit `React Router` zu unserer Tic Tac Toe Anwendung hinzugefügt.
- Gelernt, wie man Routen definiert und Komponenten basierend auf der aktuellen URL rendert.
- Verstanden, wie man Tests schreibt, die das Routing überprüfen.
- Eine Navigation erstellt, um zwischen verschiedenen Seiten zu wechseln.

Durch das Implementieren von Routing haben wir unsere Anwendung modularer und benutzerfreundlicher gestaltet. Nutzer können nun direkt zu spezifischen Teilen der Anwendung navigieren, und wir haben eine Grundlage geschaffen, die in größeren Anwendungen unerlässlich ist.
