// src/hooks/useGameLogic.test.ts
import { renderHook, act } from "@testing-library/react";
import useGameLogic from "./useGameLogic";

describe("useGameLogic Hook", () => {
  test("initialisiert die Zustände korrekt", () => {
    const { result } = renderHook(() => useGameLogic());

    expect(result.current.cells).toEqual(["", "", "", "", "", "", "", "", ""]);
    expect(result.current.currentPlayer).toBe("X");
    expect(result.current.winner).toBe("");
    expect(result.current.score).toEqual({ X: 0, O: 0 });
  });

  test("fügt einen Zug hinzu und wechselt den Spieler", () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.handleCellClick(0);
    });

    expect(result.current.cells[0]).toBe("X");
    expect(result.current.currentPlayer).toBe("O");
    expect(result.current.winner).toBe("");
  });

  test("ermittelt den Gewinner korrekt", () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.handleCellClick(0); // X
    });
    act(() => {
      result.current.handleCellClick(3); // O
    });
    act(() => {
      result.current.handleCellClick(1); // X
    });
    act(() => {
      result.current.handleCellClick(4); // O
    });
    act(() => {
      result.current.handleCellClick(2); // X
    });

    expect(result.current.winner).toBe("X");
    expect(result.current.score).toEqual({ X: 1, O: 0 });
  });

  test("kann das Spielbrett zurücksetzen", () => {
    const { result } = renderHook(() => useGameLogic());

    // Player X makes a move at cell 0
    act(() => {
      result.current.handleCellClick(0); // X
    });

    // Player O makes a move at cell 1
    act(() => {
      result.current.handleCellClick(1); // O
    });

    // Reset the game board
    act(() => {
      result.current.resetBoard();
    });

    // Assertions after reset
    expect(result.current.cells).toEqual(["", "", "", "", "", "", "", "", ""]);
    expect(result.current.currentPlayer).toBe("X");
    expect(result.current.winner).toBe("");
    expect(result.current.score).toEqual({ X: 0, O: 0 });
  });
});
