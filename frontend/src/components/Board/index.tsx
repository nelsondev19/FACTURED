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
    const taskId = e.dataTransfer.getData("task_id");

    const task = document.getElementById(taskId) as HTMLElement;

    task.style.display = "block";

    const firstChild = e.currentTarget.firstChild;

    e.currentTarget.insertBefore(task, firstChild);

    setTimeout(async () => {
      if (TaskSelected !== null) {
        try {
          const TaskSelectedCopy = TaskSelected;

          TaskSelectedCopy.board_id = board.id;

          const res = await (
            await fetch(`${VITE_BOARD_API}/tasks/update`, {
              method: "PUT",
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
    }, 300);
  };

  if (Loading) {
    return <div className="board" />;
  }

  return (
    <div>
      <h3 className="text-center">{board.name}</h3>
      <div
        className="board"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
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
      </div>
    </div>
  );
}

export default Board;
