import { ReactNode } from "react";

interface Props {
  id: string;
  children: ReactNode;
}
function Task({ id, children }: Props) {
  return (
    <div
      id={id}
      draggable={true}
      onDragStart={(e) => {
        const target = e.currentTarget;

        e.dataTransfer.setData("task_id", target.id);

        setTimeout(() => {
          target.style.display = "none";
        }, 0);
      }}
      onDragOver={(e) => e.stopPropagation()}
      style={{
        padding: "10px",
        border: "1px solid black",
        borderRadius: "5px",
        backgroundColor: "white",
        cursor: "move",
        marginBottom: "20px",
      }}
    >
      {children}
    </div>
  );
}

export default Task;
