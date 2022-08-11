import { User } from "../types/auth";
import { Todo, TodoInput } from "./../../../server/types/todos";
import axios, { AxiosError } from "axios";
const savedToken = localStorage.getItem("token");
const token = typeof savedToken === "string" && savedToken;

interface Request {
  method: string;
  url: string;
  data?: Todo | TodoInput | User;
}

const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: { Authorization: token },
});

export const doAxios = async (request: Request) => {
  try {
    const response = await instance(request);
    if (response.status === 200) return response;
  } catch (error) {
    if (error instanceof AxiosError){
        alert(error.response?.data.details);
    }
  }
};
