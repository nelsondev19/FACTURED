// ENVS
import { VITE_BOARD_API } from "../../envs";

// TYPES
import { TaskType } from "../../types";
import { DragEvent, ChangeEvent, useState } from "react";

interface Props {
  task: TaskType;
  TaskSelected: TaskType | null;
  setTaskSelected: React.Dispatch<React.SetStateAction<TaskType | null>>;
}
function Task({ task, TaskSelected, setTaskSelected }: Props) {
  const [CurrentStatus, setCurrentStatus] = useState(task.status);

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    const target = e.currentTarget;

    e.dataTransfer.setData("task_id", target.id);

    setTimeout(() => {
      target.style.display = "none";
    }, 0);

    setTaskSelected(task);
  };

  const changeStatus = async (e: ChangeEvent<HTMLSelectElement>) => {
    const status = e.currentTarget.value;

    if (TaskSelected !== null) {
      try {
        const TaskSelectedCopy = TaskSelected;

        TaskSelectedCopy.status = status;
        setCurrentStatus(status);
        const res = await (
          await fetch(`${VITE_BOARD_API}/tasks/update`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(TaskSelectedCopy),
          })
        ).json();

        console.log(res);

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
      id={`${task.id}`}
      className="task"
      draggable={true}
      onDragStart={handleDragStart}
      onDragOver={(e) => e.stopPropagation()}
    >
      <p>Name: {task.name}</p>
      <div style={{ display: "flex", gap: "5px" }}>
        <div>Status:</div>
        <div>
          <select
            name="selectedStatus"
            value={CurrentStatus}
            onChange={changeStatus}
          >
            {["Pending", "Doing", "Done"].map((s) => {
              return (
                <option key={s} value={s}>
                  {s}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Task;
