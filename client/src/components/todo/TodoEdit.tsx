import React, { useState } from "react";
import { useModal } from "../../hooks/custom/useModal";
import { useUpdateTodo } from "../../hooks/query/todo";
import { Todo } from "../../types/todo";
import Button from "../button/Button";
import Header from "../layout/Header";
import ErrorModal from "../modal/ErrorModal";
import TodoForm from "./TodoForm";
interface Props {
  todo: Todo;
  editFormClose(): void;
}
function TodoEdit({ todo, editFormClose }: Props) {
  const {
    isModalOpen: isErrorModalOpen,
    modalClose: errorModalClose,
    modalOpen: errorModalOpen,
  } = useModal();

  const { updateTodo, errorState: updateTodoErrorState } = useUpdateTodo({
    successListner: editFormClose,
    errorListner: errorModalOpen,
  });

  //초기값 세팅
  const [newTodo, setNewTodo] = useState<Todo>(todo);

  // 수정하기 버튼 클릭
  const onTodoUpdateClick = async () => {
    updateTodo.mutate(newTodo);
  };

  //수정 내용 입력 이벤트
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({ ...newTodo, [e.target.id]: e.target.value });
  };

  return (
    <>
      <Header title="Todo Edit"></Header>
      <TodoForm onChange={onChange} todo={newTodo} />
      <div className="flex">
        <Button className="pink" onClick={onTodoUpdateClick}>
          수정
        </Button>
        <Button className="indigo" onClick={editFormClose}>
          취소
        </Button>
      </div>
      {isErrorModalOpen && (
        <ErrorModal
          errorState={updateTodoErrorState}
          modalCloseOption={errorModalClose}
        />
      )}
    </>
  );
}

export default TodoEdit;
