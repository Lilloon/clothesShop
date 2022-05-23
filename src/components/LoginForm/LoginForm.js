import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import styles from "./LoginForm.module.scss";
import { setUser } from "../../actions/userActions";
import { setUserLS } from "../../localStorage/lsUser";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../../actions/authActions";

const LoginForm = ({}) => {
  const [data, setData] = useState({ password: "", phone_number: "" });

  const onChange = (name, value) => {
    const tempData = { ...data };
    tempData[name] = value;
    setData(tempData);
  };
  const dispatch = useDispatch();
  const login = async () => {
    const dataArr = Object.entries(data);
    let isFilled = true;
    dataArr.forEach((item) => {
      const [key, value] = item;
      if (!value) isFilled = false;
    });
    if (!isFilled) return;
    const result = await axios.get("http://localhost:5000/api/login", {
      params: data,
    });
    if (result.data !== "bad :(") {
      dispatch(setUser(result.data));
      setUserLS(result.data);
      dispatch(setIsAuth(true));
      return;
    }
  };
  return (
    <div className={styles.loginWrapper}>
      <h2>Номер телефона</h2>
      <Input
        name={"phone_number"}
        placeholder="номер телефона"
        onChange={onChange}
        value={data.phone_number}
      />
      <h2>Пароль</h2>
      <Input
        name={"password"}
        placeholder="пароль"
        type="password"
        onChange={onChange}
        value={data.password}
      />
      <Button text="Войти" onClick={login} />
    </div>
  );
};

export default LoginForm;
