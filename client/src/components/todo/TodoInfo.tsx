import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getTodo } from "../../modules/todo";
// import { callGetTodoByIdApi } from "../../service/todoService";
import { Todo } from "../../types/todo";

interface Props {
  todo: Todo;
}

function TodoInfo({ todo }: Props) {
  // const dispatch = useDispatch();
  // const { "*": currentUrl } = useParams();

  // 투두 상세 정보 불러오기
  // const getTodoInfo = async (id?: string) => {
  //   const response = await callGetTodoByIdApi(id);
  //   dispatch(getTodo(response?.data.data));
  // };

  // useEffect(() => {
  //   getTodoInfo(todo.id);
  // }, [currentUrl]);

  return (
    <div className="p-5 uppercase rounded-md text-slate-600 bg-slate-200">
      <p className="mb-1 text-indigo-600 text-md font-bold">{todo.title}</p>
      <p className="font-normal text-sm leading-normal">{todo.content}</p>
    </div>
  );
}

export default TodoInfo;
