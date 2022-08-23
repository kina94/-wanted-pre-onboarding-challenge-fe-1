import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../../types/auth";
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
} from "../../utils/submitValidator";
import { SubmitHandler, useForm } from "react-hook-form";

import Header from "../layout/Header";
import AuthInput from "../form/AuthInput";
import ErrorMessage from "../form/ErrorMessage";
interface Props {
  title: string;
  onSubmit(data: User): Promise<void>;
}

function Auth({ title, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<User>({
    mode: "onChange",
  });

  const navigate = useNavigate();
  // const [user, setUser] = useState<User>({ email: "", password: "" });
  const { pathname } = useLocation();

  // 회원가입 페이지로 이동
  const onSignUpClick = () => {
    navigate("/sign_up");
  };

  const handleOnSubmit: SubmitHandler<User> = async (data) => {
    if (isValid) {
      await onSubmit(data);
    }
  };

  //토큰이 있는 경우 Login 또는 SignUp 페이지 접근 시 리디렉션
  useEffect(() => {
    const USER_TOKEN: string | null = localStorage.getItem("token");
    if (USER_TOKEN) {
      navigate("/");
    }
  });

  {
    return (
      <div className="w-96 bg-white m-auto shadow-lg rounded-md p-5">
        <Header title={title} />
        <form className="form" onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="relative flex w-full flex-wrap items-stretch mb-3">
            <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
              <i className="fas fa-user"></i>
            </span>
            <AuthInput
              type="email"
              placeholder="이메일을 입력해주세요."
              register={register("email", {
                required: true,
                pattern: EMAIL_VALIDATION,
              })}
              errors={errors.email?.message}
            ></AuthInput>
            {errors.email?.message && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>
          <div className="relative flex w-full flex-wrap items-stretch mb-3">
            <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
              <i className="fas fa-lock"></i>
            </span>
            <AuthInput
              type="password"
              placeholder="패스워드를 입력해주세요."
              register={register("password", {
                required: true,
                pattern: PASSWORD_VALIDATION,
              })}
              errors={errors.password?.message}
            ></AuthInput>
            {errors.password?.message && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          <div className="flex justify-end">
            {pathname === "/login" && (
              <button
                className={
                  isValid
                    ? "mr-2 text-indigo-500 border border-solid border-indigo-500 hover:bg-indigo-500 hover:text-white active:bg-teal-600 font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    : "mr-2 bg-slate-100 text-slate-400 active:bg-slate-50 font-bold uppercase text-sm px-6 py-3 rounded shadow focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                }
                type="submit"
                disabled={!isValid}
              >
                Login
              </button>
            )}

            {pathname === "/sign_up" ? (
              <button
                className={
                  isValid
                    ? "mr-3 bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    : "mr-3 bg-slate-100 text-slate-400 active:bg-slate-50 font-bold uppercase text-sm px-6 py-3 rounded shadow focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                }
                type="submit"
                disabled={!isValid}
              >
                Submit
              </button>
            ) : (
              <button
                className="mr-2 bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={onSignUpClick}
              >
                SignUp
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default Auth;
