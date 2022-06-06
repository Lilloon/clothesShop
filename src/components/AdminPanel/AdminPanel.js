import React, { useEffect, useState } from "react";
import classes from "./AdminPanel.module.scss";
import { useSelector } from "react-redux";
import AdminPage from "../AdminPage/AdminPage";
import Navigations from "../Navigations/Navigations";
import axios from "axios";

const AdminPanel = () => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(0);
  const { user } = useSelector((state) => state.userReducer);

  const { phone_number, password } = user;
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesQ = await axios.get(
        "http://localhost:5000/api/getCategories",
        {
          params: {
            phone_number,
            password,
          },
        }
      );
      setCategories(categoriesQ.data);
    };
    if (phone_number && password) {
      fetchCategories();
    }
  }, [phone_number]);

  const selectCat = (id) => {
    setSelected(id);
  };
  return (
    <div className={classes.adminPanel}>
      <Navigations items={categories} selected={selected} onClick={selectCat} />
      <div className={classes.wrapper}>
        {categories.length !== 0 && (
          <AdminPage category={categories[selected].name} />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
