import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GameIntroduction from "./GameIntroduction";

test("rendert den Einführungsabschnitt des Spiels", () => {
  render(<GameIntroduction />);
  const headingElement = screen.getByText(/Einführung in Tic-Tac-Toe/i);
  expect(headingElement).toBeInTheDocument();

  const paragraphElement = screen.getByText(
    /Tic-Tac-Toe ist ein einfaches Strategiespiel/i
  );
  expect(paragraphElement).toBeInTheDocument();
});
