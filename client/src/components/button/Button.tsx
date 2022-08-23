import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Optional } from "../../types/optional";

interface ButtonStyle {
  className: "indigo" | "slate" | "white" | "pink";
}

interface ButtonProps extends ButtonStyle {
  type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled: React.ButtonHTMLAttributes<HTMLButtonElement>["disabled"];
  onClick: React.DOMAttributes<HTMLButtonElement>["onClick"];
  children: ReactNode;
}

type OptionalProps = Optional<ButtonProps>;

export default function Button({ className, ...OptionalProps }: OptionalProps) {
  const style = (styleName: ButtonStyle["className"]) => {
    switch (styleName) {
      case "indigo":
        return indigo;
      case "white":
        return white;
      case "slate":
        return slate;
      case "pink":
        return pink;
      default:
        return;
    }
  };
  return (
    <button className={style(className!)} {...OptionalProps}>
      {OptionalProps.children}
    </button>
  );
}
const indigo =
  "w-full h-full bg-indigo-500 border border-solid border-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 m-1";
const white =
  "w-full h-full text-pink-500 border border-solid border-pink-500 hover:bg-pink-500 hover:text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none focus:outline-none m-1 ease-linear transition-all duration-150";
const slate =
  "w-full h-full bg-slate-100 text-slate-400 active:bg-slate-50 font-bold uppercase text-sm px-6 py-3 rounded shadow focus:outline-none m-1 ease-linear transition-all duration-150";
const pink =
  "w-full h-full bg-pink-500 border border-solid border-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 m-1";
