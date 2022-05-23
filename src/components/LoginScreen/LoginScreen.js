import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import styles from "./LoginScreen.module.scss";

const LoginScreen = () => {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <div className={styles.wrapper}>
      <LoginForm />
    </div>
  );
};

export default LoginScreen;
