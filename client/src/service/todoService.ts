import { TodoInput } from "./../../../server/types/todos";
import { UpdateTodo } from "../types/todo";
import { doAxios } from "../utils/doAxios";
const BASE_URL = "/todos";

//투두 리스트 불러오기
export const callGetTodosApi = async () => {
  const response = await doAxios({ method: "get", url: BASE_URL });
  return response?.data;
};

//투두 생성
export const callCreateTodoApi = async (data: TodoInput) => {
  const response = await doAxios({
    method: "post",
    url: `${BASE_URL}`,
    data,
  });
  return response;
};

//투두 수정
export const callUpdateTodoApi = async ({ id, title, content }: UpdateTodo) => {
  const response = await doAxios({
    method: "put",
    url: `${BASE_URL}/${id}`,
    data: { title, content },
  });
  return response;
};

//투두 삭제
export const callDeleteTodoApi = async (id: string) => {
  const response = await doAxios({
    method: "delete",
    url: `${BASE_URL}/${id}`,
  });
  return response;
};
