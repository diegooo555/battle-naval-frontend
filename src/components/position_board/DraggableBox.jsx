import { useDraggable } from "@dnd-kit/core";

function DraggableBox({id, size, isRotated}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    width: isRotated ? 40 : 40*size, // 2 * 60
    height: isRotated ? 40*size : 40,
    border: "1px solid #ccc",
    cursor: "grab",
    display: "flex",
    flexDirection: isRotated ? "column" : "row",
    alignItems: "center",
    justifyContent: "center",
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    zIndex: 50,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {Array.from({length: size}).map((_, index) => (
        <Square key={index}/>
      ))}
    </div>
  );
}

const Square = () => {
  return (
    <div className="w-[40px] h-[40px] bg-[#416BBF] border border-white"/>
  );
};

export default DraggableBox;