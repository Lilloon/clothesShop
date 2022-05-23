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
  }, []);

  const refreshTable = async () => {
    const result = await axios.get(
      `http://localhost:5000/api/getData?category=${category}`
    );
    setFields(result.data.fields || []);
    setData(result.data.items || [[]]);
  };
  return (
    <>
      <div className={classes.header}>
        <h1>{translate[category]}</h1>
        <div
          className={classes.plus}
          onClick={() => {
            setIsEditing(!isEditing);
          }}
        >
          +
        </div>
      </div>
      {isEditing && <AddForm category={category} refreshTable={refreshTable} />}
      <Table fields={fields} items={data} />
    </>
  );
};

export default AdminPage;
