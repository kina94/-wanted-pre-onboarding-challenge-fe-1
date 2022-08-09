import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { callLoginApi, callSignUpApi } from "../../service/authService";
import { User } from "../../types/auth";
import { submitValidator } from "../../utils/submitValidator";
import Header from "../layout/Header";
interface Props {
  title: string;
}

function Auth({ title }: Props) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({ email: "", password: "" });
  const { pathname } = useLocation()

  //인풋 이벤트
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  //로그인 버튼 클릭
  const onLoginClick = async () => {
    const response = await callLoginApi(user);
    localStorage.setItem("token", response?.data.token);
    navigate("/");
  };

  // 회원가입 페이지로 이동
  const onSignUpClick = (): void => {
    navigate("/sign_up");
  };

  // 회원가입하기
  const onSignUpSubmit = async() =>{
    const response = await callSignUpApi(user);
    alert(response?.data.message);
    navigate("/login");
  }

  //토큰이 있는 경우 Login 또는 SignUp 페이지 접근 시 리디렉션
  useEffect(() => {
    const USER_TOKEN: string | null = localStorage.getItem("token");
    if (USER_TOKEN) {
      navigate("/");
    }
  });

  {
    return (
      <div className="w-full bg-white min-h-500 md:w-4/12 m-auto shadow-lg rounded-md p-5">
        <Header title={title}/>
        <form className="form">
          <div className="relative flex w-full flex-wrap items-stretch mb-3">
            <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
              <i className="fas fa-user"></i>
            </span>
            <input
              type="text"
              placeholder="이메일을 입력해주세요."
              onChange={onInputChange}
              autoComplete="off"
              id="email"
              className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10"
            />
          </div>
          <div className="relative flex w-full flex-wrap items-stretch mb-3">
            <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
              <i className="fas fa-lock"></i>
            </span>
            <input
              type="password"
              id="password"
              onChange={onInputChange}
              autoComplete="off"
              placeholder="비밀번호를 입력해주세요."
              className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10"
            />
          </div>
        </form>

        <div className="flex justify-end">
          {
            pathname === '/login'
          }
          {pathname === "/login" && (
            <button
              className={
                submitValidator(user)
                  ? "mr-2 text-indigo-500 border border-solid border-indigo-500 hover:bg-indigo-500 hover:text-white active:bg-teal-600 font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  : "mr-2 bg-slate-100 text-slate-400 active:bg-slate-50 font-bold uppercase text-sm px-6 py-3 rounded shadow focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              }
              type="submit"
              disabled={submitValidator(user) ? false : true}
              onClick={onLoginClick}
            >
              Login
            </button>
          )}
          <button
            className={
              pathname === "/sign_up" && !submitValidator(user)
                ? "mr-2 bg-slate-100 text-slate-400 active:bg-slate-50 font-bold uppercase text-sm px-6 py-3 rounded shadow focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                : "mr-2 bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            }
            onClick={pathname === '/sign_up' ? onSignUpSubmit : onSignUpClick}
            disabled={
              pathname === "/sign_up" && !submitValidator(user) ? true : false
            }
          >
            {pathname === "/sign_up" ? "Submit" : "SignUp"}
          </button>
        </div>
      </div>
    );
  }
}

export default Auth;
