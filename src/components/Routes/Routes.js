import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginScreen from "../LoginScreen/LoginScreen";
import Main from "../Main/Main";
import Cabinet from "../Cabinet/Cabinet";
import OrderDetails from "../OrderDetails/OrderDetails";
import AdminPanel from "../AdminPanel/AdminPanel";

const MyRoutes = () => (
  <Routes>
    <Route exact path="/" element={<Main />} />
    <Route path="/login" element={<LoginScreen />} />
    <Route path="/cabinet/:category" element={<Cabinet />} />
    <Route path="/cabinet/orders/orderDetails" element={<OrderDetails />} />
    <Route path="/cabinet" element={<Cabinet />} />
    <Route path="/admin" element={<AdminPanel />} />
  </Routes>
);

export default MyRoutes;
