import axios from 'axios'
import React, { useState } from 'react'

function TodoList({getTodoList, todoList, USER_TOKEN}) {
  const [newTodo, setNewTodo] = useState({
    title:'',
    content:'',
  })
  const onChange = (e) =>{
    setNewTodo({...newTodo, [e.target.id]:e.target.value})
  }

  const onSubmit = async() =>{
    try {
      const res = await axios.post('/todos',
      newTodo,
      {headers:{Authorization: USER_TOKEN}})
      if (res.status === 200) {
        getTodoList()
      }
    } catch (error) {
      alert(error)
    }
  }

  console.log(todoList)
  return (
    <>
      <section className='todo-content'>
        {
          todoList.map(item=>(
            <div>
            {item.title}
            </div>
          ))
        }
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