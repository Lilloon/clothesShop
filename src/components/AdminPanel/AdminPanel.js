import React from "react";
import classes from "./AdminPanel.module.scss";
import AdminPage from "../AdminPage/AdminPage";
import LoginForm from "../LoginForm/LoginForm";

const AdminPanel = () => {
  return (
    <div className={classes.wrapper}>
      <LoginForm />
      <AdminPage category={"employers"} />
    </div>
  );
};

export default AdminPanel;
