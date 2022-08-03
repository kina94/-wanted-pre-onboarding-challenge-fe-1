import React, { useEffect, useState } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import TodoList from './todoList';
import Todo from './todo';
import './todos.css'
const USER_TOKEN = JSON.parse(localStorage.getItem('token'))
function TodoContainer() {
    const [todoList, setTodoList] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        if (!USER_TOKEN) {
            navigate('/login')
        } else {
            getTodoList()
        }
    }, [])

    //todoList 불러오기
    const getTodoList = async() => {
        try {
            const res = await axios.get('/todos',
            {headers:{Authorization: USER_TOKEN}})
            if (res.status === 200) {
                setTodoList(res.data.data)
            }
          } catch (error) {
            alert(error.response.data.details)
          }
    }

    //로그아웃 이벤트
    const onClickLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <section className='wrapper'>
            <header>
                <button
                    onClick={onClickLogout}>로그아웃</button>
            </header>
            <section className='todo-body'>
                <section className='todo-list'>
                    <h1>Todo List</h1>
                    <hr></hr>
                    <TodoList USER_TOKEN={USER_TOKEN}
                    getTodoList={getTodoList}
                    setTodoList={setTodoList}
                    todoList={todoList}
                    ></TodoList>
                </section>
                <section className='todos'>
                    <h1>Todo Info</h1>
                    <hr></hr>
                    <Routes>
                        <Route exact={true} path='/' element={<>Todo List에서 상세 조회할 할일을 선택해주세요</>} />
                        <Route exact={true} path=':num' element={<Todo/>} />
                    </Routes>
                </section>
            </section>
        </section>
    )
}

export default TodoContainer