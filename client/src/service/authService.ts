import { User } from '../types/auth'
import axios from 'axios'
const BASE_URL = '/users'

//로그인
export const callLoginApi = async(params: User) => {
    try {
        const res = await axios.post(`${BASE_URL}/login`, params)
        if (res.status === 200) {
            return res
        }
    } catch (error: any) {
        throw Error(error.response.data.details)
    }
}


//회원가입
export const callSignUpApi = async(params: User) => {
    try {
        const res = await axios.post(`${BASE_URL}/create`, params)
        if (res.status === 200) {
            return res
        }
    } catch(error: any) {
        throw Error(error.response.data.details)
    }
}