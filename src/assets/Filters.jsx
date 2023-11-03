import React, { useState } from "react";
import styled from "styled-components";
const prices = [
  "0-500",
  "501-1000",
  "1000-5000",
  "5000-10000",
  "10000-20000",
  "20000-30000",
  "30000-40000",
];
const categories = ["headphone", "blazer", "mobile", "watches"];

const Select = styled.select`
  padding: 3px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 20px;
  margin-right: 10px;
`;

const Filters = ({ price, setPrice, category, setCategory }) => {
  return (
    <div>
      Price:
      <Select value={price} onChange={(e) => setPrice(e.target.value)}>
        {prices.map((price, index) => (
          <option key={index} value={price}>
            {price}
          </option>
        ))}
      </Select>
      Product:
      <Select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((product, index) => (
          <option key={index} value={product}>
            {product}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default Filters;
