# Funktionale Komponenten

## Leitfrage für dieses Teilmodul

**Was sind funktionale Komponenten in React und wie verwenden wir sie, um die Bausteine unseres Tic-Tac-Toe-Spiels zu erstellen?**

## Ausführliche Beantwortung und Erläuterung mit Codebeispiel

### Was sind funktionale Komponenten?

In React sind Komponenten die grundlegenden Bausteine einer Anwendung. Eine **funktionale Komponente** ist eine einfache JavaScript-Funktion, die ein React-Element zurückgibt. Sie nimmt optionale Eingaben, sogenannte **Props**, entgegen und gibt JSX zurück, das beschreibt, was auf der Benutzeroberfläche angezeigt werden soll.

### Warum funktionale Komponenten verwenden?

- **Einfachheit**: Sie sind leicht zu schreiben und zu verstehen.
- **Performance**: Sie haben weniger Overhead als Klassenkomponenten.
- **Hooks**: Moderne React-Features wie Hooks funktionieren nur mit funktionalen Komponenten.

### Erstellung einer funktionalen Komponente für unser Spiel

Beginnen wir damit, eine einfache `Square`-Komponente für unser Tic-Tac-Toe-Spiel zu erstellen. Diese Komponente repräsentiert ein einzelnes Feld auf dem Spielbrett.

Erstelle eine neue Datei `Square.jsx` im `src`-Verzeichnis:

```jsx
import React from "react";

const Square = () => {
  return <button className="square">{/* Inhalt folgt später */}</button>;
};

export default Square;
```

**Erläuterung:**

- **Import**: Wir importieren React, um JSX verwenden zu können.
- **Definition**: `Square` ist eine Arrow Function, die eine React-Komponente darstellt.
- **Rückgabe**: Die Komponente gibt ein `<button>`-Element mit der Klasse `square` zurück.
- **Export**: Wir exportieren die Komponente, damit sie in anderen Dateien verwendet werden kann.

### Einbindung in die Hauptanwendung

Um die `Square`-Komponente zu verwenden, importieren wir sie in unsere `App.jsx`:

```jsx
import React from "react";
import GameIntroduction from "./GameIntroduction";
import Square from "./Square";

const App = () => {
  return (
    <div>
      <GameIntroduction />
      <h1>Tic-Tac-Toe Spiel</h1>
      <Square />
    </div>
  );
};

export default App;
```

Damit wird die `Square`-Komponente innerhalb unserer App angezeigt, direkt unter der Spiel-Einführung.

## Lernfragen zum Selbstüberprüfen

**Was ist eine funktionale Komponente in React?**

_Antwort_: Eine funktionale Komponente ist eine JavaScript-Funktion, die Props als Parameter entgegennimmt und JSX zurückgibt, um ein React-Element zu rendern.

**Welche Vorteile bieten funktionale Komponenten gegenüber Klassenkomponenten?**

_Antwort_: Funktionale Komponenten sind einfacher, benötigen weniger Code, haben weniger Overhead und unterstützen Hooks, was die Handhabung von Zustand und Seiteneffekten erleichtert.

## Hands on: Selbst coden

**Aufgabe:** Erstelle eine `Board`-Komponente, die mehrere `Square`-Komponenten anzeigt, um eine Reihe des Tic-Tac-Toe-Bretts darzustellen.

### Schritte:

1. **Erstelle die Datei `Board.jsx` im `src`-Verzeichnis.**

   ```jsx
   import React from "react";
   import Square from "./Square";

   const Board = () => {
     return (
       <div className="board-row">
         <Square />
         <Square />
         <Square />
       </div>
     );
   };

   export default Board;
   ```

2. **Aktualisiere `App.jsx`, um die `Board`-Komponente einzubinden.**

   ```jsx
   import React from "react";
   import GameIntroduction from "./GameIntroduction";
   import Board from "./Board";

   const App = () => {
     return (
       <div>
         <GameIntroduction />
         <h1>Tic-Tac-Toe Spiel</h1>
         <Board />
       </div>
     );
   };

   export default App;
   ```

3. **Füge CSS hinzu, um die Darstellung zu verbessern.**

   In deiner CSS-Datei (`App.css` oder einer separaten CSS-Datei):

   ```css
   .board-row {
     display: flex;
   }

   .square {
     width: 60px;
     height: 60px;
     margin: 5px;
     font-size: 24px;
     text-align: center;
   }
   ```

4. **Starte die Entwicklungsumgebung und überprüfe die Ausgabe.**

   ```bash
   yarn start
   ```

5. **Öffne die Anwendung im Browser** und stelle sicher, dass drei Quadrate nebeneinander angezeigt werden.

## Ready or Done Kriterien für die Anwendung

- Eine `Board`-Komponente ist erstellt und zeigt mehrere `Square`-Komponenten an.
- Die `Square`-Komponenten werden korrekt und ohne Fehler gerendert.
- Die Anwendung läuft ohne Fehler.
