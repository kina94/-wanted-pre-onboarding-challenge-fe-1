import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
function Wrapper({ children }: Props) {
  return (
    <div className="overflow-hidden relative w-full h-full xl:w-[450px] xl:h-[670px] bg-white m-auto shadow-lg rounded-md p-5">
      {children}
    </div>
  );
}

export default Wrapper;
