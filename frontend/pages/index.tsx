"use client";
// TYPES
import { BoardType } from "../types";

// HOOKS
import { useEffect, useState } from "react";

// COMPONENTS
import Board from "../components/Board";
import ModalAddBoard from "@/components/Board/ModalAddBoard";
import ModalAddTask from "@/components/Task/ModalAddTask";

const endpoint = `${process.env.NEXT_PUBLIC_BOARD_API}`;

function Home() {
  const [Boards, setBoards] = useState<Array<BoardType>>([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const boards = await (await fetch(`${endpoint}/boards/all`)).json();

        if (Array.isArray(boards)) {
          setBoards(boards);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // SAVE THE BOARD WHERE IT WAS BEFORE YOU DROPPED THE TASK
  const [PreviousBoard, setPreviousBoard] = useState<number | null>(null);

  const [ShowModalBoard, setShowModalBoard] = useState(false);

  const [ShowModalTask, setShowModalTask] = useState(false);
  const [ModalTaskBoard, setModalTaskBoard] = useState<number | null>(null);

  if (Loading) {
    return <h1 className="center height95">Loading...</h1>;
  }

  return (
    <div className="container">
      {Boards.map((b) => {
        return (
          <Board
            key={b.id}
            board={b}
            Boards={Boards}
            setBoards={setBoards}
            PreviousBoard={PreviousBoard}
            setPreviousBoard={setPreviousBoard}
            setShowModalTask={setShowModalTask}
            setModalTaskBoard={setModalTaskBoard}
          />
        );
      })}
      <button onClick={() => setShowModalBoard(true)}>Add board</button>

      {ShowModalBoard && (
        <ModalAddBoard
          setShowModalBoard={setShowModalBoard}
          setBoards={setBoards}
        />
      )}

      {ShowModalTask && (
        <ModalAddTask
          setShowModalTask={setShowModalTask}
          setBoards={setBoards}
          currentBoard={ModalTaskBoard}
        />
      )}
    </div>
  );
}

export default Home;
