import { TodoInput } from "./../../../server/types/todos";
import { Todo } from "../types/todo";
import { doAxios } from "../utils/doAxios";
const BASE_URL = "/todos";

//투두 리스트 불러오기
export const callGetTodosApi = async () => {
  const response = await doAxios({ method: "get", url: BASE_URL });
  return response;
};

//아이디로 투두 상세 내용 조회
export const callGetTodoByIdApi = async (id: string | undefined) => {
  const response = await doAxios({ method: "get", url: `${BASE_URL}/${id}` });
  return response;
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
export const callUpdateTodoApi = async (id: string | undefined, data: Todo) => {
  const response = await doAxios({
    method: "put",
    url: `${BASE_URL}/${id}`,
    data,
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
