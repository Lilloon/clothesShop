import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import icon from "../../img/miniCart.png";
import styles from "./MiniCart.module.scss";

const MiniCart = () => {
  const { isAuth } = useSelector((state) => state.authReducer, shallowEqual);

  const { miniCart = {} } = useSelector(
    (state) => state.miniCartReducer,
    shallowEqual
  );

  if (!isAuth) return <></>;
  return (
    <div className={styles.miniCart}>
      <img src={icon} />
      <div className={styles.circle}>{miniCart.amount}</div>
    </div>
  );
};

export default MiniCart;
