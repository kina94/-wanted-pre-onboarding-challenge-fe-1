import { AxiosError } from "axios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as todoService from "../../service/todoService";
import { Todo } from "../../types/todo";
interface Props {
  errorCallBackFunction?(): void;
}
export const useGetTodos = () => {
  return useQuery("todos", todoService.callGetTodosApi, {
    refetchOnWindowFocus: false,
  });
};

export const useCreateTodo = ({ errorCallBackFunction }: Props) => {
  const [errorState, setErrorState] = useState("");
  const queryClient = useQueryClient();
  const createTodo = useMutation(todoService.callCreateTodoApi, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setErrorState(error.response?.data.details);
        errorCallBackFunction!();
      }
    },
  });
  return { createTodo, errorState };
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(todoService.callDeleteTodoApi, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
};

export const useDeleteDoneTodos = ({ errorCallBackFunction }: Props) => {
  const [errorState, setErrorState] = useState("");
  const queryClient = useQueryClient();
  const deleteDoneTodos = useMutation(todoService.callDeleteDoneTodosApi, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setErrorState(error.response?.data.details);
        errorCallBackFunction!();
      }
    },
  });
  return { deleteDoneTodos, errorState };
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(todoService.callUpdateTodoApi, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
};
