// TYPES
import { TaskType } from "../../types";
import { DragEvent, ChangeEvent, useState } from "react";

interface Props {
  task: TaskType;
  TaskSelected: TaskType | null;
  setTaskSelected: React.Dispatch<React.SetStateAction<TaskType | null>>;
}

const endpoint = `${process.env.NEXT_PUBLIC_BOARD_API}`;

function Task({ task }: Props) {
  const [CurrentStatus, setCurrentStatus] = useState(task.status);

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    const target = e.currentTarget;

    e.dataTransfer.setData("task_id", target.id);

    setTimeout(() => {
      target.style.display = "none";
    }, 0);
  };

  const changeStatus = async (e: ChangeEvent<HTMLSelectElement>) => {
    const status = e.currentTarget.value;

    try {
      const TaskSelectedCopy = task;

      TaskSelectedCopy.status = status;
      setCurrentStatus(status);

      const res = await (
        await fetch(`${endpoint}/tasks/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(TaskSelectedCopy),
        })
      ).json();

      if (res.message === "success") {
        console.log("Status from task updated! ID ->", task.id);
      }
    } catch (error) {
      console.log(error);
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
