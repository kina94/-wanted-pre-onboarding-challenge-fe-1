import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
function Body({ children }: Props) {
  return (
    <section className="h-[calc(100%-200px)] pt-[75px] align-middle overflow-scroll">
      {children}
    </section>
  );
}

export default Body;
