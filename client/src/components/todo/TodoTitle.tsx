import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { idText } from "typescript";
import { useDeleteTodo } from "../../hooks/query/todo";
import { Todo } from "../../types/todo";

interface Props {
  todo: Todo;
  index: number;
}

function TodoTitle({ todo, index }: Props) {
  const deleteTodo = useDeleteTodo();
  const navigate = useNavigate();
  const { "*": currentUrl } = useParams();

  // 투두 상세보기
  const navigateTodoInfo = () => {
    if (currentUrl === todo.id) {
      navigate("/");
    } else {
      navigate(`/${todo.id}`);
    }
  };

  //수정 모드 전환
  const navigateTodoEdit = () => {
    navigate(`/${todo.id}/edit`);
  };

  // 투두 삭제 버튼 클릭
  const onTodoDeleteClick = async () => {
    deleteTodo.mutate(todo.id);
    currentUrl?.includes(todo.id) && navigate("/");
  };

  return (
    <>
      <div
        className="cursor-pointer w-full text-left text-base font-light leading-relaxed mt-0 mb-0 text-slate-600 hover:font-bold"
        onClick={navigateTodoInfo}
      >
        <span className="text-indigo-500">
          <i className="fas fa-check-circle"></i>
        </span>
        <span className="ml-2">{todo.title}</span>
      </div>
      <div className="flex justify-end">
        <button
          className="mr-3 text-slate-500 hover:text-indigo-500"
          id="edit"
          onClick={navigateTodoEdit}
        >
          <i className="fas fa-pen" id="edit"></i>
        </button>
        <button
          className="text-slate-500 hover:text-indigo-500"
          id="delete"
          onClick={onTodoDeleteClick}
        >
          <i className="fas fa-trash-alt" id="delete"></i>
        </button>
      </div>
    </>
  );
}

export default TodoTitle;
