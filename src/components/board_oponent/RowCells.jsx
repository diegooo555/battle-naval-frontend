import React from "react";
import Cell from "./Cell";
import { ARR_COORDS_Y } from "../../lib/constants.js";

function RowCells({row}) {
  return (
    <div className="grid grid-cols-11 h-full w-full">
      <div className="bg-[#534C4C] w-full h-full flex items-center justify-center text-white text-xl font-bold">{ARR_COORDS_Y[row]}</div>  
      <Cell row={row} col={0}/>
      <Cell row={row} col={1}/>
      <Cell row={row} col={2}/>
      <Cell row={row} col={3}/>
      <Cell row={row} col={4}/>
      <Cell row={row} col={5}/>
      <Cell row={row} col={6}/>
      <Cell row={row} col={7}/>
      <Cell row={row} col={8}/>
      <Cell row={row} col={9}/>
    </div>
  );
}

export default RowCells;
