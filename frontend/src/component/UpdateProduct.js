/** @format */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let data = await fetch(`http://localhost:8000/update/${params.id}`, {
      headers: { authentication: JSON.parse(localStorage.getItem("token")) },
    });
    data = await data.json();
    setName(data.name);
    setPrice(data.price);
    setCategory(data.category);
    setCompany(data.company);
  };

  const updateProduct = async () => {
    let data = await fetch(`http://localhost:8000/update/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authentication: JSON.parse(localStorage.getItem("token")),
      },
    });
    data = await data.json();
    navigate("/");
  };

  return (
    <div className='product'>
      <h1>Update Product</h1>
      <input
        type='text'
        placeholder='Enter Product Name'
        className='inputBox'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='text'
        placeholder='Enter Product Price'
        className='inputBox'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type='text'
        placeholder='Enter Product Category'
        className='inputBox'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type='text'
        placeholder='Enter Product Company'
        className='inputBox'
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <button onClick={updateProduct} className='appButton'>
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;

