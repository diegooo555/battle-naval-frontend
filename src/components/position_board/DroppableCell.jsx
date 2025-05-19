import { useDroppable } from "@dnd-kit/core";
import DraggableBox from "./DraggableBox";

function DroppableCell({ row, col, isOccupied, isContained, size, idDragBox = null, isRotated}) {
  const id = `cell-${row}-${col}`;
  const { isOver, setNodeRef } = useDroppable({ id});

  return (
    <div
      ref={setNodeRef}
      style={{
        width: 40,
        height: 40,
        border: "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isOver ? "#178911" : "#ACD1DB",
        position: "relative",
      }}
    >
      {isContained && idDragBox != null && (
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 10 }}>
          <DraggableBox id={idDragBox} size={size} isRotated={isRotated}/>
        </div>
      )}
    </div>
  );
};

export default DroppableCell;