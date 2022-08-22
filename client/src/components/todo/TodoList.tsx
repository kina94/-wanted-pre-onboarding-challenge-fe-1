import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TodoListFooter from "./TodoListFooter";
import TodoListHeader from "./TodoListHeader";
import TodoInfo from "./TodoInfo";
import TodoTitle from "./TodoTitle";
import { Todo } from "../../types/todo";
import TodoEdit from "./TodoEdit";
import { useGetTodos } from "../../hooks/query/todo";

function TodoList() {
  const { data: todos } = useGetTodos();
  const navigate = useNavigate();
  const { "*": currentUrl } = useParams();

  //유저 토큰이 없을 경우 로그인 화면으로 리디렉션
  useEffect(() => {
    const USER_TOKEN = localStorage.getItem("token");
    !USER_TOKEN && navigate("/login");
  }, []);

  return (
    <section className="bg-white m-auto shadow-lg rounded-md p-5">
      <TodoListHeader />
      <hr />
      <section className="h-2/3 mt-10 mb-10">
        <ul className="items">
          {todos?.data.map((todo: Todo, index: number) => (
            <li className="mb-5 ml-3 mr-3 " key={index} value={index}>
              <section className="flex w-full">
                <TodoTitle todo={todo} index={index} />
              </section>
              <section className="w-full text-left mt-2">
                {currentUrl === todo.id && <TodoInfo todo={todo} />}
                {currentUrl === `${todo.id}/edit` && (
                  <TodoEdit todo={todo} index={index} />
                )}
              </section>
            </li>
          ))}
        </ul>
      </section>
      <hr></hr>
      <section className="mt-3">
        <TodoListFooter />
      </section>
    </section>
  );
}

export default TodoList;
