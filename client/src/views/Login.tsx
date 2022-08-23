import React from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../components/auth/Auth";
import { callLoginApi } from "../service/authService";
import { User } from "../types/auth";

function Login() {
  const navigate = useNavigate();

  //로그인 버튼 클릭
  const handleLoginSubmit = async (data: User) => {
    const response = await callLoginApi(data);
    if (response) {
      localStorage.setItem("token", response?.data.token);
      navigate("/");
    }
  };

  return <Auth title="Login" onSubmit={handleLoginSubmit} />;
}

export default Login;
