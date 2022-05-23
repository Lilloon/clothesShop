import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "../Input/Input";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../Button/Button";
import { translate } from "../../locales/ru";

const AddForm = ({ category = "", refreshTable = () => {} }) => {
  const [fields, setFields] = useState([]);
  const [values, setValues] = useState({});
  const [additionalItems, setAdditionalItems] = useState({});

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        `http://localhost:5000/api/category?category=${category}`
      );
      setFields(result.data.fields || []);
      setAdditionalItems(result.data.additionalItems);
    }
    fetchData();
  }, []);

  const sendNew = async () => {
    const result = await axios.post(
      `http://localhost:5000/api/addItem?category=${category}`,
      {
        ...values,
      }
    );
    const tempValues = JSON.parse(JSON.stringify(values));
    fields.forEach((item) => {
      tempValues[item.name] = "";
    });
    setValues(tempValues);
    refreshTable();
  };
  useEffect(() => {
    if (fields.length) {
      fields.forEach((item) => {
        const tempValues = values;
        tempValues[item.name] = "";
        setValues(tempValues);
      });
    }
  }, [fields]);
  const onChange = (field, value) => {
    const tempValues = { ...values };
    tempValues[field] = value;
    setValues(tempValues);
  };
  return (
    <>
      {fields.map((item) => (
        <Input
          key={item.name}
          name={item.name}
          placeholder={translate[item.name]}
          onChange={onChange}
          value={values[item.name]}
        />
      ))}
      {additionalItems && (
        <Dropdown
          items={additionalItems.values}
          title={additionalItems.field}
          setSelected={onChange}
        />
      )}
      <Button category={category} onClick={sendNew} />
    </>
  );
};

export default AddForm;
