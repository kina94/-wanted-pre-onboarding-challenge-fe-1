import './App.css';
import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import LoginContainer from './auth/loginContainer';
import SignUpContainer from './auth/signUpContainer';
import TodoContainer from './todos/todoContainer';

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
