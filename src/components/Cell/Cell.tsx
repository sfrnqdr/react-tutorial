// src/Cell.tsx
import React, { forwardRef } from "react";

type CellProps = {
  value: string;
  onClick: () => void;
};

const Cell = forwardRef<HTMLDivElement, CellProps>(
  ({ value, onClick }, ref) => {
    return (
      <div
        className="cell"
        role="button"
        onClick={onClick}
        tabIndex={0}
        ref={ref}
        onKeyPress={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClick();
          }
        }}
      >
        {value}
      </div>
    );
  }
);

export default React.memo(Cell);
