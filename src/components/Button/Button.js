import React from "react";
import styles from "./Button.module.scss";

const Button = ({ onClick, category, text = "добавить", disabled = false }) => {
  const onEnterPressed = (e) => {
    if (e.target.key === "Enter") {
    }
  };
  return (
    <button
      className={`${styles.button} ${disabled ? styles.disabled : ""}`}
      onKeyPress={onEnterPressed}
      onClick={() => {
        onClick(category);
      }}
    >
      {text}
    </button>
  );
};

export default Button;
