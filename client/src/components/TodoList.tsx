import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { callGetTodos } from "../service/todoService";
import { Todo } from "../types/todo";
import TodoAdd from "./TodoAdd";
import TodoInfo from "./TodoInfo";
import TodoTitle from "./TodoTitle";

function TodoList() {
  const navigate = useNavigate();
  const { "*": todoId } = useParams();
  const [todoList, setTodoList] = useState<Todo[]>([
    {
      title: "",
      content: "",
      createdAt: "",
      updatedAt: "",
      id: "",
    },
  ]);

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
    if (response) {
      setTodoList(response.data.data);
    }
  };

  //todo 삭제 추가 수정 수정 이벤트
  const findTodoId = (update: Todo[], targetId: Todo | string): any => {
    const keys = Object.keys(update) as (keyof typeof update)[];
    const id: any = keys.find((key: any) => update[key].id === targetId);
    return id;
  };

  const todoAdd = (todo: Todo): void => {
    const update: Todo[] = { ...todoList };
    update[Object.keys(update).length] = todo;
    setTodoList(update);
  };

  const todoModify = (todo: Todo): void => {
    const update: Todo[] = { ...todoList };
    const id: any = findTodoId(update, todo.id);
    update[id] = todo;
    setTodoList(update);
  };

  const todoDelete = (clickedId: string): void => {
    const update: Todo[] = { ...todoList };
    const id: any = findTodoId(update, clickedId);
    delete update[id];
    setTodoList(update);
  };

  return (
    <>
      <section className="h-2/3 mt-10 mb-10">
        <ul className="items">
          {Object.values(todoList).map((item, key) => (
            <li className="mb-5 ml-3 mr-3 " key={key} id={item.id}>
              <section className="flex w-full">
                <TodoTitle title={item.title} todoDelete={todoDelete} />
              </section>
              <section className="w-full text-left mt-2">
                {todoId?.includes(item.id) && (
                  <TodoInfo todoModify={todoModify} />
                )}
              </section>
            </li>
          ))}
        </ul>
      </section>
      <hr></hr>
      <section className="mt-3">
        <TodoAdd todoAdd={todoAdd}></TodoAdd>
      </section>
    </>
  );
}

export default TodoList;
