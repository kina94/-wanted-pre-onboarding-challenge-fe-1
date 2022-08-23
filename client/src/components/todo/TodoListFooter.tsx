import React, { useRef, useState } from "react";
import { useCreateTodo } from "../../hooks/query/todo";
import { TodoInput } from "../../types/todo";
import Button from "../button/Button";

function TodoListFooter() {
  const createTodo = useCreateTodo();
  const formRef = useRef<HTMLFormElement>(null);
  const [newTodo, setNewTodo] = useState<TodoInput>({
    title: "",
    content: "",
  });

  //새로운 투두 입력 이벤트
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({ ...newTodo, [e.target.id]: e.target.value });
  };

  // 투두 생성
  const onTodoAddClick = () => {
    createTodo.mutate(newTodo);
    formRef.current?.reset();
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
      <Button className="pink" onClick={onTodoAddClick}>
        할 일 추가하기
      </Button>
    </>
  );
}

export default TodoListFooter;
