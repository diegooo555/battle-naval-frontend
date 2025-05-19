import React, { useContext } from "react";
import BoardPlayerContext from "../../context/BoardPlayerContext";

function CellPlayer({ row, col }) {
  const stateCell = useContext(BoardPlayerContext)?.arrayCells[row][col];
  return (
    <div
      className={`w-full h-full flex 
      items-center justify-center
      ${stateCell.isOccupied ? 'bg-[#416BBF]' : 'bg-[#ACD1DB]'}
      cursor-pointer border border-solid border-black`}
    >
      <span
        className={`${stateCell.isShot && stateCell.isOccupied ? 'text-[#FF0000]' : 'text-[#1500FF]'} text-2xl font-bold`}
      >
        {stateCell.isShot && stateCell.isOccupied ? 'X' : stateCell.isShot ? 'O' : ''}
      </span>
    </div>
  );
}

export default CellPlayer;
