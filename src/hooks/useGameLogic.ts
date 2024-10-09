// src/hooks/useGameLogic.ts
import { useState } from "react";

type Score = {
  X: number;
  O: number;
};

const useGameLogic = () => {
  const [cells, setCells] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<string>("X");
  const [winner, setWinner] = useState<string>("");
  const [score, setScore] = useState<Score>({ X: 0, O: 0 });

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

  const checkWinner = (updatedCells: string[]): string => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
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

  const resetBoard = () => {
    setCells(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner("");
  };

  const handleCellClick = (index: number) => {
    setCells((prevCells) => {
      // Prevent overwriting a non-empty cell or if there's already a winner
      if (prevCells[index] !== "" || winner !== "") {
        return prevCells;
      }

      const newCells = [...prevCells];
      newCells[index] = currentPlayer;
      const gameWinner = checkWinner(newCells);

      if (gameWinner) {
        setWinner(gameWinner);
        setScore((prevScore) => ({
          ...prevScore,
          [gameWinner]: prevScore[gameWinner] + 1,
        }));
        // Optional: Automatically reset the board after a delay
        setTimeout(resetBoard, 2000);
      } else {
        setCurrentPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
      }

      return newCells;
    });
  };

  return {
    cells,
    currentPlayer,
    winner,
    score,
    handleCellClick,
    resetBoard,
  };
};

export default useGameLogic;
