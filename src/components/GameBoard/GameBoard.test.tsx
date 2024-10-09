// src/GameBoard.test.tsx
import { render, screen } from "@testing-library/react";
import GameBoard from "./GameBoard";

test('das Spielfeld hat die Klasse "board"', () => {
  render(<GameBoard />);
  const boardElement = screen.getByRole("grid");
  expect(boardElement).toHaveClass("board");
});

test('die Zellen haben die Klasse "cell"', () => {
  render(<GameBoard />);
  const cellElements = screen.getAllByRole("button");
  cellElements.forEach((cell) => {
    expect(cell).toHaveClass("cell");
  });
});
