import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
}

function ErrorMessage({ children }: Props) {
  return (
    <p className={invalidSpanStyle}>
      <span>
        <i className="fas fa-exclamation-circle"></i>
      </span>
      <span className="ml-1">{children}</span>
    </p>
  );
}

const invalidSpanStyle = "text-indigo-600 text-xs m-1";

export default ErrorMessage;
