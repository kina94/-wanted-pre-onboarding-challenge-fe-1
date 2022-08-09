import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../components/Auth";
import { callSignUpApi } from "../service/authService";
import { User } from "../types/auth";

function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({ email: "", password: "" });

  // 회원가입 버튼 클릭
  const handleSignUpSubmit = async () => {
    const response = await callSignUpApi(user);
    if (response) {
      alert(response.data.message);
      navigate("/login");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  return (
    <Auth
      title="SignUp"
      user={user}
      onInputChange={handleInputChange}
      onClickSignUp={handleSignUpSubmit}
    />
  );
}

export default SignUp;
