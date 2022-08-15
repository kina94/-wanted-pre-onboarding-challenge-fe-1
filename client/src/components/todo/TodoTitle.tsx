import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTodo } from "../../modules/todo";
import { callDeleteTodoApi } from "../../service/todoService";
import { Todo } from "../../types/todo";

interface Props {
  todo: Todo;
  index: number;
}

function TodoTitle({ todo, index }: Props) {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { "*": currentUrl } = useParams();

  // 투두 상세보기
  const navigateTodoInfo = () =>{
    navigate(`/${todo.id}`) 
  }

  //수정 모드 전환
  const navigateTodoEdit = () =>{
    navigate(`/${todo.id}/edit`);
  }

  // 투두 삭제 버튼 클릭
  const onTodoDeleteClick = async() => {
    callDeleteTodoApi(todo.id);
    dispatch(deleteTodo(index))
    //삭제한 투두가 현재 조회하고 있는 투두라면 루트 경로로 리디렉션
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
