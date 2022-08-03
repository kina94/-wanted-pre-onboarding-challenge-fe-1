import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import Auth from './auth'

function SignUpContainer() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const onClickSignUp = async (e) => {
        try {
            const res = await axios.post('/users/create', user)
            if (res.status === 200) {
                alert('계정이 성공적으로 생성되었습니다.')
                navigate('/login')
                return res
            }
        } catch {
            throw new Error(`에러 발생 ${e.message}, ${e.status}`)
        }
    }

    const onChange = (e) => {
        setUser({ ...user, [e.target.id]: e.target.value })
    }

    return (
        <Auth title='SignUp'
            user={user}
            onChange={onChange}
            onClick={onClickSignUp} />
    )
}

export default SignUpContainer