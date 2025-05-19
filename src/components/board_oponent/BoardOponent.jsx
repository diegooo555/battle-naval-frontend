import { useState, useEffect } from "react";
import RowCells from "./RowCells";
import RowNumbers from "../RowNumbers";
import SelectCellContext from "../../context/SelectCellContext";
import BoardOponentContext from "../../context/BoardOponentContext";

const BoardOponent = ({sendShot, players, playerId}) => {
  const [stateSelectCell, setStateSelectCell] = useState();

  const [boardOponent, setBoardOponent] = useState(
    Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ""))
  );

  const player = players.find(player => player.playerId != playerId);

  const updateBoardOponent = (row, col, newValue) => {
    const newBoard = [...boardOponent];
    newBoard[row] = [...newBoard[row]];
    newBoard[row][col] = newValue;
    setBoardOponent(newBoard);
    setStateSelectCell(null)
  };

  useEffect(() => {
    const showAllShots = () => {
      const shots = player?.board.shots || [];
  
      const newBoard = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ""));
  
      shots.forEach(shot => {
        const { x, y } = shot.position;
        const result = shot.result;
        if (result === "FAIL") {
          newBoard[x][y] = "O";
        } else if (result === "HIT") {
          newBoard[x][y] = "X";
        }
      });
  
      setBoardOponent(newBoard); // Se actualiza el tablero completo una sola vez
    };
  
    showAllShots();
  }, [player?.board.shots]);
  
  return (
    <div className="w-[50%] h-full flex flex-col items-center justify-center gap-5">
        <div className="w-[450px] h-[450px] grid grid-rows-11">
            <RowNumbers/>
            <BoardOponentContext.Provider value={{boardOponent, updateBoardOponent}}>
            <SelectCellContext.Provider value={{stateSelectCell, setStateSelectCell}}>
              <RowCells row={0}/>
              <RowCells row={1}/>
              <RowCells row={2}/>
              <RowCells row={3}/>
              <RowCells row={4}/>
              <RowCells row={5}/>
              <RowCells row={6}/>
              <RowCells row={7}/>
              <RowCells row={8}/>
              <RowCells row={9}/>
            </SelectCellContext.Provider>
            </BoardOponentContext.Provider>
        </div>

        <button className="bg-[#178911] p-2 rounded-xl text-white font-bold text-xl hover:bg-[#1D5016] cursor-pointer"
        onClick={ () => sendShot(stateSelectCell.row, stateSelectCell.col)}>
          Atacar
        </button>
    </div>
  )
}

export default BoardOponent