import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from 'react-router-dom';
import { callGetTodos } from "../service/todoService";
import { Todo } from "../types/todo";
import TodoList from '../components/TodoList'
import TodoInfo from '../components/TodoInfo'
const USER_TOKEN = localStorage.getItem("token") as string

function Todos() {
  const [todoList, setTodoList] = useState<Todo[]>([
    {
      title: "",
      content: "",
      createdAt: "",
      updatedAt: "",
      id: "",
    },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!USER_TOKEN) {
      navigate("/login");
    } else {
      getTodos();
    }
  }, []);

  //투두리스트 불러오기
  const getTodos = async () => {
    const response = await callGetTodos();
    if (response) {
      setTodoList(response.data.data);
    }
  };

  //todo 삭제 추가 수정 수정 이벤트
  const todoAdd = (todo: Todo): void => {
    const update: Todo[] = { ...todoList };
    update[Object.keys(update).length] = todo;
    setTodoList(update);
  };

  const findTodoId = (update: Todo[], targetId : Todo | string): any => {
    const keys = Object.keys(update) as (keyof typeof update)[]
    const id: any = keys.find((key: any) => update[key].id === targetId)
    return id
  }

  const todoModify = (todo: Todo): void => {
    const update: Todo[] = { ...todoList };
    const id: any = findTodoId(update, todo.id)
    update[id] = todo;
    setTodoList(update);
  };

  const todoDelete = (clickedId: string): void => {
    const update: Todo[] = { ...todoList };
    const id: any = findTodoId(update, clickedId)
    delete update[id];
    setTodoList(update);
  };

  //로그아웃 이벤트
  const onClickLogout = (): void => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <section className="wrapper">
      <header>
        <button onClick={onClickLogout}>로그아웃</button>
      </header>
      <section className="todo-body">
        <section className="todo-list">
          <h1>Todo List</h1>
          <hr></hr>
          <TodoList
            todoAdd={todoAdd}
            todoDelete={todoDelete}
            todoList={todoList}
          ></TodoList>
        </section>
        <section className="todos">
          <h1>Todo Info</h1>
          <hr></hr>
          <Routes>
            <Route
              path="/"
              element={<>Todo List에서 상세 조회할 할일을 선택해주세요</>}
            />
            <Route
              path=":num/*"
              element={<TodoInfo todoModify={todoModify} />}
            />
          </Routes>
        </section>
      </section>
    </section>
  );
}

export default Todos;
