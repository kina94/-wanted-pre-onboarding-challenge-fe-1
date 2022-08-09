import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { callLoginApi } from "../service/authService";
import { User } from "../types/auth";
import Auth from "../components/Auth";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({ email: "", password: "" });

  //input event
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  //로그인 버튼 클릭
  const handleLoginSubmit = async () => {
    const response = await callLoginApi(user);
    if (response) {
      localStorage.setItem("token", response.data.token);
      navigate("/");
    }
  };

  // 회원가입 버튼 클릭
  const handleSignUpButton = (): void => {
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
      onInputChange={handleInputChange}
      onClickSignUp={handleSignUpButton}
      onClickLogin={handleLoginSubmit}
    />
  );
}

export default Login;
