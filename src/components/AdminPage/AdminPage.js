import React, { useState, useEffect } from "react";
import classes from "./AdminPage.module.scss";
import axios from "axios";
import Table from "../Table/Table";
import { translate } from "../../locales/ru";
import AddForm from "../AddForm/AddForm";

const AdminPage = ({ category }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fields, setFields] = useState([]);
  const [data, setData] = useState([[]]);
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        `http://localhost:5000/api/getData?category=${category}`
      );
      setFields(result.data.fields || []);
      setData(result.data.items || [[]]);
    }
    fetchData();
    setIsEditing(false);
  }, [category]);

  const refreshTable = async () => {
    const result = await axios.get(
      `http://localhost:5000/api/getData?category=${category}`
    );
    setFields([...result.data.fields] || []);
    setData(JSON.parse(JSON.stringify(result.data.items)) || [[]]);
  };

  // const onDelete = async ({ row }) => {
  //   let additionalId = null;
  //   if (category === "parent_product") {
  //     additionalId = "id_product";
  //   }
  //   let mainIdIndex = null;
  //   fields.forEach((item, index) => {
  //     if (
  //       `id_${category}`.includes(item.name) ||
  //       additionalId.includes(item.name)
  //     )
  //       mainIdIndex = index;
  //   });
  //   await axios.delete('http://localhost:5000/api/deleteCategoryItem', {params: {}})
  // };

  useEffect(() => {}, [data]);
  return (
    <>
      <div className={classes.header}>
        <h1>{translate[category]}</h1>
        {category !== "order" && (
          <div
            className={classes.plus}
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            +
          </div>
        )}
      </div>
      {isEditing && <AddForm category={category} refreshTable={refreshTable} />}
      <Table
        // onDelete={onDelete}
        refreshTable={refreshTable}
        fields={fields}
        items={data}
      />
    </>
  );
};

export default AdminPage;
