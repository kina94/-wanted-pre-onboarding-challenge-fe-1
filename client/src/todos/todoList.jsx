import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function TodoList({ getTodoList, todoList, USER_TOKEN, getTodoById }) {
  const navigate = useNavigate()
  const [newTodo, setNewTodo] = useState({
    title: '',
    content: '',
  })

  const onClickTodo = (e) =>{
    const id = e.target.closest('li').id
    navigate(`/${id}`)
  }

  const onChange = (e) => {
    setNewTodo({ ...newTodo, [e.target.id]: e.target.value })
  }

  const onSubmit = async () => {
    try {
      const res = await axios.post('/todos',
        newTodo,
        { headers: { Authorization: USER_TOKEN } })
      if (res.status === 200) {
        getTodoList()
      }
    } catch (error) {
      alert(error)
    }
  }

  const onClickDelete = async (e) => {
    const id = e.target.closest('li').id
    try {
      const res = await axios.delete(`/todos/${id}`,
        { headers: { Authorization: USER_TOKEN } })
      if (res.status === 200) {
        getTodoList()
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      <section className='todos-content'>
        <ul className='items'>
          {
            Object.values(todoList).map((item, key) => (
              <li className='items__row' id={item.id}>
                <div className='item' onClick={onClickTodo}>
                  {item.title}
                  <div className='button-group'>
                    <button
                      onClick={onClickDelete}>
                      <i className="fas fa-pen"></i>
                    </button>
                    <button
                      onClick={onClickDelete}>
                      <i className="fas fa-trash-alt"></i>
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
        <form>
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