import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Optional } from "../../types/optional";

interface ButtonStyle {
  className: "indigo" | "slate";
}

interface ButtonProps extends ButtonStyle {
  className: "indigo" | "slate";
  type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled: React.ButtonHTMLAttributes<HTMLButtonElement>["disabled"];
  onClick: React.DOMAttributes<HTMLButtonElement>["onClick"];
  children: ReactNode;
}

type OptionalProps = Optional<ButtonProps>;

export default function Button({ className, ...OptionalProps }: OptionalProps) {
  return (
    <button
      className={className === "indigo" ? indigo : white}
      {...OptionalProps}
    >
      {OptionalProps.children}
    </button>
  );
}

const indigo =
  "mr-2 text-indigo-500 border border-solid border-indigo-500 hover:bg-indigo-500 hover:text-white active:bg-teal-600 font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150";
const white =
  "mr-2 bg-slate-100 text-slate-400 active:bg-slate-50 font-bold uppercase text-sm px-6 py-3 rounded shadow focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150";
