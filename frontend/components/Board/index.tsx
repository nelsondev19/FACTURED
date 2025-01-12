// TYPES
import { DragEvent, Dispatch, SetStateAction } from "react";
import { BoardType, TaskType } from "../../types";

// COMPONENTS
import Task from "../Task";

interface Props {
  board: BoardType;
  Boards: BoardType[];
  setBoards: Dispatch<SetStateAction<BoardType[]>>;
  PreviousBoard: number | null;
  setPreviousBoard: Dispatch<SetStateAction<number | null>>;
}
const endpoint = `${process.env.NEXT_PUBLIC_BOARD_API}`;

function Board({
  board,
  Boards,
  setBoards,
  PreviousBoard,
  setPreviousBoard,
}: Props) {
  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    const taskId = e.dataTransfer.getData("task_id");

    const task = document.getElementById(taskId) as HTMLElement;

    task.style.display = "block";

    const firstChild = e.currentTarget.firstChild;

    e.currentTarget.insertBefore(task, firstChild);

    const boardSelected = Boards.find(({ id }) => id === PreviousBoard);

    const taskSelectedCopy = boardSelected?.tasks.find(
      ({ id }) => id === Number(taskId)
    );

    if (taskSelectedCopy !== undefined) {
      try {
        taskSelectedCopy.board_id = board.id;
        taskSelectedCopy.updated_at = new Date().toISOString();

        const res = await (
          await fetch(`${endpoint}/tasks/update`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(taskSelectedCopy),
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

  const getMoreTasks = async () => {
    try {
      const tasksLengthArray = board.tasks.length;

      const lastTask = board.tasks[tasksLengthArray - 1].id;

      const tasks = (await (
        await fetch(`${endpoint}/tasks/all/${lastTask}`)
      ).json()) as Array<TaskType>;

      const boardSelectedIndex = Boards.findIndex(({ id }) => id === board.id);

      if (Array.isArray(tasks)) {
        if (boardSelectedIndex !== -1) {
          const copyBoards = [...Boards];

          copyBoards[boardSelectedIndex].tasks.push(...tasks);

          setBoards(copyBoards);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3 className="text-center">{board.name}</h3>
      <div
        className="board"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {board.tasks.map((task) => {
          return (
            <Task
              key={task.id}
              task={task}
              setPreviousBoard={setPreviousBoard}
            />
          );
        })}

        {board.tasks.length > 0 && (
          <div className="center">
            <button onClick={getMoreTasks}>Get more tasks</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Board;
