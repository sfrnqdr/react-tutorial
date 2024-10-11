import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import App from "./App";

test("rendert die Startseite bei '/'", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Willkommen bei Tic Tac Toe/i)).toBeInTheDocument();
});

test("rendert das Spielbrett bei '/game'", () => {
  render(
    <MemoryRouter initialEntries={["/game"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
});

test("rendert die Ergebnisseite bei '/results'", () => {
  render(
    <MemoryRouter initialEntries={["/results"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Frühere Spiele/i)).toBeInTheDocument();
});
