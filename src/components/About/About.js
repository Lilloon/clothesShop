import React from "react";
import { useSelector } from "react-redux";

const About = () => {
  const { user = {} } = useSelector((state) => state.userReducer);
  const { first_name, second_name, address, phone_number } = user;
  return (
    <div>
      <h2>Имя: {first_name}</h2>
      <h2>Фамилия: {second_name}</h2>
      <h2>Адрес: {address}</h2>
      <h2>Телефон: {phone_number}</h2>
    </div>
  );
};

export default About;
