import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginScreen from "../LoginScreen/LoginScreen";
import Main from "../Main/Main";
import Cabinet from "../Cabinet/Cabinet";
import OrderDetails from "../OrderDetails/OrderDetails";

const MyRoutes = () => (
  <Routes>
    <Route exact path="/" element={<Main />} />
    <Route path="/login" element={<LoginScreen />} />
    <Route path="/cabinet/:category" element={<Cabinet />} />
    <Route path="/cabinet/orders/orderDetails" element={<OrderDetails />} />
    <Route path="/cabinet" element={<Cabinet />} />
  </Routes>
);

export default MyRoutes;
