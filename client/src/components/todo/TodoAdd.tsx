import React, { useRef, useState } from "react";
import { callCreateTodo } from "../../service/todoService";
import { Todo, TodoInput } from "../../types/todo";
interface Props {
  handleTodoAdd: (todo: Todo) => void
}

function TodoAdd({handleTodoAdd} : Props) {
  const formRef = React.useRef() as React.MutableRefObject<HTMLFormElement>;
  const [newTodo, setNewTodo] = useState<TodoInput>({
    title: "",
    content: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTodo({ ...newTodo, [e.target.id]: e.target.value });
  };

  // 투두 생성
  const onTodoAddClick = async () => {
    const response = await callCreateTodo(newTodo);
    handleTodoAdd(response!.data.data);
    formRef.current.reset();
  };

  return (
    <>
      <form ref={formRef}>
        <input
          className="px-3 mb-3 py-3 placeholder-slate-400 text-slate-600 relative bg-white bg-white rounded text-sm shadow outline-none border-none focus:outline-none focus:shadow-outline w-full pr-10"
          type="text"
          id="title"
          onChange={onChange}
          placeholder="할일의 제목을 입력해주세요."
        ></input>
        <input
          className="px-3 mb-3 py-3 placeholder-slate-400 text-slate-600 relative bg-white bg-white rounded text-sm shadow outline-none border-none focus:outline-none focus:shadow-outline w-full pr-10"
          type="text"
          id="content"
          onChange={onChange}
          placeholder="할일의 내용을 입력해주세요."
        ></input>
      </form>
      <div className="flex justify-end">
        <button
          className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
          onClick={onTodoAddClick}
        >
          ADD
        </button>
      </div>
    </>
  );
}

export default TodoAdd;
