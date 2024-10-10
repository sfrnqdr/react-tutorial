// src/api/api.test.ts
import { vi } from "vitest";

// Mocking von axios vor dem Import des zu testenden Moduls
vi.mock("axios");

import axios from "axios";
import { saveGameResult, fetchGameResults } from "./api";

describe("API Integration", () => {
  test("sollte Spielergebnis erfolgreich speichern", async () => {
    const mockResult = { winner: "X", timestamp: "2023-10-01T12:00:00Z" };
    (axios.post as unknown as jest.Mock).mockResolvedValue({
      data: mockResult,
    });

    const result = await saveGameResult(mockResult);
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:5010/api/results",
      mockResult
    );
    expect(result).toEqual(mockResult);
  });

  test("sollte Fehler beim Speichern des Spielergebnisses behandeln", async () => {
    const mockResult = { winner: "O", timestamp: "2023-10-01T12:05:00Z" };
    (axios.post as unknown as jest.Mock).mockRejectedValue(
      new Error("Netzwerkfehler")
    );

    await expect(saveGameResult(mockResult)).rejects.toThrow("Netzwerkfehler");
  });

  test("sollte Spielresultate erfolgreich abrufen", async () => {
    const mockResults = [
      { winner: "X", timestamp: "2023-10-01T12:00:00Z" },
      { winner: "O", timestamp: "2023-10-01T12:05:00Z" },
    ];
    (axios.get as unknown as jest.Mock).mockResolvedValue({
      data: mockResults,
    });

    const results = await fetchGameResults();
    expect(axios.get).toHaveBeenCalledWith("http://localhost:5010/api/results");
    expect(results).toEqual(mockResults);
  });

  test("sollte Fehler beim Abrufen der Spielresultate behandeln", async () => {
    (axios.get as unknown as jest.Mock).mockRejectedValue(
      new Error("Serverfehler")
    );

    await expect(fetchGameResults()).rejects.toThrow("Serverfehler");
  });
});
