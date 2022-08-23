import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
interface Props<T> {
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  errors: T;
}
function AuthInput<T>({ type, placeholder, register, errors }: Props<T>) {
  return (
    <input
      type={type}
      autoComplete="off"
      placeholder={placeholder}
      {...register}
      className={errors ? invalidInputStyle : vaildInputStyle}
    />
  );
}

const defaultInputStyle =
  "pl-10 px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border outline-none focus:outline-none focus:shadow-outline w-full ";
const vaildInputStyle = defaultInputStyle + "border-slate-300";
const invalidInputStyle = defaultInputStyle + "border-indigo-400";

export default AuthInput;
