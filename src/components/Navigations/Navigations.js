import React from "react";
import styles from "./Navigations.module.scss";
import { Link } from "react-router-dom";

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
          {item.name}
        </p>
      ))}
    </div>
  );
};

export default Navigations;
