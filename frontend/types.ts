export type TaskType = {
  id: number;
  name: string;
  description: string;
  status: string;
  board_id: number;
  created_at: string;
};

export type BoardType = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  tasks: Array<TaskType>;
};
