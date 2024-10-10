// src/GameIntroduction/GameIntroduction.test.tsx
import { render, screen } from "@testing-library/react";
import GameIntroduction from "./GameIntroduction";

test("zeigt die Einführung zum Spiel an", () => {
  render(<GameIntroduction />);
  const headingElement = screen.getByText(/Einführung in Tic-Tac-Toe/i);
  expect(headingElement).toBeInTheDocument();
});

test("zeigt die Beschreibung des Spiels an", () => {
  render(<GameIntroduction />);
  const descriptionElement = screen.getByText(
    /Tic-Tac-Toe ist ein einfaches Strategiespiel für zwei Spieler/i
  );
  expect(descriptionElement).toBeInTheDocument();
});
