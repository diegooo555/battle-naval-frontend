const GRID_COLS = 10;
const ARR_SIZE_SHIPS = [5, 4, 3, 3, 2];
const ARR_COORDS_X = [" ", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const ARR_COORDS_Y = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const initialStateCells = Array.from({ length: 5 }).map((_, index) => ({
  row: null,
  col: null,
  id: index,
  size: ARR_SIZE_SHIPS[index],
  isRotated: false,
}));

const POSIOTIONING = "POSIOTIONING";
const WAITING_PLAYERS = "WAITING_PLAYERS";
const IN_PROGRESS = "IN_PROGRESS";
const FINISHED = "FINISHED";

export { GRID_COLS, ARR_SIZE_SHIPS, ARR_COORDS_X, ARR_COORDS_Y, initialStateCells, POSIOTIONING, WAITING_PLAYERS, IN_PROGRESS};
