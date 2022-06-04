import React, { useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import icon from "../../img/miniCart.png";
import styles from "./MiniCart.module.scss";
import Button from "../Button/Button";
import axios from "axios";
import { setMiniCart } from "../../actions/miniCartActions";
import { setBagLS } from "../../localStorage/lsBag";

const MiniCart = () => {
  const { isAuth } = useSelector((state) => state.authReducer, shallowEqual);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { miniCart = {} } = useSelector(
    (state) => state.miniCartReducer,
    shallowEqual
  );
  const { user } = useSelector((state) => state.userReducer);
  const { items = [], id_bag } = miniCart;

  const deleteItem = async (product) => {
    const { id_child, cost, amount } = product;
    await axios.delete("http://localhost:5000/api/deleteItemFromBag", {
      params: {
        id_child,
        id_bag,
        cost,
        amount,
      },
    });

    const newBag = await axios.get("http://localhost:5000/api/getBagByBagId", {
      params: {
        id_bag,
      },
    });
    dispatch(setMiniCart(newBag.data));
  };
  const buyItems = async () => {
    await axios.post("http://localhost:5000/api/buyItems", { id_bag });
    const createdBag = await axios.post(
      `http://localhost:5000/api/createBag?id_client=${user.id_client}`
    );
    dispatch(setMiniCart(createdBag.data));
    setBagLS(createdBag.data.id_bag);
  };

  if (!isAuth) return <></>;
  return (
    <div
      className={styles.miniCart}
      onMouseEnter={() => {
        setOpen(true);
      }}
      onMouseLeave={() => {
        setOpen(false);
      }}
    >
      <img src={icon} />
      <div className={styles.circle}>{miniCart.amount}</div>
      {open && (
        <div className={styles.drop}>
          <div className={styles.items}>
            {items.map((item) => (
              <div className={styles.product}>
                <div>
                  <div className={styles.productName}>{item.product_name}</div>
                  <div className={styles.size}>
                    Размер: {item.size}| Кол-во: {item.amount}
                  </div>
                </div>
                <div className={styles.secondCol}>
                  <div className={styles.price}>
                    <div>{item.cost} руб.</div>
                    <div
                      className={styles.delete}
                      onClick={() => {
                        deleteItem(item);
                      }}
                    >
                      Х
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.footer}>
            {!items.length ? (
              <div>Корзина пуста</div>
            ) : (
              <>
                <div>{miniCart.total_price} руб.</div>
                <Button onClick={buyItems} text="Купить" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniCart;
