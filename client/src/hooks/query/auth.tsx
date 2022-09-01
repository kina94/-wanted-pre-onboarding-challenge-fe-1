import { AxiosError } from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { callLoginApi, callSignUpApi } from "../../service/authService";
interface Props {
  errorListner?(): void;
}
export const useLogin = ({ errorListner }: Props) => {
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
        errorListner!();
      }
    },
  });

  return { doLogin, errorState };
};

export const useSignUp = ({ errorListner }: Props) => {
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
        errorListner!();
      }
    },
  });

  return { doSignUp, errorState };
};
