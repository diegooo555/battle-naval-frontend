import React, { useContext } from "react";
import SelectCellContext from "../../context/SelectCellContext";
import BoardOponentContext from "../../context/BoardOponentContext";

function Cell({ row, col }) {
  const contextCell = useContext(SelectCellContext);
  const stateCell = useContext(BoardOponentContext)?.boardOponent[row][col];
  return (
    <button
      className={`w-full h-full flex 
      items-center justify-center
      border border-solid  border-black  
      cursor-pointer ${
        contextCell?.stateSelectCell?.row == row && contextCell?.stateSelectCell?.col == col
          ? "bg-green-300"
          : "bg-[#ACD1DB] hover:bg-blue-400"
      }`}
      onClick={() => {
          contextCell.setStateSelectCell({
            row: row,
            col:col
          });
      }}
    >
      <span
        className={`${stateCell == 'X' ? 'text-[#FF0000]' : 'text-[#1500FF]'} text-2xl font-bold`}
      >
        {stateCell}
      </span>
    </button>
  );
}

export default Cell;
