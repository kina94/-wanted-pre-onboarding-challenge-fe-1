import React from "react";
import Lottie from "react-lottie";
interface Props<T> {
  animationData: T;
  width: string;
  height: string;
}
function Animation<T>({ animationData, width, height }: Props<T>) {
  const options = {
    animationData: animationData,
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={options} width={width} height={height}></Lottie>;
}

export default Animation;
