import { User } from '../types/auth'

export const submitValidator = (submitForm: User) => {
    const {email, password} = submitForm
    if(email==='' || password===''){
        return false
    }
    if(password.length>=8 && (email.includes('@') && email.includes('.'))){
        return true
    } else {
        return false
    }
}