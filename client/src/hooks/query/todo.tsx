import { useQuery } from "react-query";
import * as todoService from "../../service/todoService";
import { useMutationQuery } from "../../utils/doQuery";

interface Props {
  errorListner?(): void;
  successListner?(): void;
}
export const useGetTodos = () => {
  return useQuery("todos", todoService.callGetTodosApi, {
    refetchOnWindowFocus: false,
  });
};

export const useCreateTodo = ({ errorListner, successListner }: Props) => {
  const { mutationResults: createTodo, errorState } = useMutationQuery({
    mutationFunction: todoService.callCreateTodoApi,
    successListner,
    errorListner,
    key: "todos",
  });
  return { createTodo, errorState };
};

export const useUpdateTodo = ({ errorListner, successListner }: Props) => {
  const { mutationResults: updateTodo, errorState } = useMutationQuery({
    mutationFunction: todoService.callUpdateTodoApi,
    successListner,
    errorListner,
    key: "todos",
  });
  return { updateTodo, errorState };
};

export const useDeleteTodo = () => {
  const { mutationResults: deleteTodo, errorState } = useMutationQuery({
    mutationFunction: todoService.callDeleteTodoApi,
    key: "todos",
  });
  return { deleteTodo, errorState };
};

export const useDeleteDoneTodos = ({ errorListner }: Props) => {
  const { mutationResults: deleteDoneTodos, errorState } = useMutationQuery({
    mutationFunction: todoService.callDeleteDoneTodosApi,
    errorListner,
    key: "todos",
  });
  return { deleteDoneTodos, errorState };
};
