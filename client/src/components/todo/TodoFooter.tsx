import React, { useCallback } from "react";
import { useModal } from "../../hooks/custom/useModal";
import { useDeleteDoneTodos } from "../../hooks/query/todo";
import { Todo } from "../../types/todo";
import Button from "../button/Button";
import ErrorModal from "../modal/ErrorModal";
import Modal from "../modal/Modal";
import TodoAdd from "./TodoAdd";
function TodoListFooter(todos: any) {
  const {
    isModalOpen: isErrorModalOpen,
    modalClose: errorModalClose,
    modalOpen: errorModalOpen,
  } = useModal();
  const {
    isModalOpen: isAddFormOpen,
    modalClose: addFormClose,
    modalOpen: addFormOpen,
  } = useModal();
  const { deleteDoneTodos, errorState: deleteErrorState } = useDeleteDoneTodos({
    errorListner: errorModalOpen,
  });

  const onAddTodoClick = () => {
    addFormOpen();
  };

  const onDeleteFinishedTodoClick = () => {
    deleteDoneTodos.mutate(todos);
  };

  return (
    <>
      <Button className="pink" onClick={onAddTodoClick}>
        할 일 추가
      </Button>
      <Button className="indigo" onClick={onDeleteFinishedTodoClick}>
        완료된 할 일 모두 삭제
      </Button>
      {isAddFormOpen && (
        <Modal>
          <TodoAdd addFormClose={addFormClose} />
        </Modal>
      )}
      {isErrorModalOpen && (
        <ErrorModal
          errorState={deleteErrorState}
          modalCloseOption={errorModalClose}
        />
      )}
    </>
  );
}

export default TodoListFooter;
