import React from "react";
import classes from "./AdminPanel.module.scss";
import AddForm from "../AddForm/AddForm";

const AdminPanel = () => {
  return (
    <div className={classes.wrapper}>
      <AddForm category={"product"} />
      <AddForm category={"material"} />
    </div>
  );
};

export default AdminPanel;
