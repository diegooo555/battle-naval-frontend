import React, { useState, useEffect, useRef } from "react";
import BoardShips from "./BoardShips";
import DroppableCell from "./DroppableCell";
import ArrCoordsX from "./ArrCoordsX";
import Profile from "./Profile.jsx";
import Waiting from "../Waiting";
import { useParams } from "react-router";
import { DndContext } from "@dnd-kit/core";
import { GRID_COLS, ARR_COORDS_Y, initialStateCells } from "../../lib/constants.js";
import {isOccupiedCell, handleRotate, verifyPosition} from "../../lib/logic.js";
import { connect, disconnect, sendMessage } from "../../lib/websocket.js";


export default function DragDropTable() {
  const {id} = useParams();
  const {username} = useParams();
  const [selectedBox, setSelectedBox] = useState(null);
  const [occupiedCells, setOccupiedCells] = useState(initialStateCells);
  const [resultServer, setResultServer] = useState("Waiting");
  const stompClient = useRef(null);

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

  const handleReset = () => {setOccupiedCells(initialStateCells)};

  const startGame = async () => {
    try {
      await connect(stompClient, username, id, setResultServer);
      sendMessage(stompClient, username);
    } catch (error) {
      console.error("❌ Error al conectar:", error);
    }
  }

  useEffect(() => {
    startGame();    
    return () => {
      disconnect(stompClient);
    }
  }, [])

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={(event) => {const { active } = event; setSelectedBox(active.id);}}>
      { resultServer === "Waiting" ? <Waiting/> :  
      (<div className="flex h-screen bg-[#EBE8DB]">
        <div className="w-1/2 flex flex-col justify-around items-center">
          <Profile namePlayer={username}/>
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
        <BoardShips occupiedCells={occupiedCells} />
      </div>)}
    </DndContext>
  );
}