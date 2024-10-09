// src/StatusMessage.test.tsx
import { render, screen } from "@testing-library/react";
import StatusMessage from "./StatusMessage";

test("zeigt den aktuellen Spieler an, wenn kein Gewinner vorhanden ist", () => {
  render(<StatusMessage currentPlayer="X" winner="" />);
  const statusElement = screen.getByText(/Aktueller Spieler: X/i);
  expect(statusElement).toBeInTheDocument();
});

test("zeigt die Siegesnachricht an, wenn ein Gewinner vorhanden ist", () => {
  render(<StatusMessage currentPlayer="O" winner="X" />);
  const winnerElement = screen.getByText(/Spieler X hat gewonnen!/i);
  expect(winnerElement).toBeInTheDocument();
});
