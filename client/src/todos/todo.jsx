import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
const USER_TOKEN = JSON.parse(localStorage.getItem('token'))

function Todo({todoAddOrUpdate}) {
  const params = useParams()
  const navigate = useNavigate()
  const [todo, setTodo] = useState({})

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

  const onChange = (e) =>{
    setTodo({...todo, [e.target.id] : e.target.value})
  }

  const onSubmit = async(e) => {
    try {
      const res = await axios.put(`/todos/${params.num}`,
        todo,
        { headers: { Authorization: USER_TOKEN } })
      if (res.status === 200) {
        const data = res.data.data
        todoAddOrUpdate(data)
      }
    } catch (error) {
      alert(error)
    }
  }
 
  useEffect(() => {
    getTodoById(params.num)
    console.log(params)
  }, [params.num])

  const switchViewByMode = () => {
    if (params['*'] === 'edit') {
      return (
        <div className='todo-edit'>
          <form>
            <input type='text' id='title' value={todo.title} onChange={onChange}></input>
            <input type='text' id='content' value={todo.content} onChange={onChange}></input>
          </form>
          <button onClick={onSubmit}>수정하기</button>
          <button onClick={()=>navigate(`/${params.num}`)}>취소하기</button>
        </div>
      )
    } else {
      return (
        <div className='todo'>
          <h3>{todo.title}</h3>
          <p>{todo.content}</p>
        </div>
      )
    }
  }

  return (
    <section className='todo-content'>
      <div className='todo'>
        {switchViewByMode()}
      </div>
    </section>
  )
}

export default Todo