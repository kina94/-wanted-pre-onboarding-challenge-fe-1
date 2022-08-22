export interface Todo {
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface UpdateTodo {
  id: string;
  title: string;
  content: string;
}

export type TodoInput = Pick<Todo, "title" | "content">;
