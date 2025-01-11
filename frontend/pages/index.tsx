"use client";
// TYPES
import { BoardType, TaskType } from "../types";

// HOOKS
import { useEffect, useState } from "react";

// COMPONENTS
import Board from "../components/Board";

const endpoint = `${process.env.NEXT_PUBLIC_BOARD_API}`;

function Home() {
  const [Boards, setBoards] = useState<Array<BoardType>>([]);

  const [TaskSelected, setTaskSelected] = useState<TaskType | null>(null);

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

    const handleFocus = () => {
      fetchData();
    };
  }, []);

  if (Loading) {
    return <h1 className="center">Loading...</h1>;
  }

  return (
    <div className="container">
      {Boards.map((b) => {
        return (
          <Board
            key={b.id}
            board={b}
            TaskSelected={TaskSelected}
            setTaskSelected={setTaskSelected}
          />
        );
      })}
    </div>
  );
}

export default Home;
