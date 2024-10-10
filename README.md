# Einleitung zu Deinem React Frontend-Tutorial

Herzlich willkommen zu deinem **React Frontend-Tutorial**! Wenn du Lust hast, mit React durchzustarten und richtig coole, interaktive Benutzeroberflächen zu bauen, bist du hier genau richtig. In diesem Tutorial nehmen wir dich Schritt für Schritt an die Hand und decken alle wichtigen Themen ab, die du brauchst, um ein echter React-Profi zu werden.

## Was Dich erwartet

Hier sind die Themen, die wir gemeinsam durchgehen werden:

1. **[step-1-welcome](https://github.com/sfrnqdr/react-tutorial)**
2. **[step-2-functional-components](https://github.com/sfrnqdr/react-tutorial/tree/step-2-functional-components)**
3. **[step-3-JSX-implementation](https://github.com/sfrnqdr/react-tutorial/tree/step-3-jsx-implementation)**
4. **[step-4-props-vs-state](https://github.com/sfrnqdr/react-tutorial/tree/step-4-props-vs-state)**
5. **[step-5-styling-components](https://github.com/sfrnqdr/react-tutorial/tree/step-5-styling-components)**
6. **[step-6-conditional-rendering](https://github.com/sfrnqdr/react-tutorial/tree/step-6-conditional-rendering)**
7. **[step-7-component-composition](https://github.com/sfrnqdr/react-tutorial/tree/step-7-component-composition)**
8. **[step-8-component-rendering](https://github.com/sfrnqdr/react-tutorial/tree/step-8-component-rendering)**
9. **[step-9-event-handling](https://github.com/sfrnqdr/react-tutorial/tree/step-9-event-handling)**
10. **[step-10-use-state-hook](https://github.com/sfrnqdr/react-tutorial/tree/step-10-use-state-hook)**
11. **[step-11-common-hooks](https://github.com/sfrnqdr/react-tutorial/tree/step-11-common-hooks)**
12. **[step-12-custom-hooks](https://github.com/sfrnqdr/react-tutorial/tree/step-12-custom-hooks)**
13. **[step-13-api-integration](https://github.com/sfrnqdr/react-tutorial/tree/step-13-api-integration)**
14. **[step-14-final-thoughts](#)**

Jeder dieser Schritte enthält ausführliche Erklärungen, praktische Beispiele und weiterführende Links, die dir helfen, das Gelernte direkt anzuwenden.

## Erste Schritte

Bevor wir loslegen, stell sicher, dass du alle nötigen Pakete installiert hast. Öffne dein Terminal im Root-Verzeichnis deines Projekts und führe folgenden Befehl aus:

```bash
npm install
```

## Git-Branching leicht gemacht

Wir haben das Tutorial in verschiedene Branches aufgeteilt, die jeweils einem Themenblock entsprechen. So kannst du jeden Schritt einzeln bearbeiten und bei Bedarf zurückspringen. So geht’s:

1. **Repository klonen (falls noch nicht geschehen):**

```bash
git clone https://github.com/sfrnqdr/react-tutorial.git
cd react-tutorial
```

2. **Einen neuen Branch für den aktuellen Schritt erstellen:**

Ersetze `step-x-branch-name` mit dem gewünschten Schritt, z.B. `step-1-welcome`. Gib deinem Branch einen individuellen Namen, indem du deinen Nachnamen und Vornamen voranstellst:

```bash
git checkout -b mustermann-max-step-1-welcome origin/step-1-welcome
```

3. **Starte mit dem ersten Schritt:**

Beginne mit dem Branch `step-1-welcome`:

```bash
git checkout -b mustermann-max-step-1-welcome origin/step-1-welcome
```

4. **Sauberen Arbeitsbereich herstellen:**

Damit alles reibungslos funktioniert und du keine ungewollten Änderungen hast, sorgen wir für einen sauberen Arbeitsbereich (clean workspace), bevor du zu einem neuen Branch wechselst. Das verhindert Konflikte und stellt sicher, dass jeder Schritt in einer kontrollierten Umgebung stattfindet:

```bash
git reset --hard && git clean -fd
```

## Anwendung und Tests starten

Nachdem du den gewünschten Branch ausgecheckt und alle Abhängigkeiten installiert hast, kannst du die App sowie die Tests starten.

### Die App starten

Um die React-Anwendung im Terminal zu starten, gib einfach folgendes ein:

```bash
npm run dev
```

Dieser Befehl startet den Entwicklungsserver und öffnet die App in Deinem Standardbrowser. Änderungen im Code werden automatisch übernommen. 

### Tests ausführen

Für die Tests nutze diesen Befehl:

  ```bash
npm run test:watch
```

Damit startest du den Testlauf, der deine Dateien überwacht und Tests bei jeder Änderung automatisch ausführt.

## Let's go!

Jetzt bist du bereit, mit dem ersten Schritt zu starten! Wechsle zum Branch `step-1-welcome` und starte die App mit `npm run dev`, sowie die Testumgebung  `npm run test:watch`. Folge den Anleitungen in den einzelnen Themenblöcken und baue dir Schritt für Schritt ein solides React-Know-how auf.

```bash
git checkout -b mustermann-max-step-1-welcome origin/step-1-welcome
```

