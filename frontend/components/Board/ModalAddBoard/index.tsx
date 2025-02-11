// TYPES
import { Dispatch, SetStateAction } from "react";
import { BoardType } from "@/types";

// HOOKS
import { useState } from "react";
interface Props {
  setShowModalBoard: Dispatch<SetStateAction<boolean>>;
  setBoards: Dispatch<SetStateAction<BoardType[]>>;
}

const endpoint = `${process.env.NEXT_PUBLIC_BOARD_API}`;

function ModalAddBoard({ setShowModalBoard, setBoards }: Props) {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");

  const addBoard = async () => {
    const body = {
      id: 0,
      name: Name,
      description: Description,
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
      setBoards((prev) => [...prev, data]);
      setShowModalBoard(false);
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
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Type name..."
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <p>Description:</p>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Type description..."
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
          <br />
          <button onClick={addBoard}>Add board</button>
        </div>
      </dialog>
    </div>
  );
}

export default ModalAddBoard;
