import React, { ReactNode } from 'react'
interface Props {
    title: string,
    children?: ReactNode,
}

function Header({title, children}: Props) {
  return (
    <header className="flex justify-between items-center">
    <h1 className="text-3xl text-right p-2 font-bold leading-normal mt-0 mb-2 text-slate-500">
      {title}
    </h1>
    {children}
  </header>
  )
}

export default Header