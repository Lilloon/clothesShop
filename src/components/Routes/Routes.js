import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginScreen from "../LoginScreen/LoginScreen";
import Main from "../Main/Main";

const MyRoutes = () => (
  <Routes>
    <Route exact path="/" element={<Main />} />
    <Route path="/login" element={<LoginScreen />} />
  </Routes>
);

export default MyRoutes;
