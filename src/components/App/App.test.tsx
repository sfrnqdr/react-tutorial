// src/components/App/App.test.tsx
import { render, screen } from "@testing-library/react";
import App from "./App";

test("zeigt die Begrüßungsnachricht an", () => {
  render(<App />);
  const greetingElement = screen.getByText(
    /Willkommen zum Tic-Tac-Toe-Spiel!/i
  );
  expect(greetingElement).toBeInTheDocument();
});
