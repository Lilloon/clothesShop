import React from "react";
import styles from "./Table.module.scss";
import { translate } from "../../locales/ru";

const Table = ({ fields = [[]], items = [[]] }) => {
  return (
    <table>
      <thead>
        {fields.map((item) => (
          <th>{translate[item.name] || item.name}</th>
        ))}
      </thead>
      <tbody>
        {items.map((itemRow) => (
          <tr>
            {itemRow.map((itemValue) => (
              <td>{itemValue}</td>
            ))}
            <td className={styles.delete}> УДАЛИТЬ </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
