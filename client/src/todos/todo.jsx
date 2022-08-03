import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
const USER_TOKEN = JSON.parse(localStorage.getItem('token'))

function Todo() {
  const params = useParams()
  const [todo,setTodo] = useState({})

  const getTodoById = async (id) => {
    try {
      const res = await axios.get(`/todos/${id}`,
        { headers: { Authorization: USER_TOKEN } })
      if (res.status === 200) {
        setTodo(res.data.data)
      }
    } catch (error) {
      throw new Error('abc')
    }
  }

  useEffect(() => {
    getTodoById(params.num)
  }, [params.num])
  
  return (
    <section className='todo-content'>
      <div className='todo'>
        <h3>{todo.title}</h3>
        <p>{todo.content}</p>
      </div>
    </section>
  )
}

export default Todo