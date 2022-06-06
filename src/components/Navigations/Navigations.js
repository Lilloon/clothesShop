import React from "react";
import styles from "./Navigations.module.scss";
import { translate } from "../../locales/ru";

const Navigations = ({ items = [], onClick = () => {}, selected = false }) => {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <p
          key={item.id}
          className={`${styles.navItem} ${
            selected === item.id ? styles.selected : ""
          }`}
          onClick={() => {
            onClick(item.id);
          }}
        >
          {translate[item.name] || item.name}
        </p>
      ))}
    </div>
  );
};

export default Navigations;
