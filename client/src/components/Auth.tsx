import React from "react";
import { useLocation } from "react-router-dom";
import { User } from "../types/auth";
import { submitValidator } from "../utils/submitValidator";
interface Props {
  title: string;
  user: User;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
  handleSubmit?: () => void;
}

function Auth({
  title,
  user,
  handleInputChange,
  handleClick,
  handleSubmit,
}: Props) {
  const location = useLocation().pathname;
  {
    return (
      <section className="h-full container mx-auto flex flex-wrap">
        <div className="w-full bg-white min-h-500 md:w-4/12 m-auto shadow-lg rounded-md p-5">
          <h1 className="text-3xl text-left p-2 font-bold leading-normal mt-0 mb-2 text-blueGray-500">
            {title}
          </h1>
          <form className="form">
            <div className="relative flex w-full flex-wrap items-stretch mb-3">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-user"></i>
              </span>
              <input
                type="text"
                placeholder="이메일을 입력해주세요."
                onChange={handleInputChange}
                autoComplete="off"
                id="email"
                className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10"
              />
            </div>
            <div className="relative flex w-full flex-wrap items-stretch mb-3">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                id="password"
                onChange={handleInputChange}
                autoComplete="off"
                placeholder="비밀번호를 입력해주세요."
                className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10"
              />
            </div>
          </form>

          <div className="flex justify-end">
            {location === "/login" && (
              <button
                className={
                  submitValidator(user)
                    ? "mr-2 text-indigo-500 border border-solid border-indigo-500 hover:bg-indigo-500 hover:text-white active:bg-teal-600 font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    : "mr-2 bg-blueGray-100 text-blueGray-400 active:bg-blueGray-50 font-bold uppercase text-sm px-6 py-3 rounded shadow focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                }
                type="submit"
                disabled={submitValidator(user) ? false : true}
                onClick={handleSubmit}
              >
                Login
              </button>
            )}
            <button
              className={
                location === "/sign_up" && !submitValidator(user)
                  ? "mr-2 bg-blueGray-100 text-blueGray-400 active:bg-blueGray-50 font-bold uppercase text-sm px-6 py-3 rounded shadow focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  : "mr-2 bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              }
              onClick={handleClick}
              disabled={
                location === "/sign_up" && !submitValidator(user) ? true : false
              }
            >
              Sign-up
            </button>
          </div>
        </div>
      </section>
    );
  }
}

export default Auth;
