// App.test.tsx
import { test } from "vitest"; // 'test' ist global verfügbar, wenn 'globals: true' ist
import { render } from "@testing-library/react";
import App from "./App";

test("Die Anwendung rendert ohne zu crashen", () => {
  render(<App />);
  // Optional: Füge eine Assertion hinzu
  // expect(screen.getByText('Willkommen')).toBeInTheDocument();
});
