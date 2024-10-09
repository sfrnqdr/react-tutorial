// src/Cell.tsx
type CellProps = {
  value: string;
  onClick: () => void;
};

const Cell = ({ value, onClick }: CellProps) => {
  return (
    <div className="cell" role="button" onClick={onClick}>
      {value}
    </div>
  );
};

export default Cell;
