// src/GameResults.test.tsx

import { render, screen } from "@testing-library/react";
import GameResults from "./GameResults";
import { test, expect } from "vitest";

test("zeigt keine Ergebnisse an, wenn keine vorhanden sind", () => {
  render(<GameResults results={[]} />);
  const header = screen.getByText(/Frühere Spiele/i);
  expect(header).toBeInTheDocument();
  const listItems = screen.queryAllByRole("listitem");
  expect(listItems.length).toBe(0);
});

test("zeigt eine Liste von Spielergebnissen an", () => {
  const mockResults = [
    { winner: "X", timestamp: "2023-10-01T12:00:00Z" },
    { winner: "O", timestamp: "2023-10-01T12:05:00Z" },
  ];
  render(<GameResults results={mockResults} />);
  const listItems = screen.getAllByRole("listitem");
  expect(listItems.length).toBe(2);

  // **Korrigierte erwartete Texte**
  expect(listItems[0]).toHaveTextContent("Spieler X gewann am");
  expect(listItems[1]).toHaveTextContent("Spieler O gewann am");
});
