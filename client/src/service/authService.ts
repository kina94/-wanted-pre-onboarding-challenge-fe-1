import { doAxios } from "./../utils/doAxios";
import { User } from "../types/auth";
const BASE_URL = "/users";

//로그인
export const callLoginApi = async (params: User) => {
  const response = await doAxios({
    method: "post",
    url: `${BASE_URL}/login`,
    data: params,
  });
  return response;
};

//회원가입
export const callSignUpApi = async (params: User) => {
  const response = await doAxios({
    method: "post",
    url: `${BASE_URL}/create`,
    data: params,
  });
  return response;
};
