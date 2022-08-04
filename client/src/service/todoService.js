import axios from 'axios'
const BASE_URL = '/todos'

const setHeaders = (token) => {
    const header = {
        headers: {
            Authorization: token
        }
    }
    return header
}

//투두 리스트 불러오기
export const callGetTodos = async(token) => {
    try {
        const res = await axios.get(`${BASE_URL}`, setHeaders(token))
        if (res.status === 200) {
            return res
        }
    } catch (error) {
        alert(error.response.data.details)
    }
}

//아이디로 투두 상세 내용 조회
export const callGetTodoById = async(token, id) => {
    try {
        const res = await axios.get(`${BASE_URL}/${id}`, setHeaders(token))
        if (res.status === 200) {
            return res
        }
    } catch (error) {
        alert(error.response.data.details)
    }
}

//투두 생성
export const callCreateTodo = async(token, params) => {
    try {
        const res = await axios.post(`${BASE_URL}`,
        params,
        setHeaders(token))
        if (res.status === 200) {
            return res
        }
    } catch (error) {
        alert(error.response.data.details)
    }
}

//투두 수정
export const callUpdateTodo = async(token, id, params) => {
    try {
        const res = await axios.put(`${BASE_URL}/${id}`,
        params,
        setHeaders(token))
        if (res.status === 200) {
            return res
        }
    } catch (error) {
        alert(error.response.data.details)
    }
}

//투두 삭제
export const callDeleteTodo = async(token, id) => {
    try {
        const res = await axios.delete(`${BASE_URL}/${id}`,
        setHeaders(token))
        if (res.status === 200) {
            return res
        }
    } catch (error) {
        alert(error.response.data.details)
    }
}