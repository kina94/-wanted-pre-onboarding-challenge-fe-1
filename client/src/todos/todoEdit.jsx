import React from 'react'

function TodoEdit({todo, getTodoById}) {
  return (
    <section className='todo-content'>
      <div className='todo'>
        <h3>{todo.title}</h3>
        <p>{todo.content}</p>
      </div>
    </section>
  )
}

export default TodoEdit