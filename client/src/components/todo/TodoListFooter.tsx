import React, { useRef, useState } from "react";
import { callCreateTodoApi } from "../../service/todoService";
import { Todo, TodoInput } from "../../types/todo";
interface Props {
  handleAddTodo: (newTodo: Todo) => void;
}

function TodoListFooter({handleAddTodo} : Props) {
  const formRef = useRef<HTMLFormElement>(null)
  const [newTodo, setNewTodo] = useState<TodoInput>({
    title: "",
    content: "",
  });

  //새로운 투두 입력 이벤트
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({ ...newTodo, [e.target.id]: e.target.value });
  };

  // 투두 생성
  const onTodoAddClick = async () => {
    const response = await callCreateTodoApi(newTodo);
    handleAddTodo(response!.data.data);
    formRef.current?.reset();
  };

  return (
    <div className='flex flex-col justify-end'>
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
        <button
          className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
          onClick={onTodoAddClick}
        >
          ADD
      </button>
    </div>
  );
}

export default TodoListFooter;
