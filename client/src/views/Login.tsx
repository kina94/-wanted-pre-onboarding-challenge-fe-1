import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import animationData from "../resource/animation/56438-man-with-task-list.json";
import { useNavigate } from "react-router-dom";
import Animation from "../components/animation/Animation";
import Auth from "../components/auth/Auth";
import Button from "../components/button/Button";
import Body from "../components/layout/Body";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Wrapper from "../components/layout/Wrapper";
import { useLogin } from "../hooks/query/auth";
import { User } from "../types/auth";

function Login() {
  const navigate = useNavigate();
  const { doLogin, errorState } = useLogin({
    errorMessage: "아이디 혹은 비밀번호가 잘못되었습니다.",
  });

  const loginForm = useForm<User>({
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isValid, errors },
  } = loginForm;

  // 회원가입 페이지로 이동
  const onSignUpClick = () => {
    navigate("/sign_up");
  };

  const handleLoginSubmit = (data: User) => {
    isValid && doLogin.mutate(data);
  };

  return (
    <Wrapper>
      <Header title="Login" />
      <Body>
        <Animation
          animationData={animationData}
          width="300px"
          height={
            errors.email?.message || errors.password?.message ? "280px" : "auto"
          }
        />
        <p className="text-slate-500 font-bold">Manage your tasks and todos!</p>
      </Body>
      <Footer>
        <form className="form" onSubmit={handleSubmit(handleLoginSubmit)}>
          <Auth useForm={loginForm} />
          <div className="flex justify-end">
            <Button
              className={isValid ? "pink" : "slate"}
              type="submit"
              disabled={!isValid}
            >
              Login
            </Button>
            <Button className="white" onClick={onSignUpClick}>
              SignUp
            </Button>
          </div>
        </form>
      </Footer>
      {errorState !== "" && <div>{errorState}</div>}
    </Wrapper>
  );
}

export default Login;
