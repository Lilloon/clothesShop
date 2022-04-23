import React from "react";
import classes from "./Input.module.scss";

const Input = ({ type, name, value = "", onChange }) => {
  const onChangeInput = (e) => {
    onChange(name, e.target.value);
  };
  console.log(type);
  return (
    <input
      placeholder={`Введите ${name}`}
      className={classes.input}
      value={value}
      onChange={onChangeInput}
    />
  );
};

export default Input;
