import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./OrderDetails.module.scss";

const normalizeDateStr = (str) => (str.toString().length < 2 ? `0${str}` : str);

const fields = ["кол-во", "наименование", "цена", "размер", "id товара"];

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  const { first_name, second_name, middle_name, address } = user;
  const [orderDetails, setOrderDetails] = useState({});
  const {
    items = [],
    order_creation_date,
    order_status,
    amount,
    total_price,
  } = orderDetails;
  const date = new Date(order_creation_date);
  const { search } = location;
  const id_order = search.split("=")[1];
  useEffect(() => {
    const fetchOrder = async () => {
      if (id_order) {
        const orderData = await axios.get(
          "http://localhost:5000/api/getOrderDetails",
          {
            params: {
              id_order,
            },
          }
        );
        setOrderDetails(orderData.data);
      }
    };
    fetchOrder();
  }, [id_order]);

  const back = () => {
    navigate("/cabinet/orders");
  };
  return (
    <div className={styles.orderDetails}>
      <span className={styles.back} onClick={back}>
        НАЗАД
      </span>
      <h1>
        номер заказа: <span>{id_order}</span>
      </h1>
      <h1>
        фио заказчика:{" "}
        <span>
          {second_name} {first_name} {middle_name}
        </span>
      </h1>
      <h1>
        адрес доставки: <span>{address}</span>
      </h1>
      <h1>
        статус заказа: <span>{order_status}</span>
      </h1>
      <h1>
        Дата заказа:{" "}
        <span>
          {normalizeDateStr(date.getDate())}.
          {normalizeDateStr(date.getMonth() + 1)}.
          {normalizeDateStr(date.getFullYear())}
        </span>
      </h1>
      <table>
        <thead>
          {fields.map((item) => (
            <th>{item}</th>
          ))}
        </thead>
        <tbody>
          {items.map((itemRow) => {
            const itemsArr = Object.entries(itemRow);
            return (
              <tr>
                {itemsArr.map(([key, itemValue]) => (
                  <td>{itemValue}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.rightAllign}>
        <h1>
          Общее кол-во: <span>{amount}</span>
        </h1>
        <h1>
          сумма заказа: <span>{total_price} рублей</span>
        </h1>
      </div>
    </div>
  );
};

export default OrderDetails;
