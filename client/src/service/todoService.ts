import { TodoInput } from './../../../server/types/todos';
import axios from 'axios'
import {Todo} from '../types/todo'
const BASE_URL = '/todos'
const token = localStorage.getItem('token') as string

const setHeaders = () => {
    const header = {
        headers: {
            Authorization: token
        }
    }
    return header
}

//투두 리스트 불러오기
export const callGetTodos = async() => {
    try {
        const res = await axios.get(`${BASE_URL}`,
        setHeaders())
        if (res.status === 200) {
            return res
        }
    } catch (error: any) {
        alert(error.response.data.details)
    }
}

//아이디로 투두 상세 내용 조회
export const callGetTodoById = async(id:string | undefined) => {
    try {
        const res = await axios.get(`${BASE_URL}/${id}`,
        setHeaders())
        if (res.status === 200) {
            return res
        }
    } catch (error: any) {
        alert(error.response.data.details)
    }
}

//투두 생성
export const callCreateTodo = async(params: TodoInput) => {
    try {
        const res = await axios.post(`${BASE_URL}`,
        params,
        setHeaders())
        if (res.status === 200) {
            return res
        }
    } catch (error: any) {
        alert(error.response.data.details)
    }
}

//투두 수정
export const callUpdateTodo = async(id:string | undefined, params: Todo) => {
    try {
        const res = await axios.put(`${BASE_URL}/${id}`,
        params,
        setHeaders())
        if (res.status === 200) {
            return res
        }
    } catch (error: any) {
        alert(error.response.data.details)
    }
}

//투두 삭제
export const callDeleteTodo = async(id:string) => {
    try {
        const res = await axios.delete(`${BASE_URL}/${id}`,
        setHeaders())
        if (res.status === 200) {
            return res.data.data
        }
    } catch (error:any) {
        alert(error.response.data.details)
    }
}