import React, { ReactElement, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { callGetTodoById, callUpdateTodo } from '../service/todoService';
import { Todo } from "../types/todo";

interface Props {
  todoModify: (todo: Todo) => void;
}

function TodoInfo({todoModify}:Props) {
  const {num, '*':action} = useParams()
  const navigate = useNavigate()
  const [todo, setTodo] = useState<Todo>(
    {
      title: "",
      content: "",
      createdAt: "",
      updatedAt: "",
      id: "",
    });

  //투두 상세 정보 불러오기
  const getTodo = async(id?: string) =>{
    const response = await callGetTodoById(id)
    if(response){
      setTodo(response.data.data)
    }
  }

  // 수정하기 버튼 클릭
  const onClickModify = async() => {
    const response = await callUpdateTodo(num, todo)
    todoModify(response!.data.data)
    navigate(`/${num}`)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>):void =>{
    setTodo({...todo, [e.target.id] : e.target.value})
  }
 
  useEffect(() => {
    getTodo(num)
  }, [num])

    // 수정 / 상세보기 url에 따라 뷰 전환
    const switchViewByMode = (): ReactElement => {
      if (action === 'edit') {
        return (
          <div className='todo-edit'>
            <form>
              <input type='text' id='title' value={todo?.title} onChange={onChange}></input>
              <input type='text' id='content' value={todo?.content} onChange={onChange}></input>
            </form>
            <button onClick={onClickModify}>수정하기</button>
            <button onClick={()=>navigate(`/${num}`)}>취소하기</button>
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

export default TodoInfo