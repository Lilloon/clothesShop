import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Orders.module.scss";
import Order from "./Order";

const OrdersList = () => {
  const { user } = useSelector((state) => state.userReducer);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const orders = await axios.get("http://localhost:5000/api/getOrders", {
          params: {
            id_client: user.id_client,
          },
        });
        if (orders?.data) {
          setOrderList([...orders?.data.orders]);
        }
      }
    };
    fetchOrders();
  }, [user]);

  return (
    <div className={styles.OrdersListWrapper}>
      {orderList.map((item) => (
        <div className={styles.orderItem}>
          <Order item={item} />
        </div>
      ))}
    </div>
  );
};

export default OrdersList;
