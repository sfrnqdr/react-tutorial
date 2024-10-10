# Schritt 2: Funktionale Komponenten

## Leitfrage

**Was sind funktionale Komponenten in React, und wie erstellen wir unsere eigene Komponente?**

## Verständliche Antwort der Leitfrage für Anfänger

Hey du! 👋 Im letzten Schritt haben wir unsere Anwendung gestartet und eine einfache Begrüßungsnachricht angezeigt. Jetzt lernen wir, was funktionale Komponenten in React sind.

In React nutzen wir Komponenten, um unsere Benutzeroberfläche in wiederverwendbare Teile zu zerlegen. Eine funktionale Komponente ist einfach eine JavaScript-Funktion, die etwas JSX (das sieht aus wie HTML) zurückgibt. Damit können wir unseren Code sauber und organisiert halten. ✨

Lass uns eine eigene Komponente erstellen und sie in unserer App verwenden!

## Exemplarisches Codebeispiel (Tic Tac Toe)

**Erstellen einer neuen Komponente `Welcome.tsx`:**

```tsx
// src/Welcome.tsx
import React from "react";

function Welcome() {
  return (
    <div>
      <h1>Willkommen zum Tic-Tac-Toe-Spiel! 🎉</h1>
    </div>
  );
}

export default Welcome;
```

**Anpassen von `App.tsx`, um die neue Komponente zu verwenden:**

```tsx
// src/App.tsx
import React from "react";
import Welcome from "./Welcome";

function App() {
  return (
    <div>
      <Welcome />
    </div>
  );
}

export default App;
```

## Ausführliche vertiefende Erläuterung des Konzepts für Fortgeschrittene

Funktionale Komponenten sind ein zentrales Konzept in React. Sie erlauben es uns, wiederverwendbare und isolierte Stücke von Benutzeroberfläche zu erstellen.

In unserem Beispiel haben wir eine neue Komponente `Welcome` erstellt, die einfach eine Begrüßungsnachricht rendert. Diese Komponente ist eine Funktion, die JSX zurückgibt. Wir können diese Komponente wie ein HTML-Element verwenden, indem wir `<Welcome />` in unserem JSX einfügen.

Durch das Aufteilen unserer Anwendung in kleine Komponenten fördern wir die Wiederverwendbarkeit und Lesbarkeit unseres Codes. Außerdem wird es einfacher, einzelne Teile unserer App zu testen und zu warten.

## Hands-on Aufgaben zum Selbstprobieren

### Aufgabe: Eigene Funktionale Komponente erstellen

**Anforderungen:**

1. **Erstelle eine neue Datei `Welcome.tsx` im `src`-Verzeichnis.**

   - Definiere eine funktionale Komponente `Welcome`, die eine Begrüßungsnachricht anzeigt.
   - Exportiere die Komponente standardmäßig.

2. **Passe `App.tsx` an, um die `Welcome`-Komponente zu verwenden.**

   - Importiere die `Welcome`-Komponente.
   - Ersetze den bisherigen Code in `App.tsx`, sodass lediglich `<Welcome />` gerendert wird.

3. **Starte die Anwendung und überprüfe, ob die Begrüßungsnachricht weiterhin angezeigt wird.**

   - Führe im Terminal aus:

     ```bash
     npm run dev
     ```

   - Öffne die Anwendung im Browser.

### Zugehöriger Vitest für TDD

**Erstelle eine Testdatei `Welcome.test.tsx` für die `Welcome`-Komponente:**

```tsx
// src/Welcome.test.tsx
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

**Anforderungen aus dem Test abgeleitet:**

- Die `Welcome`-Komponente soll den Text **"Willkommen zum Tic-Tac-Toe-Spiel!"** anzeigen.

**Test ausführen:**

- Führe im Terminal aus:

  ```bash
  npm run test
  ```

- Stelle sicher, dass der Test erfolgreich durchläuft. ✅

## Fertige Musterlösung dieses Kapitels

1. **Erstellen der `Welcome`-Komponente:**

   ```tsx
   // src/Welcome.tsx
   import React from "react";

   function Welcome() {
     return (
       <div>
         <h1>Willkommen zum Tic-Tac-Toe-Spiel! 🎉</h1>
       </div>
     );
   }

   export default Welcome;
   ```

2. **Anpassen von `App.tsx`:**

   ```tsx
   // src/App.tsx
   import React from "react";
   import Welcome from "./Welcome";

   function App() {
     return (
       <div>
         <Welcome />
       </div>
     );
   }

   export default App;
   ```

3. **Test für `Welcome`-Komponente erstellen:**

   ```tsx
   // src/Welcome.test.tsx
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

4. **Anwendung starten und Tests ausführen:**

   - **Anwendung starten:**

     ```bash
     npm run dev
     ```

     - Überprüfe im Browser, dass die Begrüßungsnachricht angezeigt wird.

   - **Tests ausführen:**

     ```bash
     npm run test
     ```

     - Stelle sicher, dass alle Tests erfolgreich sind. ✅

---

**Super gemacht!** 🎉 Du hast gelernt, wie man eigene funktionale Komponenten in React erstellt und verwendet. Dies ist ein wichtiger Schritt, um unsere Tic-Tac-Toe-Anwendung modular und wartbar zu gestalten.
