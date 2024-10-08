import { render, screen } from "@testing-library/react";
import Board from "./Board";

test("zeigt drei Square-Komponenten an", () => {
  render(<Board />);
  const squares = screen.getAllByRole("button");
  expect(squares).toHaveLength(3);
});
