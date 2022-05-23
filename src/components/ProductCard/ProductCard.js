import React, { useEffect, useState } from "react";
import styles from "./ProductCard.module.scss";
import axios from "axios";
import Button from "../Button/Button";

const ProductCard = ({ product }) => {
  const [active, setActive] = useState(false);
  const [childs, setChilds] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const FetchChilds = async () => {
      const result = await axios.get(
        `http://localhost:5000/api/getChilds?id_product=${product.id_product}`
      );
      setChilds(result.data);
    };
    if (active && !childs?.length) {
      FetchChilds();
    }
    if (!active) {
      setChilds([]);
      setSelected("");
    }
  }, [active]);

  const select = (id) => {
    if (selected === id) {
      setSelected("");
      return;
    }
    setSelected(id);
  };
  return (
    <div className={styles.cardWrapper}>
      <div
        className={styles.content}
        onClick={() => {
          setActive(!active);
        }}
      >
        <div className={styles.product}>{product.product_name}</div>
        <div className={styles.price}>{product.price} руб.</div>
      </div>
      {active && childs?.length !== 0 && (
        <div className={styles.childs}>
          {childs.map((item) => (
            <div
              className={`${styles.circle} ${
                selected === item.id_child ? styles.selected : ""
              }`}
              onClick={() => {
                select(item.id_child);
              }}
            >
              {item.size}
            </div>
          ))}
          <Button text="В корзину" disabled={selected ? false : true} />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
