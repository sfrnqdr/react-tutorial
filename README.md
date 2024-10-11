# Kapitel 12: Erstellung und Nutzung von Custom Hooks in React

## Leitfrage

Wie erstelle und verwende ich eigene Hooks (Custom Hooks) in React, um wiederverwendbare Logik zu implementieren?

## Antwort

In React ermöglichen uns Hooks, Zustands- und Logikfunktionen in Funktionskomponenten zu verwenden. Neben den eingebauten Hooks wie `useState`oder `useEffect` können wir auch **eigene Hooks**, sogenannte **Custom Hooks**, erstellen. Diese helfen uns dabei, wiederverwendbare Logik aus unseren Komponenten auszulagern und den Code sauberer und strukturierter zu gestalten.

### Was ist ein Custom Hook?

Ein **Custom Hook** ist eine JavaScript-Funktion, deren Name mit `use` beginnt und die selbst andere Hooks verwendet. Mit Custom Hooks können wir Funktionen schreiben, die Zustände und Effekte nutzen, und diese in mehreren Komponenten wiederverwenden.

### Warum Custom Hooks verwenden?

- **Wiederverwendbarkeit**: Vermeidung von doppeltem Code, indem gemeinsame Logik ausgelagert wird.
- **Lesbarkeit**: Komponenten bleiben übersichtlich, da die Logik ausgelagert wird.
- **Strukturierung**: Bessere Organisation des Codes durch Trennung von Logik und Darstellung.

### Codebeispiel

Stellen wir uns vor, wir möchten in mehreren Komponenten die aktuelle Fensterbreite verwenden, um die Darstellung entsprechend anzupassen. Anstatt in jeder Komponente denselben Code zu schreiben, können wir einen Custom Hook erstellen.

#### Schritt 1: Erstellen des Custom Hooks

Erstellen wir eine Datei namens `useWindowWidth.js` mit folgendem Inhalt:

```tsx
// useWindowWidth.js
import { useState, useEffect } from "react";

function useWindowWidth() {
  // Zustand für die Breite des Fensters
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Funktion, die aufgerufen wird, wenn das Fenster skaliert wird
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // Hinzufügen des Event Listeners
    window.addEventListener("resize", handleResize);

    // Aufräumfunktion, um den Event Listener zu entfernen
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Rückgabe der aktuellen Fensterbreite
  return windowWidth;
}

export default useWindowWidth;
```

**Erklärung:**

- Wir importieren `useState` und `useEffect` von React.
- Wir erstellen die Funktion `useWindowWidth`, die den aktuellen Wert von `window.innerWidth` als Zustand speichert.
- Mit `useEffect` fügen wir einen Event Listener hinzu, der bei jeder Fenstergrößenänderung die Breite aktualisiert.
- Durch die Rückgabe von `windowWidth` können andere Komponenten diesen Wert nutzen.

#### Schritt 2: Verwendung des Custom Hooks in einer Komponente

Jetzt können wir diesen Custom Hook in einer Komponente verwenden:

```tsx
// FensterBreiteAnzeigen.js
import React from "react";
import useWindowWidth from "./useWindowWidth";

function FensterBreiteAnzeigen() {
  const windowWidth = useWindowWidth();

  return (
    <div>
      <h2>Aktuelle Fensterbreite</h2>
      <p>Die Fensterbreite beträgt {windowWidth} Pixel.</p>
    </div>
  );
}

export default FensterBreiteAnzeigen;
```

**Erklärung:**

- Wir importieren unseren Custom Hook `useWindowWidth`.
- Innerhalb der Komponente rufen wir `useWindowWidth()` auf, um die aktuelle Fensterbreite zu erhalten.
- Wir zeigen den Wert in der Benutzeroberfläche an.

#### Schritt 3: Wiederverwendung in einer anderen Komponente

Der Vorteil von Custom Hooks besteht darin, dass wir sie in mehreren Komponenten verwenden können:

```tsx
// ResponsiveLayout.js
import React from "react";
import useWindowWidth from "./useWindowWidth";

function ResponsiveLayout() {
  const windowWidth = useWindowWidth();

  return (
    <div>
      {windowWidth > 768 ? (
        <p>Du benutzt eine große Ansicht.</p>
      ) : (
        <p>Du benutzt eine kleine Ansicht.</p>
      )}
    </div>
  );
}

export default ResponsiveLayout;
```

**Erklärung:**

- Wir verwenden erneut `useWindowWidth`, um die Fensterbreite zu erhalten.
- Basierend auf der Breite entscheiden wir, welche Ansicht dem Benutzer angezeigt wird.

### Was passiert hier genau?

- **Zustand verwalten**: Der Custom Hook verwaltet den Zustand der Fensterbreite.
- **Effekte nutzen**: Mit `useEffect` setzen wir einen Event Listener, der bei Änderungen reagiert.
- **Wiederverwendung**: Mehrere Komponenten können dieselbe Logik nutzen, ohne sie zu duplizieren.

### Wichtige Konzepte

- **Benennung**: Ein Custom Hook sollte immer mit `use` beginnen, z.B. `useFetch`, damit React erkennt, dass es sich um einen Hook handelt.
- **Regeln für Hooks**: Custom Hooks folgen denselben Regeln wie normale Hooks:
  - Sie sollten nur in Funktionskomponenten oder anderen Hooks aufgerufen werden.
  - Sie dürfen nicht innerhalb von Schleifen, Bedingungen oder verschachtelten Funktionen aufgerufen werden.
- **Parameter und Rückgabewerte**: Custom Hooks können Parameter akzeptieren und Werte zurückgeben, genau wie normale Funktionen.

## Hands-on Aufgaben: Custom Hooks

### Ziel der Aufgabe

In dieser Aufgabe werden wir lernen, wie man in React eigene Custom Hooks erstellt und nutzt. Wir werden einen Custom Hook namens `useGameLogic` erstellen, der die Spielzustände und die Logik für unser Tic-Tac-Toe-Spiel kapselt. Durch die Auslagerung dieser Logik in einen eigenen Hook machen wir unseren Code sauberer, besser wiederverwendbar und leichter zu testen.

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

```typescript
// src/hooks/useGameLogic.test.ts
import { renderHook, act } from "@testing-library/react";
import useGameLogic from "./useGameLogic";

describe("useGameLogic Hook", () => {
  it("sollte den initialen Zustand zurückgeben", () => {
    const { result } = renderHook(() => useGameLogic());
    expect(result.current.cells).toEqual(Array(9).fill(""));
    expect(result.current.currentPlayer).toBe("X");
    expect(result.current.winner).toBe("");
  });

  it("sollte den Spieler nach jedem Zug wechseln", () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.handleCellClick(0);
    });

    expect(result.current.cells[0]).toBe("X");
    expect(result.current.currentPlayer).toBe("O");
  });

  it("sollte den Gewinner korrekt erkennen", () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.handleCellClick(0); // X
      result.current.handleCellClick(3); // O
      result.current.handleCellClick(1); // X
      result.current.handleCellClick(4); // O
      result.current.handleCellClick(2); // X - gewinnt
    });

    expect(result.current.winner).toBe("X");
  });

  it("sollte das Spiel zurücksetzen können", () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.handleCellClick(0);
      result.current.handleReset();
    });

    expect(result.current.cells).toEqual(Array(9).fill(""));
    expect(result.current.currentPlayer).toBe("X");
    expect(result.current.winner).toBe("");
  });
});
```

**Was macht dieser Test?**

- **Prüft den initialen Zustand:**
  - Überprüft, ob der Hook beim ersten Aufruf die erwarteten Anfangswerte (`cells`, `currentPlayer`, `winner`) zurückgibt.
- **Überprüft den Spielerwechsel:**
  - Simuliert einen Spielzug und überprüft, ob der aktuelle Spieler wechselt und das entsprechende Feld gesetzt wird.
- **Erkennt den Gewinner:**
  - Simuliert eine Siegbedingung für Spieler "X" und überprüft, ob der Gewinner korrekt erkannt wird.
- **Testet das Zurücksetzen des Spiels:**
  - Überprüft, ob die `handleReset`-Funktion den Spielzustand auf die Anfangswerte zurücksetzt.

---

### Schritt 2: Den Test ausführen

Falls der "Watch"-Modus nicht bereits läuft, gebe den Befehl `npm run test:watch` im Terminal ein.

**Erwarte folgendes Ergebnis:**

- Der Test sollte **fehlschlagen**. ❌
- Das ist beabsichtigt, da die Funktionalität noch nicht implementiert ist.

---

### Schritt 3: Den Code anpassen, um den Test zu bestehen

Jetzt schreiben wir den notwendigen Code, damit der Test erfolgreich ist.

**So geht's:**

1. **Erstelle den Custom Hook `useGameLogic`:**

   - Lege eine neue Datei unter `src/hooks/useGameLogic.ts` an.
   - Implementiere die Logik, die bisher im `GameBoard`-Komponent verwendet wurde, innerhalb dieses Hooks.

2. **Exportiere die benötigten Werte und Funktionen:**

   - Stelle sicher, dass der Hook die folgenden Werte und Funktionen zurückgibt:
     - `cells`: Array der Spielfeldwerte.
     - `currentPlayer`: Der Spieler, der gerade am Zug ist.
     - `winner`: Der aktuelle Gewinner (oder leerer String, wenn es keinen gibt).
     - `handleCellClick(index: number)`: Funktion, um auf Klicks auf die Zellen zu reagieren.
     - `handleReset()`: Funktion, um das Spiel zurückzusetzen.

3. **Passen die `GameBoard`-Komponente an:**

   - Importiere den neuen Hook `useGameLogic`.
   - Entferne die Zustandsvariablen und Funktionen, die jetzt im Hook enthalten sind, aus der Komponente.
   - Verwende die vom Hook zurückgegebenen Werte und Funktionen innerhalb der Komponente.

---

**Inspiration gefällig?**

```typescript
// src/hooks/useGameLogic.ts
import { useState } from "react";

const useGameLogic = () => {
  // TODO: Initialisiere den Zustand für 'cells', 'currentPlayer' und 'winner'
  // TODO: Implementiere die Funktion 'checkWinner', um den Gewinner zu ermitteln
  // TODO: Implementiere 'handleCellClick', um auf Klicks auf die Zellen zu reagieren
  // TODO: Implementiere 'handleReset', um das Spiel zurückzusetzen
  // TODO: Gib die benötigten Werte und Funktionen zurück
};

export default useGameLogic;
```

---

### Schritt 4: Den Test erneut ausführen

Da der Test im "Watch"-Modus läuft, wird er automatisch erneut ausgeführt, sobald du die Datei gespeichert hast.

**Erwarte folgendes Ergebnis:**

- Der Test sollte jetzt **erfolgreich** sein. ✅
- Dies bedeutet, dass dein Code die erwartete Funktionalität erfüllt und der Custom Hook korrekt implementiert ist.

---

### Schritt 5: Die Anwendung im Browser betrachten

**So gehst du vor:**

1. **Starte die Entwicklungsumgebung:**

   - Falls der Entwicklungsserver nicht bereits läuft, gebe folgenden Befehl im Terminal ein:

     `npm run dev`

   - Dies startet deinen Entwicklungsserver.

2. **Öffne deinen Browser:**

   - Im Terminal wird eine lokale Adresse angezeigt.
   - Öffne diese Adresse in deinem Browser.

3. **Überprüfe die Anzeige:**

   - Du solltest das Tic-Tac-Toe-Spiel sehen und es sollte wie zuvor funktionieren.

4. **Teste die Funktionalität:**

   - Spiele ein paar Runden und stelle sicher, dass alles wie erwartet funktioniert.
   - Achte besonders darauf, ob der Spielverlauf korrekt gehandhabt wird.

---

### Zusammenfassung

In diesem Kapitel haben wir gelernt, wie man einen **Custom Hook** in React erstellt und verwendet. Wir haben die Spiel-Logik unseres Tic-Tac-Toe-Spiels in den Hook `useGameLogic` ausgelagert. Dies verbessert die **Wiederverwendbarkeit** und **Lesbarkeit** unseres Codes. Durch das Schreiben von Tests vor der Implementierung haben wir die **Testgetriebene Entwicklung (TDD)** angewandt und sichergestellt, dass unser Hook wie erwartet funktioniert.

---

## Ergebnis veröffentlichen:

```bash
git add .
git commit -m "update: step-11-custom-hooks"
git push
```

## Nächstes Kapitel:

```bash
git checkout -b mustermann-max-step-12-routing origin/step-12-routing
```
