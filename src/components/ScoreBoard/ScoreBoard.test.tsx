// src/ScoreBoard.test.tsx
import { render, screen } from "@testing-library/react";
import ScoreBoard from "./ScoreBoard";

test("zeigt die Anfangswerte des Spielstands korrekt an", () => {
  render(<ScoreBoard score={{ X: 0, O: 0 }} />);
  const scoreElement = screen.getByText(/Spielstand:/i);
  expect(scoreElement).toHaveTextContent("Spielstand: X: 0 - O: 0");
});

test("zeigt den aktualisierten Spielstand korrekt an", () => {
  render(<ScoreBoard score={{ X: 2, O: 3 }} />);
  const scoreElement = screen.getByText(/Spielstand:/i);
  expect(scoreElement).toHaveTextContent("Spielstand: X: 2 - O: 3");
});
