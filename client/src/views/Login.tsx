import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { callLoginApi } from "../service/authService";
import { User } from "../types/auth";
import Auth from "../components/Auth";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({ email: "", password: "" });

  //input event
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  //로그인 버튼 클릭
  const onLoginSubmit = async () => {
    const response = await callLoginApi(user);
    if (response) {
      localStorage.setItem("token", response.data.token);
      navigate("/");
    }
  };

  // 회원가입 버튼 클릭
  const onClickSignUp = (): void => {
    navigate("/sign_up");
  };

  useEffect(() => {
    const USER_TOKEN: string | null = localStorage.getItem("token");
    if (USER_TOKEN) {
      navigate("/");
    }
  });

  return (
    <Auth
      title="Login"
      user={user}
      handleInputChange={onChange}
      handleClick={onClickSignUp}
      handleSubmit={onLoginSubmit}
    />
  );
}

export default Login;
