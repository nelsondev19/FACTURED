import { ReactNode } from "react";

interface Props {
  id: string;
  children: ReactNode;
}

function Board({ id, children }: Props) {
  return (
    <div
      id={id}
      onDrop={(e) => {
        const task_id = e.dataTransfer.getData("task_id");

        const task = document.getElementById(task_id) as HTMLElement;
        task.style.display = "block";

        console.log("BOARD ID ->", id, "TASK ID ->", task_id);

        e.currentTarget.appendChild(task);
      }}
      onDragOver={(e) => e.preventDefault()}
      style={{
        padding: "10px",
        border: "1px solid gray",
        borderRadius: "5px",
        height: "75dvh",
        width: "400px",
        backgroundColor: "lightgray",
      }}
    >
      {children}
    </div>
  );
}

export default Board;
