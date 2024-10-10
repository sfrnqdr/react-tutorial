// src/Components/Welcome/Welcome.test.tsx
import { render, screen } from "@testing-library/react";
import Welcome from "./Welcome";

test("zeigt die Begrüßungsnachricht an", () => {
  render(<Welcome />);
  const greetingElement = screen.getByText(
    /Willkommen zum Tic-Tac-Toe-Spiel! 🎉/i
  );
  expect(greetingElement).toBeInTheDocument();
});
