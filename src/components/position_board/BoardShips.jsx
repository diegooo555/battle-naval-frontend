import React from "react";
import DraggableBox from "./DraggableBox";

const nameShips = ["Acorazado", "Destructor", "Cruzero", "Submarino", "Navio"];

const BoardShips = ({ occupiedCells, handleReady }) => {

  return (
    <div className="w-1/2 flex flex-col justify-center items-center pt-8 gap-4">
      <div className="flex gap-2 flex-wrap bg-[#534C4C] w-[60%] h-[80%] flex-col items-center ">
        <h2 className="text-white text-2xl font-bold p-5 font-itim">TU FLOTA</h2>
        {occupiedCells.map(
          (cell, index) =>
            cell.col === null &&
            cell.row === null && (
              <React.Fragment key={index}>
                <DraggableBox id={cell.id} size={cell.size}/>
                <span className="text-white text-xl font-bold font-itim">{nameShips[index]}</span>
              </React.Fragment>
            )
        )}
      </div>
      <button className="bg-[#EC221F] select-none text-white text-xl rounded-md px-5 py-1 font-itim" onClick={handleReady}>Listo</button>
    </div>
  );
};

export default BoardShips;
