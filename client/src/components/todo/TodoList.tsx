import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { callGetTodos } from "../../service/todoService";
import { Todo } from "../../types/todo";
import TodoListFooter from "./TodoListFooter";
import TodoListHeader from "./TodoListHeader";
import TodoInfo from "./TodoInfo";
import TodoTitle from "./TodoTitle";

function TodoList() {
  const navigate = useNavigate();
  const { "*": currentUrl } = useParams();
  const [todoList, setTodoList] = useState<Todo[]>([
    {
      title: "",
      content: "",
      createdAt: "",
      updatedAt: "",
      id: "",
    },
  ]);

  //유저 토큰이 없을 경우 로그인 화면으로 리디렉션
  useEffect(() => {
    const USER_TOKEN = localStorage.getItem("token");
    if (!USER_TOKEN) {
      navigate("/login");
    } else {
      getTodos();
    }
  }, []);

  //투두리스트 불러오기
  const getTodos = async () => {
    const response = await callGetTodos();
    setTodoList(response?.data.data);
  };

  //todo 추가
  const handleAddTodo = (newTodo: Todo) => {
    const update = {...todoList}
    update[Object.keys(update).length] = newTodo;
    setTodoList(update);
  };

  //todo 수정
  const handleUpdateTodo = (todoIndex: number, newTodo: Todo) => {
    const update = {...todoList}
    update[todoIndex] = newTodo;
    setTodoList(update)
  };

  //todo 삭제
  const handleDeleteTodo = (todoIndex: number) => {
    const update = {...todoList}
    delete update[todoIndex];
      setTodoList(update)
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
                <TodoTitle
                  todo={todo}
                  index={index}
                  handleDeleteTodo={handleDeleteTodo}
                />
              </section>
              <section className="w-full text-left mt-2">
                {currentUrl?.includes(todo.id) && (
                  <TodoInfo
                  index={index}
                  handleUpdateTodo={handleUpdateTodo} />
                )}
              </section>
            </li>
          ))}
        </ul>
      </section>
      <hr></hr>
      <section className="mt-3">
        <TodoListFooter handleAddTodo={handleAddTodo} />
      </section>
    </section>
  );
}

export default TodoList;
