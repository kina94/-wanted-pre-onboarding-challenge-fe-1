import React from "react";
import { useNavigate} from "react-router-dom";
import TodoList from "../components/TodoList";

function Todos() {
  const navigate = useNavigate();

  //로그아웃 이벤트
  const onClickLogout = (): void => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <section className="h-full w-full flex flex-wrap">
      <section className="min-h-96 overflow-hidden	bg-white w-3/4 m-auto shadow-lg rounded-md p-5">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl text-right p-2 font-bold leading-normal mt-0 mb-2 text-blueGray-500">
            Todo List
          </h1>
          <button
            className="text-indigo-500 h-10 bg-white border border-solid border-indigo-500 hover:bg-indigo-500 hover:text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            onClick={onClickLogout}>
            로그아웃
          </button>
        </header>
        <hr></hr>
        <section className="h-full">
          <TodoList></TodoList>
        </section>
      </section>
    </section>
  );
}

export default Todos;
