import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateTodo } from "../../modules/todo";
import { callUpdateTodoApi } from "../../service/todoService";
import { Todo } from "../../types/todo";
interface Props {
  todo: Todo;
  index: number;
}
function TodoEdit({ todo, index }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //초기값 세팅
  const [newTodo, setNewTodo] = useState<Todo>(todo);

  // 수정하기 버튼 클릭
  const onTodoUpdateClick = async () => {
    const response = await callUpdateTodoApi(todo.id, newTodo);
    //수정 완료된 newTodo를 updateTodo의 인자로 넘긴다
    dispatch(updateTodo(index, response!.data.data));
    navigate(`/${todo.id}`);
  };

  //수정 내용 입력 이벤트
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({ ...newTodo, [e.target.id]: e.target.value });
  };

  return (
    <div className="p-5 uppercase rounded-md text-slate-600 bg-slate-200">
      <form>
        <input
          className="mb-1 bg-white border-none opacity-85 ext-indigo-600 text-md font-bold w-full"
          type="text"
          id="title"
          value={newTodo?.title}
          onChange={onChange}
        ></input>
        <input
          className="bg-white border-none opacity-80 font-normal text-sm leading-normal w-full"
          type="text"
          id="content"
          value={newTodo?.content}
          onChange={onChange}
        ></input>
      </form>
      <div className="flex justify-end mt-2">
        <button
          className="mr-2 bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
          onClick={onTodoUpdateClick}
        >
          수정하기
        </button>
        <button
          className="bg-slate-500 text-white active:bg-slate-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
          onClick={() => navigate(`/${todo.id}`)}
        >
          취소하기
        </button>
      </div>
    </div>
  );
}

export default TodoEdit;
