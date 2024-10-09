# Schritt 8: Komponenten-Rendering

## Leitfrage

**Wie funktioniert das Rendering von Komponenten in React, und wie können wir es optimieren, um die Performance unserer Anwendung zu verbessern?**

## Verständliche Antwort der Leitfrage für Anfänger

Hey du! 👋 In diesem Schritt werden wir verstehen, wie React-Komponenten gerendert werden und wie wir das Rendering beeinflussen können, um unsere Anwendung schneller und effizienter zu machen. 🚀

Wenn wir in React eine Komponente ändern, wird sie und ihre Kindkomponenten neu gerendert. Manchmal kann das zu unnötigen Renderzyklen führen. Wir lernen, wie wir kontrollieren können, wann eine Komponente gerendert wird, um die Leistung unseres Tic-Tac-Toe-Spiels zu verbessern. 🏎️

## Exemplarisches Codebeispiel (Tic Tac Toe)

**Verwendung von `React.memo` zur Optimierung des Renderings:**

```tsx
// src/Cell.tsx
import React from "react";

type CellProps = {
  value: string;
  onClick: () => void;
};

const Cell = React.memo(({ value, onClick }: CellProps) => {
  console.log(`Rendering Cell with value: ${value}`);
  return (
    <div className="cell" role="button" onClick={onClick}>
      {value}
    </div>
  );
});

export default Cell;
```

**Anpassung von `GameBoard.tsx`:**

```tsx
// src/GameBoard.tsx
// Der restliche Code bleibt unverändert
```

## Ausführliche vertiefende Erläuterung des Konzepts für Fortgeschrittene

In React wird eine Komponente neu gerendert, wenn sich ihr Zustand (`state`) oder ihre Eigenschaften (`props`) ändern. Das kann dazu führen, dass viele Komponenten neu gerendert werden, auch wenn sich an ihren Daten nichts geändert hat.

**`React.memo`** ist eine Higher-Order-Komponente, die eine Komponente umhüllt und sie nur dann neu rendert, wenn sich ihre Props ändern. Das ist besonders nützlich bei funktionalen Komponenten.

Im obigen Beispiel:

- Wir verwenden `React.memo`, um die `Cell`-Komponente zu optimieren.
- Wenn die Props (`value` und `onClick`) der `Cell` gleich bleiben, wird sie nicht neu gerendert.

Dies reduziert unnötige Renderzyklen und verbessert die Performance unserer Anwendung.

Außerdem haben wir `console.log` hinzugefügt, um zu sehen, wann eine Zelle neu gerendert wird. So können wir in der Browser-Konsole verfolgen, welche Zellen neu gerendert werden.

## Hands-on Aufgaben zum Selbstprobieren

### Aufgabe: Optimierung des Komponenten-Renderings mit `React.memo`

**Anforderungen:**

1. **Verwende `React.memo` in der `Cell`-Komponente:**

   - Ändere die Definition der `Cell`-Komponente, um `React.memo` zu verwenden.
   - Füge `console.log` hinzu, um das Rendering zu verfolgen.

2. **Teste das Verhalten:**

   - Starte die Anwendung:

     ```bash
     npm run dev
     ```

   - Öffne die Browser-Konsole.
   - Klicke auf eine Zelle und beobachte, welche Zellen neu gerendert werden.
   - Stelle fest, dass nur die angeklickte Zelle neu gerendert wird.

### Zugehöriger Vitest für TDD

**Obwohl das Verhalten von `React.memo` schwer zu testen ist, können wir überprüfen, ob die Komponente korrekt rendert.**

**Erstelle eine Testdatei `Cell.test.tsx`:**

```tsx
// src/Cell.test.tsx
import { render, screen } from "@testing-library/react";
import Cell from "./Cell";

test("rendert die Zelle korrekt", () => {
  render(<Cell value="X" onClick={() => {}} />);
  const cellElement = screen.getByText("X");
  expect(cellElement).toBeInTheDocument();
});
```

**Anforderungen aus dem Test abgeleitet:**

- Die `Cell`-Komponente soll den übergebenen Wert anzeigen.

**Test ausführen:**

```bash
npm run test
```

- Stelle sicher, dass der Test erfolgreich ist. ✅

## Fertige Musterlösung dieses Kapitels

1. **Anpassen der `Cell`-Komponente:**

   ```tsx
   // src/Cell.tsx
   import React from "react";

   type CellProps = {
     value: string;
     onClick: () => void;
   };

   const Cell = React.memo(({ value, onClick }: CellProps) => {
     console.log(`Rendering Cell with value: ${value}`);
     return (
       <div className="cell" role="button" onClick={onClick}>
         {value}
       </div>
     );
   });

   export default Cell;
   ```

2. **Anwendung starten und Rendering beobachten:**

   - **Anwendung starten:**

     ```bash
     npm run dev
     ```

   - **Browser-Konsole öffnen:**

     - Öffne die Entwicklerwerkzeuge (F12) und gehe zum Console-Tab.

   - **Testen:**

     - Klicke auf eine Zelle.
     - Beobachte, dass nur die angeklickte Zelle in der Konsole ausgegeben wird.
     - Andere Zellen werden nicht neu gerendert.

3. **Test ausführen:**

   - **Erstelle `Cell.test.tsx`:**

     ```tsx
     // src/Cell.test.tsx
     import { render, screen } from "@testing-library/react";
     import Cell from "./Cell";

     test("rendert die Zelle korrekt", () => {
       render(<Cell value="X" onClick={() => {}} />);
       const cellElement = screen.getByText("X");
       expect(cellElement).toBeInTheDocument();
     });
     ```

   - **Test ausführen:**

     ```bash
     npm run test
     ```

     - Der Test sollte erfolgreich sein. ✅

---

**Klasse gemacht!** 🎉 Du hast gelernt, wie das Rendering von Komponenten in React funktioniert und wie du mit `React.memo` unnötige Renderzyklen vermeiden kannst. Das erhöht die Performance deiner Anwendung und sorgt für ein flüssigeres Nutzererlebnis. 🚀

Indem du Komponenten nur dann neu renderst, wenn es nötig ist, kannst du große Anwendungen effizient halten. Mach weiter so! 💪

**Wenn du bereit bist, sage "weiter", um zum nächsten Kapitel zu gelangen.**
