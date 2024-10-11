// src/components/Cell/Cell.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
import Cell from "./Cell";
import { describe, it, expect, vi } from "vitest";

describe("Cell Komponente", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("rendert nicht neu, wenn sich die Props nicht ändern", () => {
    const consoleSpy = vi.spyOn(console, "log");
    const handleClick = () => {};
    const { rerender } = render(<Cell value="X" onClick={handleClick} />);
    expect(consoleSpy).toHaveBeenCalledWith("Rendering Cell: X");
    consoleSpy.mockClear();

    // Erneutes Rendern mit gleichen Props
    rerender(<Cell value="X" onClick={handleClick} />);
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it("rendert neu, wenn sich die Props ändern", () => {
    const consoleSpy = vi.spyOn(console, "log");
    const handleClick = () => {};
    const { rerender } = render(<Cell value="X" onClick={handleClick} />);
    expect(consoleSpy).toHaveBeenCalledWith("Rendering Cell: X");
    consoleSpy.mockClear();

    // Erneutes Rendern mit geänderten Props
    rerender(<Cell value="O" onClick={handleClick} />);
    expect(consoleSpy).toHaveBeenCalledWith("Rendering Cell: O");
  });

  it("zeigt den initialen Wert an", () => {
    render(<Cell value="" />);
    const cellElement = screen.getByRole("button");
    expect(cellElement).toHaveTextContent("");
  });

  it('ändert den Wert auf "X" bei Klick, wenn leer', () => {
    const TestCell = () => {
      const [value, setValue] = useState("");
      return <Cell value={value} onClick={() => setValue("X")} />;
    };

    render(<TestCell />);
    const cellElement = screen.getByRole("button");
    fireEvent.click(cellElement);
    expect(cellElement).toHaveTextContent("X");
  });

  it("ändert den Wert nicht, wenn bereits gesetzt", () => {
    render(<Cell value="O" />);
    const cellElement = screen.getByRole("button");
    fireEvent.click(cellElement);
    expect(cellElement).toHaveTextContent("O");
  });
});

test("rendert die Zelle korrekt", () => {
  render(<Cell value="X" onClick={() => {}} />);
  const cellElement = screen.getByText("X");
  expect(cellElement).toBeInTheDocument();
});
