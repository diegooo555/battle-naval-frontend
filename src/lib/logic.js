import { GRID_COLS } from "./constants.js";

export const isOccupiedCell = (r, c, occupiedCells) => {

    let isOccupied = false;
    let isContained = false;
    let size = 0;
    let idDragBox = null;

    occupiedCells.forEach(cell => {
      if(cell.isRotated){
        if(cell.col === c && cell.row <= r &&
          cell.row + cell.size > r) {
          isOccupied = true;
          size = cell.size;
          idDragBox = cell.id;
        }
      }else{
        if (
          cell.row === r && cell.col !== null &&
          cell.row !== null && cell.col <= c &&
          cell.col + cell.size > c) {
          isOccupied = true;
          size = cell.size;
          idDragBox = cell.id;
        }
      }
      if (cell.row === r && cell.col === c) {
        isContained = true;
      }
    });

    return { isOccupied, isContained, size, idDragBox };
  };

export const handleRotate = (id, occupiedCells, setOccupiedCells) => {
    const {row, col, size, isRotated} = occupiedCells[id];

    let verify;

    if (isRotated) {
      verify = verifyPosition(row, col, col + size - 1, false, occupiedCells, id);
    }else{
      verify = verifyPosition(row, col, row + size - 1, true, occupiedCells, id);
    }

    if (!verify) return;

    setOccupiedCells(prev =>
      prev.map(cell => {
        if(cell.id === id){
          if(cell.isRotated){
            return ((cell.col + cell.size) <= GRID_COLS  ? { ...cell, isRotated: !cell.isRotated } : cell);
          }else{
            return ((cell.row + cell.size) <= GRID_COLS  ? { ...cell, isRotated: !cell.isRotated } : cell)}
        }
        return cell;
      })
    );
};


export const verifyPosition = (row, col, maxPosition, isRotated, occupiedCells, index) => {
  const copyOccupiedCells = [...occupiedCells];
  copyOccupiedCells.splice(index, 1);
  let isVerified = true;
  if(isRotated){
    const arrPositions  = Array.from({length: maxPosition -row + 1}, (_, i) => row + i);
    arrPositions.forEach(position => {
      const { isOccupied } = isOccupiedCell(position, col, copyOccupiedCells);
      if(isOccupied) isVerified = false;
    });
  }else{
    const arrPositions  = Array.from({length: maxPosition -col + 1}, (_, i) => col + i);
    arrPositions.forEach(position => {
      const { isOccupied } = isOccupiedCell(row, position, copyOccupiedCells);
      if(isOccupied) isVerified = false;
    });
  }

  return isVerified;
}