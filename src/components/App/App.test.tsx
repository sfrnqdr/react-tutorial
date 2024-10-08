// App.test.tsx
import { test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Die Anwendung rendert ohne zu crashen", () => {
  render(<App />);
});

test("rendert GameIntroduction und Board Komponenten", () => {
  render(<App />);
  expect(screen.getByText("Einführung in Tic-Tac-Toe")).toBeInTheDocument();
  expect(screen.getByText("Tic-Tac-Toe Spiel")).toBeInTheDocument();

  const squares = screen.getAllByRole("button");
  expect(squares).toHaveLength(3);
});
