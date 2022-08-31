import { AxiosError } from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { callLoginApi, callSignUpApi } from "../../service/authService";
interface Props {
  errorCallBackFunction?(): void;
}
export const useLogin = ({ errorCallBackFunction }: Props) => {
  const [errorState, setErrorState] = useState("");
  const navigate = useNavigate();
  const doLogin = useMutation(callLoginApi, {
    onSuccess: (data) => {
      localStorage.setItem("token", data?.data.token);
      navigate("/");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setErrorState(error.response?.data.details);
        errorCallBackFunction!();
      }
    },
  });

  return { doLogin, errorState };
};

export const useSignUp = ({ errorCallBackFunction }: Props) => {
  const [errorState, setErrorState] = useState("");
  const navigate = useNavigate();
  const doSignUp = useMutation(callSignUpApi, {
    onSuccess: (data) => {
      localStorage.setItem("token", data?.data.token);
      navigate("/");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setErrorState(error.response?.data.details);
        errorCallBackFunction!();
      }
    },
  });

  return { doSignUp, errorState };
};
