import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


function TodoContainer() {
    const token = JSON.parse(localStorage.getItem('token'))
    const navigate = useNavigate();

    useEffect(()=>{
        if(!token){
            navigate('/login')
        }
    },[])

    const onClickLogout= () =>{
        localStorage.removeItem('token')
        navigate('/login')
    }

  return (
    <section className='wrapper'>
        <header>
            <button
            onClick={onClickLogout}>로그아웃</button>
        </header>
        <div className='content'>
            todos
        </div>
    </section>
  )
}

export default TodoContainer