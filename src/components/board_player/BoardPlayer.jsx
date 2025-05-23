import React from "react";
import RowCellsPlayer from "./RowCellsPlayer";
import RowNumbers from "../RowNumbers";
import BoardPlayerContext from "../../context/BoardPlayerContext";

const BoardPlayer = ({players = [], playerId}) => {  
  const player = players.find(player => player.playerId === playerId);
  const ships = player?.board.ships || []
  const shots = player?.board.shots || [];

  const arrayCells = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => ({
      isShot: false,
      isOccupied: false,
    }))
  );
  
  for (let index = 0; index < ships.length; index++) {
    const actualShip = ships[index];
    if(actualShip.rotated){
      for (let index = 0; index < actualShip.size; index++) {
        const x = actualShip.position.x + index;
        const y = actualShip.position.y;
        arrayCells[x][y].isOccupied = true;
      }
    }else{
      for (let index = 0; index < actualShip.size; index++) {
        const x = actualShip.position.x;
        const y = actualShip.position.y + index;
        arrayCells[x][y].isOccupied = true;
      }
    }
  }
  
  for (let index = 0; index < shots.length; index++) {
    const actualShot = shots[index];
    arrayCells[actualShot.position.x][actualShot.position.y].isShot = true;
    
  }

  return (
    <div className="w-[50%] h-full flex flex-col items-center justify-center gap-5">
        <div className="w-[450px] h-[450px] grid grid-rows-11">
          <RowNumbers/>
          <BoardPlayerContext.Provider value={{arrayCells}}>
            <RowCellsPlayer row={0}/>
            <RowCellsPlayer row={1}/>
            <RowCellsPlayer row={2}/>
            <RowCellsPlayer row={3}/>
            <RowCellsPlayer row={4}/>
            <RowCellsPlayer row={5}/>
            <RowCellsPlayer row={6}/>
            <RowCellsPlayer row={7}/>
            <RowCellsPlayer row={8}/>
            <RowCellsPlayer row={9}/>
          </BoardPlayerContext.Provider>
        </div>
        <button className="bg-[#FF0000] hover:bg-[#C00F0C] p-2 rounded-xl text-white font-bold text-xl cursor-pointer">Rendirse</button>
    </div>
  )
}

export default BoardPlayer;