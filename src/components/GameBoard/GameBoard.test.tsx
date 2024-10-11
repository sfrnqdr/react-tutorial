// src/GameBoard.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import GameBoard from "./GameBoard";
import { describe, it, expect } from "vitest";

test("zeigt keine Siegesnachricht an, wenn das Spiel beginnt", () => {
  render(<GameBoard />);
  const winnerMessage = screen.queryByText(/Spieler .* hat gewonnen!/i);
  expect(winnerMessage).toBeNull();
});

describe("GameBoard Component", () => {
  it("Wechselt den Spieler nach jedem Zug", () => {
    render(<GameBoard />);
    const cells = screen.getAllByRole("button");

    // Spieler X klickt auf das erste Feld
    fireEvent.click(cells[0]);
    expect(cells[0]).toHaveTextContent("X");

    // Überprüfe, ob Spieler O an der Reihe ist
    expect(screen.getByText("Spieler O ist am Zug")).toBeInTheDocument();

    // Spieler O klickt auf das zweite Feld
    fireEvent.click(cells[1]);
    expect(cells[1]).toHaveTextContent("O");

    // Überprüfe, ob Spieler X an der Reihe ist
    expect(screen.getByText("Spieler X ist am Zug")).toBeInTheDocument();
  });

  it("Erkennt den Gewinner korrekt", () => {
    render(<GameBoard />);
    const cells = screen.getAllByRole("button");

    // Simuliere eine Gewinnsituation für Spieler X
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[3]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[2]); // X

    expect(screen.getByText("🎉 Spieler X hat gewonnen!")).toBeInTheDocument();
  });

  it("Erkennt ein Unentschieden korrekt", () => {
    render(<GameBoard />);
    const cells = screen.getAllByRole("button");

    // Simuliere ein Unentschieden
    const drawMoves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
    drawMoves.forEach((index) => {
      fireEvent.click(cells[index]);
    });

    expect(
      screen.getByText("Das Spiel endet unentschieden!")
    ).toBeInTheDocument();
  });
});
