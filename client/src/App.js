import './App.css';
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginContainer from './pages/auth/loginContainer';
import SignUpContainer from './pages/auth/signUpContainer';
import TodoContainer from './pages/todos/todoContainer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/*' element={<TodoContainer/>}/>
        <Route path='/login' element={<LoginContainer/>}/>
        <Route path='/sign_up' element={<SignUpContainer/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
