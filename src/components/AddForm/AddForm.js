import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "../Input/Input";
import Dropdown from "../Dropdown/Dropdown";

const AddForm = ({ category }) => {
  const [fields, setFields] = useState([]);
  const [values, setValues] = useState({});
  const [additionalItems, setAdditionalItems] = useState({});

  useEffect(async () => {
    const result = await axios.get(
      `http://localhost:5000/api/category?category=${category}`
    );
    setFields(result.data.fields || []);
    setAdditionalItems(result.data.additionalItems);
  }, []);

  useEffect(() => {
    if (fields.length) {
      fields.forEach((item) => {
        const tempValues = values;
        tempValues[item.name] = "";
        setValues(tempValues);
      });
    }
  }, [fields]);
  console.log(fields);
  const onChange = (field, value) => {
    const tempValues = { ...values };
    tempValues[field] = value;
    setValues(tempValues);
  };
  return (
    <>
      <h1>{category}</h1>
      {fields.map((item) => (
        <Input
          key={item.name}
          name={item.name}
          onChange={onChange}
          value={values[item.name]}
          type={item.format}
        />
      ))}
      {additionalItems && (
        <Dropdown
          items={additionalItems.values}
          title={additionalItems.field}
        />
      )}
    </>
  );
};

export default AddForm;
