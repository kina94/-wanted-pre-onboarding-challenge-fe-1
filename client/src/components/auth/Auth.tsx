import React from "react";
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
} from "../../utils/submitValidator";
import AuthInput from "./AuthInput";
import ErrorMessage from "../alert/ErrorMessage";
interface Props {
  useForm: any;
}

function Auth({ useForm }: Props) {
  const {
    register,
    formState: { errors },
  } = useForm;

  {
    return (
      <>
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
      </>
    );
  }
}

export default Auth;
