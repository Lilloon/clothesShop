import React from "react";
import styles from "./Orders.module.scss";
import { useNavigate } from "react-router-dom";

const normalizedDate = (date) => {
  if (date.toString().length < 2) return `0${date}`;
  return `${date}`;
};

const Order = ({ item }) => {
  const { id_order, order_creation_date, order_status, total_price } = item;
  const date = new Date(order_creation_date);
  const navigate = useNavigate();

  const toOrderDetails = () => {
    navigate(`/cabinet/orders/orderDetails?id_order=${id_order}`);
  };

  return (
    <div className={styles.orderWrapper} onClick={toOrderDetails}>
      <p className={styles.item}>№{id_order}</p>
      <p className={styles.item}>
        {normalizedDate(date.getDate())}.
        {normalizedDate(Number(date.getMonth()) + 1)}.{date.getFullYear()}
      </p>
      <p className={styles.item}>{total_price} РУБ</p>
      <p className={styles.item}>{order_status}</p>
    </div>
  );
};

export default Order;
