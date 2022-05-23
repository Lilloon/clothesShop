import React from "react";
import classes from "./Input.module.scss";

const Input = ({
  type = "default",
  name,
  value = "",
  onChange,
  placeholder = "",
}) => {
  const onChangeInput = (e) => {
    onChange(name, e.target.value);
  };
  return (
    <input
      placeholder={`Введите ${placeholder}`}
      className={classes.input}
      value={value}
      onChange={onChangeInput}
      type={type === "password" ? "password" : "text"}
    />
  );
};

export default Input;
