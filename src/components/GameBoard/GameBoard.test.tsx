// src/GameBoard.test.tsx
import { render, screen } from "@testing-library/react";
import GameBoard from "./GameBoard";

test("zeigt das Tic-Tac-Toe-Spielfeld an", () => {
  render(<GameBoard />);
  const titleElement = screen.getByText(/Tic Tac Toe/i);
  expect(titleElement).toBeInTheDocument();

  const cells = screen.getAllByRole("button");
  expect(cells.length).toBe(9);
});
