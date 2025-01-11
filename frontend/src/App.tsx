// ENVS
import { VITE_BOARD_API } from "./envs";

// TYPES
import { BoardType, TaskType } from "./types";

// HOOKS
import { useEffect, useState } from "react";

// COMPONENTS
import Board from "./components/Board";

function App() {
  const [Boards, setBoards] = useState<Array<BoardType>>([]);

  const [TaskSelected, setTaskSelected] = useState<TaskType | null>(null);

  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await (await fetch(`${VITE_BOARD_API}/boards`)).json();

        if (Array.isArray(res)) {
          setBoards(res);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
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

export default App;
