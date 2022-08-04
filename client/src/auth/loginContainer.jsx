import axios from 'axios';
import React, {useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Auth from './auth';
const USER_TOKEN = JSON.parse(localStorage.getItem('token'))

function LoginContainer() {

  const navigate = useNavigate()

  useEffect(()=>{
    if(USER_TOKEN){
      navigate('/')
    }
  })

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value })
  }

  const onLoginSubmit = async () => {
    try {
      const res = await axios.post('/users/login', user)
      if (res.status === 200) {
        localStorage.setItem('token', JSON.stringify(res.data.token))
        navigate('/')
      }
    } catch (error) {
      alert(error.response.data.details)
    }
  }

  const onClickSignUp = () => {
    navigate('/sign_up')
  }

  return (
    <Auth title='Login'
      user={user}
      onChange={onChange}
      onClick={onClickSignUp}
      onSubmit={onLoginSubmit} />
  )
}

export default LoginContainer