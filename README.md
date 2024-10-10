## Leitfrage

Wie funktioniert die grundlegende Struktur einer React-App, und wie können wir unsere Anwendung starten?

## Antwort

Willkommen zu unserem React-Tutorial! 👋  Gemeinsam erstellen wir in diesem Workshop ein Tic-Tac-Toe-Spiel. Bevor wir anfangen, das Spiel zu bauen, schauen wir uns an, wie eine React-App grundsätzlich aufgebaut ist.

### Einführung in React und Komponenten

**React** ist eine beliebte JavaScript-Bibliothek, die von Facebook entwickelt wurde. Sie hilft dabei, benutzerfreundliche und interaktive Webseiten zu erstellen. Ein fundamentaler Bestandteil von React sind **Komponenten**.

#### Was sind Komponenten?

Stell dir vor, eine Webseite besteht aus vielen kleinen Teilen – zum Beispiel ein Kopfbereich, ein Menü, Inhalte und ein Fußbereich. In React ist jeder dieser Teile eine **Komponente**. Komponenten sind wie Bausteine, die du zusammensetzen kannst, um komplexe Benutzeroberflächen zu erstellen.

**Vorteile von Komponenten:**

- **Wiederverwendbarkeit:** Einmal erstellte Komponenten können an verschiedenen Stellen wiederverwendet werden.
- **Übersichtlichkeit:** Der Code wird strukturiert und leichter zu verstehen.
- **Wartbarkeit:** Änderungen können in einzelnen Komponenten gemacht werden, ohne das gesamte Projekt zu beeinflussen.

### Die Hauptkomponente: `App`

In einer React-Anwendung gibt es eine zentrale Komponente, die oft als **Hauptkomponente** bezeichnet wird. Diese Hauptkomponente heißt meist `App` und ist der Ausgangspunkt deiner gesamten Anwendung. In der `App`-Komponente definierst du, was auf dem Bildschirm angezeigt wird, sobald die App gestartet wird.

## Codebeispiel

```tsx
const App = () => {
  return (
    <div>
      <h1>Willkommen zum Tic-Tac-Toe-Spiel! 🎉</h1>
    </div>
  );
}

export default App;
```

## Hands-On Aufgabe: Begrüßungsnachricht anzeigen

In dieser Übung lernst du, wie du mithilfe von **Testgetriebener Entwicklung (TDD)** eine einfache Begrüßungsnachricht in deiner Anwendung anzeigen kannst.

### Ziel der Aufgabe

Am Ende dieser Übung soll deine Anwendung die Nachricht **"Willkommen zum Tic-Tac-Toe-Spiel! 🎉"** im Browser anzeigen. Du wirst verstehen, wie Tests helfen können, sicherzustellen, dass dein Code korrekt funktioniert.

---

### Schritt 1: Den Test verstehen

**Was ist ein Test?**

Ein Test ist ein Stück Code, das überprüft, ob ein anderer Teil deines Codes das tut, was er soll. In der **Testgetriebenen Entwicklung** schreiben wir zuerst den Test, der natürlich zuerst fehlschlägt, und implementieren dann den Code, der den Test bestehen lässt.

**Schau dir den folgenden Test an:**

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

**Was macht dieser Test?**

- Er rendert die `App`-Komponente.
- Er sucht nach einem Element, das den Text **"Willkommen zum Tic-Tac-Toe-Spiel!"** enthält.
- Er erwartet, dass dieses Element im Dokument vorhanden ist.

---

### Schritt 2: Den Test ausführen

Jetzt führen wir den Test aus, um zu sehen, ob er fehlschlägt (was wir erwarten, da wir die Begrüßungsnachricht noch nicht implementiert haben).

**So führst du den Test aus:**

1. **Öffne das Terminal** in deinem Projektordner.
    
2. **Gib folgenden Befehl ein:**
    
    bash
    
    `npm run test:watch`
    
    Dieser Befehl startet den Test im "Watch"-Modus, der die Tests automatisch erneut ausführt, wenn du Codeänderungen vornimmst.
    

**Erwarte folgendes Ergebnis:**

- Der Test sollte **fehlschlagen**. 🛑
- Das ist beabsichtigt, da die Funktionalität noch nicht implementiert ist.

---

### Schritt 3: Den Code anpassen, um den Test zu bestehen

Jetzt schreiben wir den notwendigen Code, damit der Test erfolgreich ist.

**So geht's:**

1. **Öffne die Datei `App.tsx`** in deinem Projektordner.
    
2. **Ersetze den gesamten Inhalt der Datei mit folgendem Code:**
    
    ```tsx
    const App = () => { 
	    return ( 
		    <div>
			    <h1>Willkommen zum Tic-Tac-Toe-Spiel! 🎉</h1> 
			</div>
	    ); 
    } 
    
    export default App;
    ```
    
    **Was macht dieser Code?**
    
    - Er definiert eine funktionale Komponente `App`, die ein `div` mit einer Überschrift `h1` enthält.
    - Die Überschrift zeigt die Begrüßungsnachricht an.
    
3. **Speichere die Datei.**
    

---

### Schritt 4: Den Test erneut ausführen

Da der Test im "Watch"-Modus läuft, wird er automatisch erneut ausgeführt, sobald du die Datei gespeichert hast.

**Erwarte folgendes Ergebnis:**

- Der Test sollte jetzt **erfolgreich** sein. ✅
- Dies bedeutet, dass dein Code die erwartete Funktionalität erfüllt und die Begrüßungsnachricht angezeigt wird.

---

### Schritt 5: Die Anwendung im Browser betrachten

Nun wollen wir sehen, wie die Anwendung im Browser aussieht.

**So gehst du vor:**

1. **Starte die Entwicklungsumgebung:**
    
    - Öffne ein neues Terminalfenster (oder benutze ein separates Terminal-Tab).
        
    - Gib folgenden Befehl ein:
        
        `npm run dev`
        
    - Dies startet deinen Entwicklungsserver.
        
2. **Öffne deinen Browser:**
    
    - Im Terminal wird eine lokale Adresse angezeigt.
    - Öffne diese Adresse in deinem Browser.
    
1. **Überprüfe die Anzeige:**
    
    - Du solltest die Nachricht **"Willkommen zum Tic-Tac-Toe-Spiel! 🎉"** auf der Seite sehen.

### Zusammenfassung

In diesem Workshop haben wir die Grundlagen von React und Komponenten kennengelernt. Wir haben die Hauptkomponente `App` erstellt und eine einfache Begrüßungsnachricht eingefügt. Durch diesen Prozess hast du einen ersten Einblick in die Struktur und Funktionsweise von React-Anwendungen gewonnen.

## Ergebnis veröffentlichen:
```bash
git add .
git commit -m "update: step-1-welcome"
git push
```

## Nächstes Kapitel:

```bash
git checkout -b mustermann-max-step-1-welcome origin/step-1-welcome
```
