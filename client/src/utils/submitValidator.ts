import { User } from "../types/auth";

export const submitValidator = (submitForm: User) => {
  const { email, password } = submitForm;
  if (email === "" || password === "") {
    return false;
  }
  if (password.length >= 8 && email.includes("@") && email.includes(".")) {
    return true;
  } else {
    return false;
  }
};

export const EMAIL_VALIDATION = {
  value: /\w+@\w+\.\w+(\.\w+)?/,
  message: "올바른 이메일 형식을 입력해주세요.",
};

export const PASSWORD_VALIDATION = {
  value: /.{8,16}/,
  message: "패스워드는 8자 이상입니다.",
};
