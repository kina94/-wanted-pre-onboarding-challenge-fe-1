import React from "react";
import { useForm } from "react-hook-form";
import animationData from "../resource/animation/56438-man-with-task-list.json";
import { useNavigate } from "react-router-dom";
import Animation from "../components/animation/Animation";
import Auth from "../components/auth/Auth";
import Button from "../components/button/Button";
import Body from "../components/layout/Body";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Wrapper from "../components/layout/Wrapper";
import { useSignUp } from "../hooks/query/auth";
import { User } from "../types/auth";

function SignUp() {
  const navigate = useNavigate();
  const { doSignUp, errorState } = useSignUp({
    errorMessage: "아이디 혹은 비밀번호 형식을 확인해주세요.",
  });

  const loginForm = useForm<User>({
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isValid, errors },
  } = loginForm;

  // 회원가입 페이지로 이동
  const handleSignUpSubmit = (data: User) => {
    isValid && doSignUp.mutate(data);
  };

  return (
    <Wrapper>
      <Header title="SignUp" />
      <Body>
        <Animation
          animationData={animationData}
          width="300px"
          height={
            errors.email?.message || errors.password?.message ? "280px" : "auto"
          }
        />
        <p className="text-slate-500 font-bold">
          Join and Manage your tasks and todos
        </p>
      </Body>
      <Footer>
        <form className="form" onSubmit={handleSubmit(handleSignUpSubmit)}>
          <Auth useForm={loginForm} />
          <div className="flex justify-end">
            <Button className="white" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button
              className={isValid ? "pink" : "slate"}
              type="submit"
              disabled={!isValid}
            >
              Submit
            </Button>
          </div>
        </form>
      </Footer>
      {errorState !== "" && <div>{errorState}</div>}
    </Wrapper>
  );
}

export default SignUp;
