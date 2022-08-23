import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
function Footer({ children }: Props) {
  return (
    <section className="bg-white absolute w-full left-0 bottom-1 p-5">
      {children}
    </section>
  );
}

export default Footer;
