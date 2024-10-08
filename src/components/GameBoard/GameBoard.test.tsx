// src/GameBoard.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GameBoard from "./GameBoard";

test("zeigt keine Siegesnachricht an, wenn das Spiel beginnt", () => {
  render(<GameBoard />);
  const winnerMessage = screen.queryByText(/Spieler .* hat gewonnen!/i);
  expect(winnerMessage).toBeNull();
});

test("zeigt die Siegesnachricht an, wenn ein Spieler gewinnt", () => {
  render(<GameBoard />);
  const cells = screen.getAllByRole("button");

  // Simuliere einen Sieg für 'X'
  fireEvent.click(cells[0]); // X
  fireEvent.click(cells[3]); // O
  fireEvent.click(cells[1]); // X
  fireEvent.click(cells[4]); // O
  fireEvent.click(cells[2]); // X

  const winnerMessage = screen.getByText(/Spieler X hat gewonnen!/i);
  expect(winnerMessage).toBeInTheDocument();
});

test("klick auf eine Zelle trägt den Zug ein", () => {
  render(<GameBoard />);
  const cells = screen.getAllByRole("button");

  fireEvent.click(cells[0]); // Klick auf die erste Zelle

  expect(cells[0]).toHaveTextContent("X"); // Erster Spieler ist 'X'
});

test("Spieler wechseln nach jedem Zug", () => {
  render(<GameBoard />);
  const cells = screen.getAllByRole("button");
  const statusElement = screen.getByText(/Aktueller Spieler: X/i);

  fireEvent.click(cells[0]); // 'X'
  expect(statusElement.textContent).toBe("Aktueller Spieler: O");

  fireEvent.click(cells[1]); // 'O'
  expect(statusElement.textContent).toBe("Aktueller Spieler: X");
});

test("Zelle kann nicht überschrieben werden", () => {
  render(<GameBoard />);
  const cells = screen.getAllByRole("button");

  fireEvent.click(cells[0]); // 'X'
  fireEvent.click(cells[0]); // Versuch, erneut zu klicken

  expect(cells[0]).toHaveTextContent("X"); // Wert bleibt 'X'
});

test("aktualisiert den Dokumenttitel beim Spielstart", () => {
  render(<GameBoard />);
  expect(document.title).toBe("Tic Tac Toe - Spieler X ist am Zug");
});

test("aktualisiert den Dokumenttitel, wenn ein Spieler gewinnt", () => {
  render(<GameBoard />);
  const cells = screen.getAllByRole("button");

  // Simuliere einen Sieg für 'X'
  fireEvent.click(cells[0]); // X
  fireEvent.click(cells[3]); // O
  fireEvent.click(cells[1]); // X
  fireEvent.click(cells[4]); // O
  fireEvent.click(cells[2]); // X

  expect(document.title).toBe("Spieler X gewinnt!");
});

test("fokussiert die erste Zelle nach dem Zurücksetzen des Spielbretts", async () => {
  render(<GameBoard />);
  const cells = screen.getAllByRole("button");

  // Simuliere einen Sieg für 'X' und das Zurücksetzen des Brettes
  fireEvent.click(cells[0]); // X
  fireEvent.click(cells[3]); // O
  fireEvent.click(cells[1]); // X
  fireEvent.click(cells[4]); // O
  fireEvent.click(cells[2]); // X

  // Warte auf das automatische Zurücksetzen
  await waitFor(
    () => {
      expect(document.activeElement).toBe(cells[0]);
    },
    { timeout: 2500 }
  );
});
