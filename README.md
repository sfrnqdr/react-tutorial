# Schritt 1: Willkommen zu React (App.tsx)

## Leitfrage

**Wie funktioniert die grundlegende Struktur einer React-App, und wie können wir unsere Anwendung starten?**

## Antwort

Hey du! 👋 Willkommen zu unserem React-Tutorial für das Tic-Tac-Toe-Spiel. Bevor wir anfangen, das Spiel zu bauen, schauen wir uns an, wie eine React-App grundsätzlich aufgebaut ist.

In React arbeiten wir mit Komponenten. Die Hauptkomponente unserer Anwendung ist die `App`-Komponente. Dort definieren wir, was auf dem Bildschirm angezeigt wird, wenn die App gestartet wird. Lass uns gemeinsam eine Begrüßungsnachricht einfügen und die App zum Laufen bringen! 🚀

## Codebeispiel

```tsx
import React from "react";

function App() {
  return (
    <div>
      <h1>Willkommen zum Tic-Tac-Toe-Spiel! 🎉</h1>
    </div>
  );
}

export default App;
```

## Hands-on Aufgaben zum Selbstprobieren

### Aufgabe: Begrüßungsnachricht anzeigen

**Anforderungen:**

1. **App.tsx bearbeiten:**

   - Öffne die Datei `App.tsx` in deinem Projektordner.
   - Ersetze den bestehenden Code mit dem obigen Codebeispiel.

2. **Abhängigkeiten installieren:**

   - Öffne dein Terminal oder deine Eingabeaufforderung.
   - Navigiere in das Projektverzeichnis.
   - Führe den folgenden Befehl aus, um alle nötigen Pakete zu installieren:

     ```bash
     npm install
     ```

3. **Anwendung starten:**

   - Starte die Entwicklungsumgebung mit:

     ```bash
     npm run dev
     ```

   - Öffne deinen Browser und rufe die angegebene lokale Adresse auf (z. B. `http://localhost:3000`).
   - Du solltest die Nachricht **"Willkommen zum Tic-Tac-Toe-Spiel! 🎉"** sehen.

### Zugehöriger Vitest für TDD

Um sicherzustellen, dass unsere Anwendung korrekt funktioniert, schreiben wir einen automatisierten Test.

**Testdatei erstellen (`App.test.tsx`):**

Erstelle eine neue Datei namens `App.test.tsx` im gleichen Verzeichnis wie `App.tsx` und füge folgenden Code ein:

```tsx
import { render, screen } from "@testing-library/react";
import App from "./App";

test("zeigt die Begrüßungsnachricht an", () => {
  render(<App />);
  const greetingElement = screen.getByText(
    /Willkommen zum Tic-Tac-Toe-Spiel!/i
  );
  expect(greetingElement).toBeInTheDocument();
});
```

**Test ausführen:**

- Führe im Terminal den folgenden Befehl aus:

  ```bash
  npm run test
  ```

- Der Test sollte erfolgreich durchlaufen und bestätigen, dass die Begrüßungsnachricht angezeigt wird. ✅

---

**Herzlichen Glückwunsch!** 🎊 Du hast deine erste React-Komponente erstellt und verstanden, wie die grundlegende Struktur einer React-App aussieht. Außerdem hast du gelernt, wie man die Anwendung startet und Tests ausführt.
