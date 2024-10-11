// src/components/GameStatus/GameStatus.test.tsx
import { render } from "@testing-library/react";
import GameStatus from "./GameStatus";
import { vi } from "vitest";

describe("GameStatus Komponente", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("zeigt den aktuellen Spieler an, wenn kein Gewinner", () => {
    const { getByText } = render(<GameStatus currentPlayer="X" winner="" />);
    expect(getByText("Spieler X ist am Zug")).toBeInTheDocument();
  });

  it("zeigt die Gewinnernachricht an, wenn es einen Gewinner gibt", () => {
    const { getByText } = render(<GameStatus currentPlayer="X" winner="O" />);
    expect(getByText("🎉 Spieler O hat gewonnen!")).toBeInTheDocument();
  });

  it("zeigt eine Unentschieden-Nachricht an, wenn das Spiel unentschieden endet", () => {
    const { getByText } = render(
      <GameStatus currentPlayer="X" winner="draw" />
    );
    expect(getByText("Das Spiel endet unentschieden!")).toBeInTheDocument();
  });

  it("rendert nicht neu, wenn sich die Props nicht ändern", () => {
    const consoleSpy = vi.spyOn(console, "log");
    const { rerender } = render(<GameStatus currentPlayer="X" winner="" />);
    expect(consoleSpy).toHaveBeenCalledWith("Rendering GameStatus");
    consoleSpy.mockClear();

    // Erneutes Rendern mit gleichen Props
    rerender(<GameStatus currentPlayer="X" winner="" />);
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it("rendert neu, wenn sich die Props ändern", () => {
    const consoleSpy = vi.spyOn(console, "log");
    const { rerender } = render(<GameStatus currentPlayer="X" winner="" />);
    expect(consoleSpy).toHaveBeenCalledWith("Rendering GameStatus");
    consoleSpy.mockClear();

    // Erneutes Rendern mit geänderten Props
    rerender(<GameStatus currentPlayer="O" winner="" />);
    expect(consoleSpy).toHaveBeenCalledWith("Rendering GameStatus");
  });
});
