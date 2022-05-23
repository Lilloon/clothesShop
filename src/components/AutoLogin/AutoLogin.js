import React, { useEffect } from "react";
import { getUserLS } from "../../localStorage/lsUser";
import { setUser } from "../../actions/userActions";
import { setIsAuth } from "../../actions/authActions";
import { useDispatch } from "react-redux";
import axios from "axios";

const AutoLogin = () => {
  const dispatch = useDispatch();
  useEffect(async () => {
    const userLS = getUserLS();
    if (userLS) {
      const { phone_number, password } = userLS;
      const data = { phone_number, password };
      const result = await axios.get("http://localhost:5000/api/login", {
        params: data,
      });
      if (result.data !== "bad :(") {
        dispatch(setUser(result.data));
        dispatch(setIsAuth(true));
        return;
      }
    }
  }, []);

  return <></>;
};

export default AutoLogin;
