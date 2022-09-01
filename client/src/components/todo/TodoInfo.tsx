import React from "react";
import { Todo } from "../../types/todo";

interface Props {
  todo: Todo;
}

function TodoInfo({ todo }: Props) {
  return (
    <div className="p-5 uppercase rounded-md text-slate-600 bg-slate-200">
      <p className="mb-1 text-indigo-600 text-md font-bold">{todo.title}</p>
      <p
        className="font-normal text-sm leading-normal"
        style={{ whiteSpace: "pre" }}
      >
        {todo.content}
      </p>
    </div>
  );
}

export default TodoInfo;
