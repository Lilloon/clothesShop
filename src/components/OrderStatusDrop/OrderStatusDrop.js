import axios from "axios";
import React, { useState } from "react";
import styles from "./OrderStatusDrop.module.scss";

const statuses = [
  { id: 1, text: "Ожидает подтверждения" },
  { id: 2, text: "Подтверждён" },
  { id: 3, text: "В пути" },
  { id: 4, text: "Доставлен" },
  { id: 5, text: "Отклонён" },
];

const setDefault = (defaultStatus) =>
  statuses.find((item) => item.text === defaultStatus);

const OrderStatusDrop = ({ current = "", refreshTable, id_order }) => {
  const [selected, setSelected] = useState(setDefault(current));
  const [isOpen, setIsOpen] = useState(false);

  const onClick = async (item) => {
    setIsOpen(false);
    setSelected(item);
    await axios.put("http://localhost:5000/api/updateOrderStatus", {
      text: item.text,
      id_order,
    });
    refreshTable();
  };
  if (!selected) return null;
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.header}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {selected.text}
      </div>
      {isOpen && (
        <div className={styles.list}>
          {statuses.map((status) =>
            status.id !== selected.id ? (
              <div
                className={styles.item}
                onClick={() => {
                  onClick(status);
                }}
              >
                {status.text}
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default OrderStatusDrop;
