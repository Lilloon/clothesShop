import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigations from "../Navigations/Navigations";
import styles from "./Cabinet.module.scss";
import About from "../About/About";
import OrdersList from "../Orders/OrdersList";

const cabinetItems = [
  {
    name: "Об аккаунте",
    id: 1,
    path: "about",
  },
  { name: "Заказы", id: 2, path: "orders" },
];

const contents = {
  about: <About />,
  orders: <OrdersList />,
};

const Cabinet = () => {
  const params = useParams();
  const { category } = params;
  const [content, setContent] = useState("");
  useEffect(() => {
    setContent(contents[category]);
  }, [category]);
  useEffect(() => {
    if (!category) {
      navigate("/cabinet/about");
      setSelected(1);
    }
  }, [category]);
  const getCurr = () => {
    if (category) {
      const cur = cabinetItems.find((item) => item.path === category);
      return cur.id;
    }
    return 1;
  };
  const [selected, setSelected] = useState(getCurr());
  const onClick = (id) => {
    setSelected(id);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const [currentCat] = cabinetItems.filter((item) => item.id === selected);
    navigate(`/cabinet/${currentCat.path}`);
  }, [selected]);
  return (
    <div className={styles.cabinet}>
      <Navigations onClick={onClick} items={cabinetItems} selected={selected} />
      <div className={styles.content}>{content}</div>
    </div>
  );
};

export default Cabinet;
