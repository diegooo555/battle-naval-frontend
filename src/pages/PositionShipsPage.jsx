import React, { useState, useEffect } from "react";
import BoardShips from "../components/position_board/BoardShips";
import DroppableCell from "../components/position_board/DroppableCell";
import ArrCoordsX from "../components/position_board/ArrCoordsX";
import Profile from "../components/position_board/Profile";
import Waiting from "../components/Waiting";
import { useParams } from "react-router";
import { DndContext } from "@dnd-kit/core";
import { GRID_COLS, ARR_COORDS_Y, initialStateCells} from "../lib/constants.js";
import {isOccupiedCell, handleRotate, verifyPosition} from "../lib/logic.js";
import { useWebSocket } from "../context/useWebSocket.js";

export default function PositionShipsPage() {
  const {gameId,playerId,username} = useParams();
  const [selectedBox, setSelectedBox] = useState(null);
  const [occupiedCells, setOccupiedCells] = useState(initialStateCells);


  const { stompClient, connect, disconnect, sendMessage, resultServer, setResultServer } = useWebSocket();

  const handleDragEnd = (event) => {
    const { over } = event;
    if (over && over.id.startsWith("cell-")) {
      const [, row, col] = over.id.split("-").map(Number);
      
      if(occupiedCells[selectedBox].isRotated){
        if(!verifyPosition(row, col, row + occupiedCells[selectedBox].size - 1, true, occupiedCells, selectedBox))return;
        if (row > GRID_COLS - occupiedCells[selectedBox].size) return;
      }else{
        if(!verifyPosition(row, col, col +occupiedCells[selectedBox].size - 1, false, occupiedCells, selectedBox))return;
        if (col > GRID_COLS - occupiedCells[selectedBox].size)return;
      }
      setOccupiedCells(prev =>
        prev.map((cell, index) =>
          index === selectedBox ? { ...cell, row, col }: cell
        )
      );
    }
  };

  const handleReady = () => {

    const ships = occupiedCells.map(cell => {
      return{
          idShip: cell.id,
          size: cell.size,
          isRotated: cell.isRotated,
          position: {
            x: cell.row,
            y: cell.col
          },
          isSunk: false
      }
    });

    console.log(ships);
    const objectGameUpdate = {
      gameId,
      playerId,
      ships
    };
    sendMessage(stompClient, objectGameUpdate, "finish-positioning");
  }

  const handleReset = () => {setOccupiedCells(initialStateCells)};

  useEffect(() => {
    const startGame = async () => {
      try {
        await connect(stompClient, username, gameId, setResultServer);
        const player = {name: username, gameId}
        console.log(player)
        console.log("Ejecutando el carenalga")
        sendMessage(stompClient, player, "play");
      } catch (error) {
        console.error("❌ Error al conectar:", error);
      }
    }
    startGame();
    return () => {
      disconnect(stompClient);
    }
  }, [connect, disconnect, gameId, sendMessage, setResultServer, stompClient, username]);

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={(event) => {const { active } = event; setSelectedBox(active.id);}}>
      { resultServer === "Waiting" ? <Waiting/> :  
      (<div className="flex h-screen bg-[#EBE8DB]">
        <div className="w-1/2 flex flex-col justify-around items-center">
          <Profile namePlayer={username} resultServer={resultServer}/>
          <div className="grid grid-cols-11">
            <ArrCoordsX/>
            {Array.from({ length: 10 }).map((_, row) =>{
              return(
                <React.Fragment key={row}>
                  <div className="w-10 h-10 flex items-center justify-center font-bold text-xl select-none bg-[#534C4C] text-white" key={row}>
                    {ARR_COORDS_Y[row]}
                  </div>

                    {Array.from({ length: GRID_COLS}).map((_, col) => {
                    const { isOccupied, isContained, size, idDragBox } = isOccupiedCell(row, col, occupiedCells);
                    return (
                      <DroppableCell key={`${row}-${col}`} row={row} col={col} isOccupied={isOccupied} isContained={isContained} size={size} idDragBox={idDragBox} isRotated={occupiedCells[idDragBox]?.isRotated}/>
                    );
                    })}
              </React.Fragment>
              )})}
          </div>
          
          <div className="flex justify-around gap-10">
            <button onClick={() => handleRotate(selectedBox, occupiedCells, setOccupiedCells)} className="select-none bg-[#1278AB] text-white text-xl rounded-md px-5 py-1 font-itim">Rotar</button>
            <button onClick={handleReset} className="select-none bg-[#178911] text-white text-xl rounded-md px-5 py-1 font-itim">Reiniciar</button>
          </div>
          
        </div>
        <BoardShips occupiedCells={occupiedCells} handleReady={handleReady} />
      </div>)}
    </DndContext>
  );
}