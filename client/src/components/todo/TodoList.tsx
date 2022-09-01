import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TodoListFooter from "./TodoFooter";
import TodoListHeader from "./TodoHeader";
import TodoInfo from "./TodoInfo";
import TodoTitle from "./TodoTitle";
import { Todo } from "../../types/todo";
import { useGetTodos } from "../../hooks/query/todo";
import Wrapper from "../layout/Wrapper";
import Footer from "../layout/Footer";
import Body from "../layout/Body";

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
    <Wrapper>
      <TodoListHeader />
      <Body>
        <ul className="items align-middle">
          {todos?.data.map((todo: Todo, index: number) => (
            <li className="mb-5 ml-3 mr-3 " key={index} value={index}>
              <section className="flex w-full">
                <TodoTitle todo={todo} />
              </section>
              <section className="w-full text-left mt-2">
                {currentUrl === todo.id && <TodoInfo todo={todo} />}
              </section>
            </li>
          ))}
        </ul>
      </Body>
      {/* <hr></hr> */}
      <Footer>
        <TodoListFooter todos={todos?.data} />
      </Footer>
    </Wrapper>
  );
}

export default TodoList;
