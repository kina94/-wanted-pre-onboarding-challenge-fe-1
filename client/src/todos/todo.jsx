import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Todo({ todo }) {
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