import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState } from "../../modules";
import { getTodo, updateTodo } from "../../modules/todo";
import {
  callGetTodoByIdApi,
  callUpdateTodoApi,
} from "../../service/todoService";
import { Todo } from "../../types/todo";

interface Props {
  todoId: string;
  index: number;
}

function TodoInfo({ todoId, index }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { "*": currentUrl } = useParams();
  //현재 조회하고 있는 투두
  const todo = useSelector((state: RootState) => state.todoReducer.todo);
  //초기값 세팅
  const [newTodo, setNewTodo] = useState<Todo>({
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    id: "",
  });

  //투두 상세 정보 불러오기
  const getTodoInfo = async (id?: string) => {
    const response = await callGetTodoByIdApi(id);
    dispatch(getTodo(response?.data.data));
    setNewTodo(response?.data.data)
  };

  //수정 내용 입력 이벤트
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({ ...newTodo, [e.target.id]: e.target.value });
  };

  // 수정하기 버튼 클릭
  const onTodoUpdateClick = async () => {
    const response = await callUpdateTodoApi(todoId, newTodo);
    //수정 완료된 newTodo를 updateTodo의 인자로 넘긴다
    dispatch(updateTodo(index, response!.data.data));
    navigate(`/${todoId}`);
  };

  useEffect(() => {
    getTodoInfo(todoId);
  }, [currentUrl]);

  // 수정 / 상세보기 url에 따라 뷰 전환
  const switchViewByMode = (): ReactElement => {
    if (currentUrl?.includes("edit")) {
      return (
        <>
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
              onClick={() => navigate(`/${todoId}`)}
            >
              취소하기
            </button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <p className="mb-1 text-indigo-600 text-md font-bold">{todo.title}</p>
          <p className="font-normal text-sm leading-normal">{todo.content}</p>
        </>
      );
    }
  };

  return (
    <section>
      <div className="p-5 uppercase rounded-md text-slate-600 bg-slate-200">
        {switchViewByMode()}
      </div>
    </section>
  );
}

export default TodoInfo;
