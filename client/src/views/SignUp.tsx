import React from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../components/auth/Auth";
import { callSignUpApi } from "../service/authService";
import { User } from "../types/auth";

function SignUp() {
  const navigate = useNavigate();

  const handleSignUpSubmit = async (data: User) => {
    const response = await callSignUpApi(data);
    alert(response?.data.message);
    navigate("/login");
  };

  return <Auth title="SignUp" onSubmit={handleSignUpSubmit} />;
}

export default SignUp;
