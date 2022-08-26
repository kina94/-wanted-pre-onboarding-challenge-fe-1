import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { callLoginApi, callSignUpApi } from "../../service/authService";
interface Props {
  errorMessage: string;
  errorCallBackFunction?(): void;
}
export const useLogin = ({ errorMessage, errorCallBackFunction }: Props) => {
  const [errorState, setErrorState] = useState("");
  const navigate = useNavigate();
  const doLogin = useMutation(callLoginApi, {
    onSuccess: (data) => {
      localStorage.setItem("token", data?.data.token);
      navigate("/");
    },
    onError: () => {
      setErrorState(errorMessage);
      errorCallBackFunction!();
    },
  });

  return { doLogin, errorState };
};

export const useSignUp = ({ errorMessage }: Props) => {
  const [errorState, setErrorState] = useState("");
  const navigate = useNavigate();
  const doSignUp = useMutation(callSignUpApi, {
    onSuccess: (data) => {
      localStorage.setItem("token", data?.data.token);
      navigate("/");
    },
    onError: () => {
      setErrorState(errorMessage);
    },
  });

  return { doSignUp, errorState };
};
