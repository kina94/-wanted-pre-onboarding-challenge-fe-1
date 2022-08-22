import { useMutation, useQuery, useQueryClient } from "react-query";
import * as todoService from "../../service/todoService";

export const useGetTodos = () => {
  return useQuery(["todos"], todoService.callGetTodosApi, {
    refetchOnWindowFocus: false,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(todoService.callCreateTodoApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(todoService.callDeleteTodoApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(todoService.callUpdateTodoApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
};
