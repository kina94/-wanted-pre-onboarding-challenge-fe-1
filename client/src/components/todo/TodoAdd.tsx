import React, { useRef, useState } from "react";
import { useModal } from "../../hooks/custom/useModal";
import { useCreateTodo } from "../../hooks/query/todo";
import { Todo, TodoInput } from "../../types/todo";
import Button from "../button/Button";
import Header from "../layout/Header";
import ErrorModal from "../modal/ErrorModal";
import TodoForm from "./TodoForm";
interface Props {
  addFormClose(): void;
  todo?: Todo;
}
function TodoAddForm({ addFormClose, todo }: Props) {
  const {
    isModalOpen: isErrorModalOpen,
    modalClose: errorModalClose,
    modalOpen: errorModalOpen,
  } = useModal();

  const { createTodo, errorState: createTodoErrorState } = useCreateTodo({
    successCallBackFunction: addFormClose,
    errorCallBackFunction: errorModalOpen,
  });

  const [newTodo, setNewTodo] = useState<TodoInput | Todo>(
    todo
      ? todo
      : {
          title: "",
          content: "",
        }
  );
  //새로운 투두 입력 이벤트
  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setNewTodo({ ...newTodo, [e.target.id]: e.target.value });
  };

  // 투두 생성
  const onAddTodoClick = () => {
    createTodo.mutate(newTodo);
  };

  return (
    <>
      <Header title="Todo Add"></Header>
      <TodoForm onChange={onChange} />
      <div className="flex">
        <Button className="pink" onClick={onAddTodoClick}>
          추가
        </Button>
        <Button className="indigo" onClick={addFormClose}>
          취소
        </Button>
      </div>
      {isErrorModalOpen && (
        <ErrorModal
          errorState={createTodoErrorState}
          modalCloseOption={errorModalClose}
        />
      )}
    </>
  );
}

export default TodoAddForm;
