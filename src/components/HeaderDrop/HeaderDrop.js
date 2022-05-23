import React, { useState } from "react";
import { clearUser } from "../../actions/userActions";
import { clearUserLS } from "../../localStorage/lsUser";
import { setIsAuth } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./HeaderDrop.module.scss";

const HeaderDrop = () => {
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);
  const user = useSelector((state) => state.userReducer.user);
  const isLogged = user.first_name ? true : false;
  const { first_name = "", second_name = "", isEmployer } = user;
  const initials =
    first_name && second_name
      ? `${first_name[0].toUpperCase()}${second_name[0].toUpperCase()}`
      : "";
  const logout = () => {
    dispatch(clearUser());
    clearUserLS();
    setHovered(false);
    dispatch(setIsAuth(false));
  };
  return (
    <div className={styles.wrapper}>
      {!isLogged && (
        <div className={styles.logReg}>
          <Link to={"/login"}>Войти</Link>
          <Link to={"/registry"}>Регистрация</Link>
        </div>
      )}
      {isLogged && (
        <div
          className={styles.dropMain}
          onMouseEnter={() => {
            setHovered(true);
          }}
          onMouseLeave={() => {
            setHovered(false);
          }}
        >
          <div className={styles.title}>
            {first_name} {second_name}
            <div className={styles.initials}>{initials}</div>
          </div>
          {hovered && (
            <div className={styles.list}>
              <ul>
                <li>Личный кабинет</li>
                {isEmployer && <li>Панель упарвления</li>}
                <li onClick={logout}>Выйти</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderDrop;
