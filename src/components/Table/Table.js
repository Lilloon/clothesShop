import React, { useEffect, useState } from "react";
import styles from "./Table.module.scss";
import { translate } from "../../locales/ru";
import OrderStatusDrop from "../OrderStatusDrop/OrderStatusDrop";

const statuses = [
  "Ожидает подтверждения",
  "Подтверждён",
  "В пути",
  "Доставлен",
  "Отклонён",
];

const Table = ({
  fields = [[]],
  items = [[]],
  refreshTable = () => {},
  onDelete = () => {},
}) => {
  const [data, setData] = useState(items);
  const [f, setF] = useState(fields);
  useEffect(
    () => {
      setData(items);
      setF(fields);
    },
    items,
    fields
  );
  return (
    <table>
      <thead>
        {f.map((item) => (
          <th>{translate[item.name] || item.name}</th>
        ))}
      </thead>
      <tbody>
        {data.map((itemRow) => (
          <tr>
            {itemRow.map((itemValue) => (
              <td>
                {statuses.includes(itemValue) ? (
                  <OrderStatusDrop
                    refreshTable={refreshTable}
                    id_order={itemRow[0]}
                    current={itemValue}
                  />
                ) : (
                  itemValue
                )}
              </td>
            ))}
            <td
              className={styles.delete}
              onClick={() => {
                onDelete({ row: itemRow });
              }}
            >
              {" "}
              УДАЛИТЬ{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
