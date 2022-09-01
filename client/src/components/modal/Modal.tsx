import React, { ReactNode, useEffect } from "react";
interface Props {
  children: ReactNode;
}
function Modal({ children }: Props) {
  return (
    <div className="fixed z-10 left-0 top-0 w-full h-full animation-[fadein 0.5s forwards] bg-black bg-opacity-50">
      <div className="absolute opacity-100 bg-white rounded-lg w-11/12 h-auto xl:w-[450px] xl:h-[auto] p-[2em] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
}

export default Modal;
