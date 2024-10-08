# Einführung

Was ist React und wie können wir es nutzen, um ein interaktives Tic-Tac-Toe-Spiel zu erstellen?

## Erläuterung mit Codebeispiel

**Was ist React?**

React ist eine JavaScript-Bibliothek zur Erstellung von Benutzeroberflächen. Sie wurde von Facebook entwickelt und ermöglicht es Entwicklern, wiederverwendbare UI-Komponenten zu erstellen, die den Zustand und das Verhalten einer Anwendung effizient verwalten.

**Warum React für unser Tic-Tac-Toe-Spiel?**

- **Komponentenbasiert**: React erlaubt es uns, die Benutzeroberfläche in kleinere, wiederverwendbare Teile zu zerlegen.
- **Effizientes Rendering**: Durch das virtuelle DOM aktualisiert React nur die Teile der UI, die sich tatsächlich geändert haben.
- **JSX**: Eine Syntaxerweiterung für JavaScript, die das Schreiben von HTML-ähnlichem Code innerhalb von JavaScript ermöglicht.

**Unser Ziel**

Wir werden Schritt für Schritt ein Tic-Tac-Toe-Spiel entwickeln, bei dem du die grundlegenden Konzepte von React erlernst und anwendest.

**Codebeispiel**

Als Einstieg hier eine einfache React-Komponente, die eine Begrüßungsnachricht anzeigt:

```jsx
import React from "react";

const WelcomeMessage = () => {
  return <h1>Willkommen zum Tic-Tac-Toe mit React!</h1>;
};

export default WelcomeMessage;
```

In diesem Beispiel nutzen wir eine funktionale Komponente mit einer Arrow Function, um eine Überschrift anzuzeigen.

## Lernfragen zum Selbstüberprüfen

1. **Was ist der Hauptzweck von React?**

   _Antwort_: React dient der Erstellung von dynamischen und interaktiven Benutzeroberflächen durch die Verwendung von wiederverwendbaren Komponenten.

2. **Welche Vorteile bietet das komponentenbasierte Design von React?**

   _Antwort_: Es ermöglicht eine bessere Strukturierung des Codes, Wiederverwendbarkeit von UI-Elementen und einfachere Wartung der Anwendung.

## Hands-on: Selbst coden

**Aufgabe**: Erstelle eine neue React-Komponente namens `GameIntroduction`, die eine kurze Einführung in das Spiel Tic-Tac-Toe enthält.

**Schritte**:

1. Erstelle eine Datei `GameIntroduction.jsx`.
2. Importiere React.
3. Definiere die funktionale Komponente `GameIntroduction` mit einer Arrow Function.
4. Lasse die Komponente einen Text mit einer Einführung in das Spiel zurückgeben.
5. Exportiere die Komponente standardmäßig.

## Ready-of-Done-Kriterien für die Anwendung

- Eine React-Komponente `GameIntroduction` ist erstellt und exportiert.
- Die Komponente rendert ohne Fehler und zeigt eine Einführung in das Spiel an.
