import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../views/Login";
import SignUp from "../views/SignUp";
import Todos from "../views/Todos";

function SetupRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Todos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign_up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default SetupRouter;
