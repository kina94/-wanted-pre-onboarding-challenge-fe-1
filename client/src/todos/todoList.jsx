import axios from 'axios'
import React, { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function TodoList({todoAddOrUpdate, todoDelete, todoList, USER_TOKEN }) {
  const formRef = useRef()
  const params = useParams()
  const navigate = useNavigate()
  const [newTodo, setNewTodo] = useState({
    title: '',
    content: '',
  })

  const onClickTodo = (e) => {
    const clickedId = e.target.closest('li').id
    if(e.target.id === 'edit'){
      navigate(`/${clickedId}/edit`)
    } else {
      navigate(`/${clickedId}`)
    }
  }

  const onChange = (e) => {
    setNewTodo({ ...newTodo, [e.target.id]: e.target.value })
  }

  const callCreateTodoApi = async() => {
    try {
      const res = await axios.post('/todos',
        newTodo,
        { headers: { Authorization: USER_TOKEN } })
      if (res.status === 200) {
        return res.data.data
      }
    } catch (error) {
      alert(error)
    }
  }

  const callDeleteTodoApi = async(id) => {
    try {
      const res = await axios.delete(`/todos/${id}`,
        { headers: { Authorization: USER_TOKEN } })
      if (res.status === 200) {
        return res.data.data
      }
    } catch (error) {
      throw new Error('abc')
    }
  }

  const onClickDelete = async(e) => {
    e.stopPropagation()
    const clickedId = e.target.closest('li').id
    callDeleteTodoApi(clickedId)
    if (params['*'] === clickedId) {
      navigate('/')
    }
    todoDelete(clickedId)
  }

  const onSubmit = async() =>{
    const data = await callCreateTodoApi()
    todoAddOrUpdate(data)
    formRef.current.reset()
  }

  return (
    <>
      <section className='todos-content'>
        <ul className='items'>
          {
            Object.values(todoList).map((item, key) => (
              <li className='items__row' id={item.id} >
                <div className='item' onClick={onClickTodo}>
                  {item.title}
                  <div className='todos-buttons'>
                    <button
                      onClick={onClickTodo}>
                      <i className="fas fa-pen" id='edit'></i>
                    </button>
                    <button
                      onClick={onClickDelete}>
                      <i className="fas fa-trash-alt" id='delete'></i>
                    </button>
                  </div>

                </div>
                <hr></hr>
              </li>
            ))
          }
        </ul>
      </section>

      <section className='todo-bottom'>
        <form ref={formRef}>
          <input type='text'
            id='title'
            onChange={onChange}
            placeholder='할일의 제목을 입력해주세요.'></input>
          <input type='text'
            id='content'
            onChange={onChange}
            placeholder='할일의 내용을 입력해주세요.'></input>
        </form>
        <button onClick={onSubmit}>등록하기</button>
      </section>
    </>
  )
}

export default TodoList