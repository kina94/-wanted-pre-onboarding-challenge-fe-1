import { AxiosError } from "axios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as todoService from "../../service/todoService";

interface Props {
  errorCallBackFunction?(): void;
  successCallBackFunction?(): void;
}
export const useGetTodos = () => {
  return useQuery("todos", todoService.callGetTodosApi, {
    refetchOnWindowFocus: false,
  });
};

export const useCreateTodo = ({
  errorCallBackFunction,
  successCallBackFunction,
}: Props) => {
  const [errorState, setErrorState] = useState("");
  const queryClient = useQueryClient();
  const createTodo = useMutation(todoService.callCreateTodoApi, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      successCallBackFunction!();
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

export const useUpdateTodo = ({
  errorCallBackFunction,
  successCallBackFunction,
}: Props) => {
  const [errorState, setErrorState] = useState("");
  const queryClient = useQueryClient();
  const updateTodo = useMutation(todoService.callUpdateTodoApi, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      successCallBackFunction!();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setErrorState(error.response?.data.details);
        errorCallBackFunction!();
      }
    },
  });
  return { updateTodo, errorState };
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
