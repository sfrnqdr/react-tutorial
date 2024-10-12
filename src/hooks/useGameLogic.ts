// src/hooks/useGameLogic.ts
import { useState, useEffect } from "react";
import { saveGameResult, fetchGameResults } from "../api/api";

type Score = {
  X: number;
  O: number;
};

const useGameLogic = () => {
  const [cells, setCells] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<string>("X");
  const [winner, setWinner] = useState<string>("");
  const [score, setScore] = useState<Score>({ X: 0, O: 0 });
  const [gameResults, setGameResults] = useState<
    { winner: string; timestamp: string }[]
  >([]);

  const winningCombinations: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        updatedCells[a] &&
        updatedCells[a] === updatedCells[b] &&
        updatedCells[a] === updatedCells[c]
      ) {
        return updatedCells[a];
      }
    }
    return "";
  };

  const handleCellClick = async (index: number) => {
    setCells((prevCells) => {
      if (prevCells[index] !== "" || winner !== "") {
        return prevCells;
      }

      const newCells = [...prevCells];
      newCells[index] = currentPlayer;
      setCells(newCells);

      const gameWinner = checkWinner(newCells);
      if (gameWinner) {
        setWinner(gameWinner);
        setScore((prevScore) => ({
          ...prevScore,
          [gameWinner]: prevScore[gameWinner] + 1,
        }));
        const result = {
          winner: gameWinner,
          timestamp: new Date().toISOString(),
        };
        saveGameResult(result); // Speichere das Ergebnis in der API
        setTimeout(resetBoard, 2000);
      } else {
        setCurrentPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
      }

      return newCells;
    });
  };

  const loadGameResults = async () => {
    const results = await fetchGameResults();
    setGameResults(results);
  };

  useEffect(() => {
    loadGameResults();
  }, []);

  return {
    cells,
    currentPlayer,
    winner,
    handleCellClick,
    resetBoard,
    gameResults,
  };
};

export default useGameLogic;
