import React, { ReactNode } from "react";
interface Props {
  title: string;
  children?: ReactNode;
}

function Header({ title, children }: Props) {
  return (
    <header className="border-b-[1px] border-slate-200 bg-indigo-500 w-full left-0 p-4 absolute top-0 flex justify-between items-center">
      <h1 className="pl-3 text-3xl text-right font-bold leading-normal text-white">
        {title}
      </h1>
      {children}
    </header>
  );
}

export default Header;
