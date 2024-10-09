// src/Cell.tsx
import React from "react";

type CellProps = {
  value: string;
  onClick: () => void;
};

const Cell = React.memo(({ value, onClick }: CellProps) => {
  return (
    <div className="cell" role="button" onClick={onClick}>
      {value}
    </div>
  );
});

export default Cell;
