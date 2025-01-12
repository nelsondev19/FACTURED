export type TaskType = {
  id: number;
  name: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  board_id: number;
};

export type BoardType = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  tasks: Array<TaskType>;
};
