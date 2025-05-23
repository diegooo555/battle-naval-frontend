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
          : " hover:bg-blue-400"
      } ${stateCell.isSunk ? 'bg-[#416BBF]':'bg-[#ACD1DB]'}`}
      onClick={() => {
          contextCell.setStateSelectCell({
            row: row,
            col:col
          });
      }}
    >
      <span
        className={`${stateCell.state == 'X' ? 'text-[#FF0000]' : 'text-[#1500FF]'} text-2xl font-bold`}
      >
        {stateCell.state}
      </span>
    </button>
  );
}

export default Cell;
