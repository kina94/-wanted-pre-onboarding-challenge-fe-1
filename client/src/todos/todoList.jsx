import axios from 'axios'
import React, { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { callCreateTodo, callDeleteTodo } from '../service/todoService';

function TodoList({todoAddOrUpdate, todoDelete, todoList, USER_TOKEN }) {
  const formRef = useRef()
  const params = useParams()
  const navigate = useNavigate()
  const [newTodo, setNewTodo] = useState({
    title: '',
    content: '',
  })

  const onChange = (e) => {
    setNewTodo({ ...newTodo, [e.target.id]: e.target.value })
  }

  const onClickTodo = (e) => {
    const clickedId = e.target.closest('li').id
    if(e.target.id === 'edit'){
      navigate(`/${clickedId}/edit`)
    } else {
      navigate(`/${clickedId}`)
    }
  }

  const onClickDelete = async(e) => {
    e.stopPropagation()
    const clickedId = e.target.closest('li').id
    callDeleteTodo(USER_TOKEN, clickedId)
    todoDelete(clickedId)
    if (params['*'].includes(clickedId)) {
      navigate('/')
    }
  }

  const onClickCreate = async() =>{
    const response = await callCreateTodo(USER_TOKEN, newTodo)
    todoAddOrUpdate(response.data.data)
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
                    <button id='edit'
                      onClick={onClickTodo}>
                      <i className="fas fa-pen" id='edit'></i>
                    </button>
                    <button id='delete'
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
        <button onClick={onClickCreate}>등록하기</button>
      </section>
    </>
  )
}

export default TodoList