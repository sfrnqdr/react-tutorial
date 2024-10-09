// src/Cell.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Cell from "./Cell";

test("zeigt den initialen Wert an", () => {
  render(<Cell value="" />);
  const cellElement = screen.getByRole("button");
  expect(cellElement).toHaveTextContent("");
});

test('ändert den Wert auf "X" bei Klick, wenn leer', () => {
  render(<Cell value="" />);
  const cellElement = screen.getByRole("button");
  fireEvent.click(cellElement);
  expect(cellElement).toHaveTextContent("X");
});

test("ändert den Wert nicht, wenn bereits gesetzt", () => {
  render(<Cell value="O" />);
  const cellElement = screen.getByRole("button");
  fireEvent.click(cellElement);
  expect(cellElement).toHaveTextContent("O");
});
