import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { submitValidator } from '../utils/submitValidator';

function Auth({ onSubmit, onClick, onChange, title, user }) {
  const location = useLocation().pathname
  return (
    <section className='wrapper'>
      <div className='content'>
        <h1>{title}</h1>
        <hr></hr>
        <form>
          <input type='text'
            id='email'
            onChange={onChange}
            placeholder='이메일을 입력해주세요.'></input>
          <input type='password'
            id='password'
            onChange={onChange}

            placeholder='비밀번호를 입력해주세요.'
            autoComplete='off'></input>
        </form>
        <div className='button-group'>
          {
            location === '/login' &&
            <button className="login"
              onClick={onSubmit}
              type='submit'
              form='login-form'
              disabled={submitValidator(user) ? false : true}
              >로그인</button>
          }
          <button className="sign-up"
            onClick={onClick}>회원가입</button>
        </div>
      </div>

    </section>
  )
}

export default Auth