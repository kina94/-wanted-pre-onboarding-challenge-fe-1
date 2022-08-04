import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import { callGetTodoById, callUpdateTodo } from '../service/todoService.js'
const USER_TOKEN = JSON.parse(localStorage.getItem('token'))

function Todo({todoAddOrUpdate}) {
  const params = useParams()
  const navigate = useNavigate()
  const [todo, setTodo] = useState({})

  const getTodo = async(id) =>{
    const response = await callGetTodoById(USER_TOKEN, id)
    if(response){
      setTodo(response.data.data)
    }
  }

  const onClickModify = async() => {
    const response = await callUpdateTodo(USER_TOKEN, params.num, todo)
    todoAddOrUpdate(response.data.data)
    navigate(`/${params.num}`)
  }

  const onChange = (e) =>{
    setTodo({...todo, [e.target.id] : e.target.value})
  }
 
  useEffect(() => {
    getTodo(params.num)
  }, [params.num])

  const switchViewByMode = () => {
    if (params['*'] === 'edit') {
      return (
        <div className='todo-edit'>
          <form>
            <input type='text' id='title' value={todo.title} onChange={onChange}></input>
            <input type='text' id='content' value={todo.content} onChange={onChange}></input>
          </form>
          <button onClick={onClickModify}>수정하기</button>
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