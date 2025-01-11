// ENVS
import { VITE_BOARD_API } from "../../envs";

// TYPES
import { DragEvent } from "react";
import { BoardType, TaskType } from "../../types";

// HOOKS
import { useEffect, useState } from "react";

// COMPONENTS
import Task from "../Task";

interface Props {
  board: BoardType;
  TaskSelected: TaskType | null;
  setTaskSelected: React.Dispatch<React.SetStateAction<TaskType | null>>;
}

function Board({ board, TaskSelected, setTaskSelected }: Props) {
  const [Loading, setLoading] = useState(true);

  const [Tasks, setTasks] = useState<Array<TaskType>>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await (
          await fetch(`${VITE_BOARD_API}/tasks/board/${board.id}`)
        ).json();

        if (Array.isArray(res)) {
          setTasks(res);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [board.id]);

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    const task_id = e.dataTransfer.getData("task_id");

    const task = document.getElementById(task_id) as HTMLElement;
    task.style.display = "block";

    e.currentTarget.appendChild(task);

    if (TaskSelected !== null) {
      try {
        const TaskSelectedCopy = TaskSelected;

        TaskSelectedCopy.board_id = board.id;
        const res = await (
          await fetch(`${VITE_BOARD_API}/tasks/update`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(TaskSelectedCopy),
          })
        ).json();

        if (res.message === "success") {
          console.log("Task updated! ID ->", task.id);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div
      id={`${board.id}`}
      className="board"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <h3 style={{ textAlign: "center" }}>{board.name}</h3>

      {Loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <>
          {Tasks.map((task) => {
            return (
              <Task
                key={task.id}
                task={task}
                TaskSelected={TaskSelected}
                setTaskSelected={setTaskSelected}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export default Board;
