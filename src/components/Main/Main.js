import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "../PoruductList/ProductList";
import styles from "./Main.module.scss";

const Main = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await axios.get(
        "http://localhost:5000/api/getAllProducts"
      );
      setData(result);
    };
    fetchProducts();
  }, []);
  return (
    <div className={styles.wrapper}>
      <ProductList products={data.data} />
    </div>
  );
};

export default Main;
