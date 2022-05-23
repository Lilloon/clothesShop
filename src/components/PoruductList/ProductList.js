import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductList.module.scss";

const ProductList = ({ products = [] }) => {
  return (
    <div className={styles.listWrapper}>
      {products.length !== 0 &&
        products.map((item) => <ProductCard product={item} />)}
    </div>
  );
};

export default ProductList;
