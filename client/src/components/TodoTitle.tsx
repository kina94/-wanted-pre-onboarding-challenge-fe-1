import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { callDeleteTodo } from "../service/todoService";
interface Props {
  title: string;
  todoDelete: (clickedId: string) => void;
}

function TodoTitle({ title, todoDelete }: Props) {
  const navigate = useNavigate();
  const { "*": todoId } = useParams();

  // 수정 / 상세정보 보기 전환
  const onClickTodo = (
    e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.stopPropagation();
    const clickedId = e.currentTarget.closest("li")!.id;
    if (e.currentTarget.id === "edit") {
      navigate(`/${clickedId}/edit`);
    } else if (todoId === clickedId) {
      navigate("/");
    } else {
      navigate(`/${clickedId}`);
    }
  };

  // 투두 삭제 버튼 클릭
  const onClickDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const clickedId: string = e.currentTarget.closest("li")!.id;
    callDeleteTodo(clickedId);
    if (todoId?.includes(clickedId)) {
      navigate("/");
    }
    todoDelete(clickedId);
  };

  return (
    <>
      <div
        className="cursor-pointer w-full text-left text-base font-light leading-relaxed mt-0 mb-0 text-blueGray-600 hover:font-bold"
        onClick={onClickTodo}
      >
        <span className="text-indigo-500">
          <i className="fas fa-check-circle"></i>
        </span>
        <span className="ml-2">{title}</span>
      </div>
      <div className="flex justify-end">
        <button
          className="mr-3 text-blueGray-500 hover:text-indigo-500"
          id="edit"
          onClick={onClickTodo}
        >
          <i className="fas fa-pen" id="edit"></i>
        </button>
        <button
          className="text-blueGray-500 hover:text-indigo-500"
          id="delete"
          onClick={onClickDelete}
        >
          <i className="fas fa-trash-alt" id="delete"></i>
        </button>
      </div>
    </>
  );
}

export default TodoTitle;
