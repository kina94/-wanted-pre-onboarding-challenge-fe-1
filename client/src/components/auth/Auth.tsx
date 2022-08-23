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
import Button from "../button/Button";
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
              <Button
                className={isValid ? "indigo" : "slate"}
                type="submit"
                disabled={!isValid}
              >
                Login
              </Button>
            )}

            {pathname === "/sign_up" ? (
              <Button
                className={isValid ? "indigo" : "slate"}
                type="submit"
                disabled={!isValid}
              >
                Submit
              </Button>
            ) : (
              <Button className="indigo" onClick={onSignUpClick}>
                SignUp
              </Button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default Auth;
