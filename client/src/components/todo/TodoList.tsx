import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { callGetTodosApi } from "../../service/todoService";
import TodoListFooter from "./TodoListFooter";
import TodoListHeader from "./TodoListHeader";
import TodoInfo from "./TodoInfo";
import TodoTitle from "./TodoTitle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { getTodos } from "../../modules/todo";
import { Todo } from "../../types/todo";

function TodoList() {
  const todoList: Todo[] = useSelector((state: RootState) => state.todoReducer.todos);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { "*": currentUrl } = useParams();

  //유저 토큰이 없을 경우 로그인 화면으로 리디렉션
  useEffect(() => {
    const USER_TOKEN = localStorage.getItem("token");
    if (!USER_TOKEN) {
      navigate("/login");
    } else {
      getTodoList();
    }
  }, []);

  //투두리스트 불러오기
  const getTodoList = async () => {
    const response = await callGetTodosApi();
    dispatch(getTodos(response?.data.data));
  };

  return (
    <section className="bg-white m-auto shadow-lg rounded-md p-5">
      <TodoListHeader />
      <hr />
      <section className="h-2/3 mt-10 mb-10">
        <ul className="items">
          {Object.values(todoList).map((todo, index) => (
            <li className="mb-5 ml-3 mr-3 " key={index} value={index}>
              <section className="flex w-full">
                <TodoTitle todo={todo} index={index} />
              </section>
              <section className="w-full text-left mt-2">
                {currentUrl?.includes(todo.id) && <TodoInfo todoId={todo.id} index={index} />}
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
