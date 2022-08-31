export interface Todo {
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  isDone: boolean;
}

export interface UpdateTodo {
  id: string;
  title: string;
  content: string;
  isDone: boolean;
}

export type TodoInput = Pick<Todo, "title" | "content">;
