// TYPES
import { Dispatch, SetStateAction } from "react";
import { BoardType } from "@/types";

interface Props {
  setShowModalBoard: Dispatch<SetStateAction<boolean>>;
  setBoards: Dispatch<SetStateAction<BoardType[]>>;
}

const endpoint = `${process.env.NEXT_PUBLIC_BOARD_API}`;

function ModalAddBoard({ setShowModalBoard, setBoards }: Props) {
  const addBoard = async () => {
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const description = (
      document.getElementById("description") as HTMLInputElement
    ).value;

    const body = {
      id: 0,
      name,
      description,
    };

    const response = await fetch(`${endpoint}/boards/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data) {
      setShowModalBoard(false);
      setBoards((prev) => [...prev, data]);
    }
  };
  return (
    <div className="backdrop">
      <dialog id="modal-add-board" open={true} className="modal">
        <span className="close" onClick={() => setShowModalBoard(false)}>
          X
        </span>
        <div>
          <p>Name:</p>
          <input type="text" name="name" id="name" placeholder="Type name..." />
          <p>Description:</p>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Type description..."
          />
          <br />
          <button onClick={addBoard}>Add board</button>
        </div>
      </dialog>
    </div>
  );
}

export default ModalAddBoard;
