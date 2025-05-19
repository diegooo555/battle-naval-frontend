import React from "react";
import CellPlayer from "./CellPlayer";
import { ARR_COORDS_Y } from "../../lib/constants.js";

function RowCellsPlayer({row}) {
  return (
    <div className="grid grid-cols-11 h-full w-full">
      <div className="bg-[#534C4C] w-full h-full flex items-center justify-center text-white text-xl font-bold">{ARR_COORDS_Y[row]}</div>  
      <CellPlayer row={row} col={0}/>
      <CellPlayer row={row} col={1}/>
      <CellPlayer row={row} col={2}/>
      <CellPlayer row={row} col={3}/>
      <CellPlayer row={row} col={4}/>
      <CellPlayer row={row} col={5}/>
      <CellPlayer row={row} col={6}/>
      <CellPlayer row={row} col={7}/>
      <CellPlayer row={row} col={8}/>
      <CellPlayer row={row} col={9}/>
    </div>
  );
}

export default RowCellsPlayer;