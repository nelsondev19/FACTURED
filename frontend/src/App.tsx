import Board from "./components/Board";
import Task from "./components/Task";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh",
        gap: "20px",
      }}
    >
      <Board id="board-1">
        <center>
          <h3>Board 1</h3>
        </center>
        <br />
        <Task id="board-1-task-1">
          <p>Board1: card-one</p>
        </Task>
        <Task id="board-1-task-2">
          <p>Board1: card-two</p>
        </Task>
      </Board>

      <Board id="board-2">
        <center>
          <h3>Board 2</h3>
        </center>
        <br />
        <Task id="board2-task-1">
          <p>Board1: card-one</p>
        </Task>
        <Task id="board-2-task-2">
          <p>Board1: card-two</p>
        </Task>
      </Board>
      <Board id="board-3">
        <center>
          <h3>Board 3</h3>
        </center>
        <br />
        <Task id="board-3-task-1">
          <p>Board1: card-one</p>
        </Task>
        <Task id="board-3-task-2">
          <p>Board1: card-two</p>
        </Task>
      </Board>
    </div>
  );
}

export default App;
