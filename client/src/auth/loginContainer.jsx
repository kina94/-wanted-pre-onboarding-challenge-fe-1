import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { callLoginApi } from '../service/authService';
import Auth from './auth';

function LoginContainer() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value })
  }

  const onLoginSubmit = async () => {
    const response = await callLoginApi(user)
    if (response) {
      localStorage.setItem('token', JSON.stringify(response.data.token))
      navigate('/')
    }
  }

  const onClickSignUp = () => {
    navigate('/sign_up')
  }

  useEffect(() => {
    const USER_TOKEN = JSON.parse(localStorage.getItem('token'))
    if (USER_TOKEN) {
      navigate('/')
    }
  })

  return (
    <Auth title='Login'
      user={user}
      onChange={onChange}
      onClick={onClickSignUp}
      onSubmit={onLoginSubmit} />
  )
}

export default LoginContainer