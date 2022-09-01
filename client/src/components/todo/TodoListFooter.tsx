import React, { useState, useRef } from "react";
import { useModal } from "../../hooks/custom/useModal";
import { useCreateTodo, useDeleteDoneTodos } from "../../hooks/query/todo";
import { Todo, TodoInput } from "../../types/todo";
import Button from "../button/Button";
import ErrorModal from "../modal/ErrorModal";

function TodoListFooter(todos: any) {
  const [modalKey, setModalKey] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { isModalOpen, modalClose, modalOpen } = useModal();
  const { createTodo, errorState: createTodoErrorStates } = useCreateTodo({
    errorCallBackFunction: modalOpen,
  });
  const { deleteDoneTodos, errorState: deleteErrorState } = useDeleteDoneTodos({
    errorCallBackFunction: modalOpen,
  });
  const [newTodo, setNewTodo] = useState<TodoInput>({
    title: "",
    content: "",
  });

  //새로운 투두 입력 이벤트
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({ ...newTodo, [e.target.id]: e.target.value });
  };

  // 투두 생성
  const onAddTodoClick = () => {
    createTodo.mutate(newTodo);
    formRef.current?.reset();
    setNewTodo({ title: "", content: "" });
    setModalKey("add");
  };

  const onDeleteFinishedTodoClick = () => {
    deleteDoneTodos.mutate(todos);
    setModalKey("delete");
  };

  return (
    <>
      <form
        ref={formRef}
        onKeyPress={(e: React.KeyboardEvent) =>
          e.key === "Enter" && onAddTodoClick()
        }
      >
        <input
          className="px-3 mb-3 py-3 placeholder-slate-400 text-slate-600 relative bg-white bg-white rounded text-sm shadow outline-none border-none focus:outline-none focus:shadow-outline w-full pr-10"
          type="text"
          id="title"
          onChange={onChange}
          placeholder="할일의 제목을 입력해주세요."
        ></input>
        <input
          className="px-3 mb-3 py-3 placeholder-slate-400 text-slate-600 relative bg-white bg-white rounded text-sm shadow outline-none border-none focus:outline-none focus:shadow-outline w-full pr-10"
          type="text"
          id="content"
          onChange={onChange}
          placeholder="할일의 내용을 입력해주세요."
        ></input>
      </form>
      <Button className="pink" onClick={onAddTodoClick}>
        할 일 추가
      </Button>
      <Button className="indigo" onClick={onDeleteFinishedTodoClick}>
        완료된 할 일 모두 삭제
      </Button>
      {isModalOpen && (
        <ErrorModal
          errorState={
            modalKey === "delete" ? deleteErrorState : createTodoErrorStates
          }
          modalCloseOption={modalClose}
        />
      )}
    </>
  );
}

export default TodoListFooter;
