import React, { useRef, useState } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
import { callCreateTodo, callDeleteTodo } from "../service/todoService";
import { Todo, TodoInput } from "../types/todo";
interface Props {
  todoList: Todo[];
  todoAdd: (todo: Todo) => void;
  todoDelete: (clickedId: string) => void;
}

function TodoList({todoList, todoAdd, todoDelete }: Props) {
  const formRef = React.useRef() as React.MutableRefObject<HTMLFormElement>;
  const {'*':action} = useParams();
  const navigate = useNavigate();

  const [newTodo, setNewTodo] = useState<TodoInput>({
    title: "",
    content: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTodo({ ...newTodo, [e.target.id]: e.target.value });
  };

  // 수정 / 상세정보 보기 전환
  const onClickTodo = (e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const clickedId = e.currentTarget.closest('li')!.id;
    if (e.currentTarget.id === "edit") {
      navigate(`/${clickedId}/edit`);
    } else {
      navigate(`/${clickedId}`);
    }
  };

  // 투두 삭제 버튼 클릭
  const onClickDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const clickedId: string = e.currentTarget.closest("li")!.id;
    callDeleteTodo(clickedId);
    if (action?.includes(clickedId)) {
      navigate("/");
    }
    todoDelete(clickedId);
  };

  // 투두 생성
  const onClickCreate = async () => {
    const response = await callCreateTodo(newTodo);
    todoAdd(response!.data.data);
    formRef.current.reset();
  };

  return (
    <>
      <section className="todos-content">
        <ul className="items">
          {Object.values(todoList).map((item, key) => (
            <li className="items__row" key={key} id={item.id}>
              <div className="item" onClick={onClickTodo}>
                {item.title}
                <div className="todos-buttons">
                  <button id="edit" onClick={onClickTodo}>
                    <i className="fas fa-pen" id="edit"></i>
                  </button>
                  <button id="delete" onClick={onClickDelete}>
                    <i className="fas fa-trash-alt" id="delete"></i>
                  </button>
                </div>
              </div>
              <hr></hr>
            </li>
          ))}
        </ul>
      </section>

      <section className="todo-bottom">
        <form ref={formRef}>
          <input
            type="text"
            id="title"
            onChange={onChange}
            placeholder="할일의 제목을 입력해주세요."
          ></input>
          <input
            type="text"
            id="content"
            onChange={onChange}
            placeholder="할일의 내용을 입력해주세요."
          ></input>
        </form>
        <button onClick={onClickCreate}>등록하기</button>
      </section>
    </>
  );
}

export default TodoList;
