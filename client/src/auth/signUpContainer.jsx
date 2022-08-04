import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import Auth from './auth'
import { callSignUpApi } from '../service/authService';

function SignUpContainer() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const onClickSignUp = async () => {
        const response = await callSignUpApi(user)
        if (response) {
            alert(response.data.message)
            navigate('/login')
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