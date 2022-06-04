import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBagIdLS, setBagLS } from "../../localStorage/lsBag";
import { setMiniCart } from "../../actions/miniCartActions";

const BagTaker = () => {
  const [setted, setSetted] = useState(false);
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.authReducer);
  const { user } = useSelector((state) => state.userReducer);

  const bagLS = getBagIdLS();
  const fetchBag = async () => {
    if (isAuth && !setted) {
      setSetted(true);
      if (bagLS) {
        console.log(bagLS, "bag");
        const result = await axios.get(
          "http://localhost:5000/api/getBagByBagId",
          {
            params: {
              id_bag: bagLS,
            },
          }
        );
        dispatch(setMiniCart(result.data));
        setBagLS(result.data.id_bag);
      }
      if (!bagLS && user?.id_client) {
        try {
          const result = await axios.get(
            "http://localhost:5000/api/getBagByClientId",
            {
              params: {
                id_client: user.id_client,
              },
            }
          );
          const { data } = result;
          if (data) {
            dispatch(setMiniCart(data));
            setBagLS(data.id_bag);
          } else {
            const createdBag = await axios.post(
              `http://localhost:5000/api/createBag?id_client=${user.id_client}`
            );
            dispatch(setMiniCart(createdBag.data));
            setBagLS(createdBag.data.id_bag);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  useEffect(() => {
    fetchBag();
  }, [isAuth]);
  return <></>;
};

export default BagTaker;
