import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { callGetTodoById, callUpdateTodo } from '../../service/todoService.js'

function Todo({todoModify, USER_TOKEN}) {
  const params = useParams()
  const navigate = useNavigate()
  const [todo, setTodo] = useState({})

  //투두 상세 정보 불러오기
  const getTodo = async(id) =>{
    const response = await callGetTodoById(USER_TOKEN, id)
    if(response){
      setTodo(response.data.data)
    }
  }

  // 수정하기 버튼 클릭
  const onClickModify = async() => {
    const response = await callUpdateTodo(USER_TOKEN, params.num, todo)
    todoModify(response.data.data)
    navigate(`/${params.num}`)
  }

  const onChange = (e) =>{
    setTodo({...todo, [e.target.id] : e.target.value})
  }
 
  useEffect(() => {
    getTodo(params.num)
  }, [params.num])

  // 수정 / 상세보기 url에 따라 뷰 전환
  const switchViewByMode = () => {
    if (params['*'] === 'edit') {
      return (
        <div className='todo-edit'>
          <form>
            <input type='text' id='title' value={todo?.title} onChange={onChange}></input>
            <input type='text' id='content' value={todo?.content} onChange={onChange}></input>
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