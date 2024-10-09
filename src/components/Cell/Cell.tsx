// src/Cell.tsx
import { useState } from "react";

type CellProps = {
  value: string;
};

const Cell = ({ value }: CellProps) => {
  const [cellValue, setCellValue] = useState(value);

  const handleClick = () => {
    if (cellValue === "") {
      setCellValue("X");
    }
  };

  return (
    <div className="cell" role="button" onClick={handleClick}>
      {cellValue}
    </div>
  );
};

export default Cell;
