import React from "react";
import { useLocation } from "react-router-dom";
import { User } from "../types/auth";
import { submitValidator } from "../utils/submitValidator";
interface Props {
  title: string;
  user: User;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSignUp: () => void;
  onClickLogin?: () => void;
}

function Auth({
  title,
  user,
  onInputChange,
  onClickSignUp,
  onClickLogin,
}: Props) {
  const location = useLocation().pathname;
  {
    return (
      <section className="h-full container mx-auto flex flex-wrap">
        <div className="w-full bg-white min-h-500 md:w-4/12 m-auto shadow-lg rounded-md p-5">
          <h1 className="text-3xl text-left p-2 font-bold leading-normal mt-0 mb-2 text-slate-500">
            {title}
          </h1>
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
            {location === "/login" && (
              <button
                className={
                  submitValidator(user)
                    ? "mr-2 text-indigo-500 border border-solid border-indigo-500 hover:bg-indigo-500 hover:text-white active:bg-teal-600 font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    : "mr-2 bg-slate-100 text-slate-400 active:bg-slate-50 font-bold uppercase text-sm px-6 py-3 rounded shadow focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                }
                type="submit"
                disabled={submitValidator(user) ? false : true}
                onClick={onClickLogin}
              >
                Login
              </button>
            )}
            <button
              className={
                location === "/sign_up" && !submitValidator(user)
                  ? "mr-2 bg-slate-100 text-slate-400 active:bg-slate-50 font-bold uppercase text-sm px-6 py-3 rounded shadow focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  : "mr-2 bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              }
              onClick={onClickSignUp}
              disabled={
                location === "/sign_up" && !submitValidator(user) ? true : false
              }
            >
              {location === "/sign_up" ? 'Submit' : 'SignUp'}
            </button>
          </div>
        </div>
      </section>
    );
  }
}

export default Auth;
