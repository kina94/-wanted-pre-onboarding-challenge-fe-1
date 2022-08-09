import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";

function TodoHeader() {
  const navigate = useNavigate();

  //로그아웃 이벤트
  const onClickLogout = (): void => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Header title="Todo List">
      <button
        className="text-indigo-500 h-10 bg-white border border-solid border-indigo-500 hover:bg-indigo-500 hover:text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        onClick={onClickLogout}
      >
        로그아웃
      </button>
    </Header>
  );
}

export default TodoHeader;
