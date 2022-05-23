import React from "react";
import styles from "./Header.module.scss";
import HeaderDrop from "../HeaderDrop/HeaderDrop";
import MiniCart from "../MiniCart/MiniCart";

const Header = () => {
  return (
    <header>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>CLOTHES SHOP</h1>
        <div className={styles.rightSide}>
          <MiniCart />
          <HeaderDrop />
        </div>
      </div>
    </header>
  );
};

export default Header;
