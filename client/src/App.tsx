import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './views/Login';
import SignUp from './views/SignUp';
import TodoList from './views/TodoList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/*' element={<TodoList/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/sign_up' element={<SignUp/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
