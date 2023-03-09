import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false; //if return false then it not goes further
    }
    const userid = JSON.parse(localStorage.getItem("users"))._id;
    let result = await fetch("http://localhost:8000/addProduct", {
      method: "post",
      body: JSON.stringify({ name, price, userid, category, company }),
      headers: {
        "Content-Type": "application/json",
        authentication: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    navigate("/");
  };

  return (
    <div className='product'>
      <h1>Add Product</h1>
      <input
        type='text'
        placeholder='Enter Product Name'
        className='inputBox'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />{" "}
      {error && !name && <span className='invalidInput'>Enter valid name</span>}
      <input
        type='text'
        placeholder='Enter Product Price'
        className='inputBox'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />{" "}
      {error && !price && (
        <span className='invalidInput'>Enter valid price</span>
      )}
      <input
        type='text'
        placeholder='Enter Product Category'
        className='inputBox'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />{" "}
      {error && !category && (
        <span className='invalidInput'>Enter valid category</span>
      )}
      <input
        type='text'
        placeholder='Enter Product Company'
        className='inputBox'
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />{" "}
      {error && !company && (
        <span className='invalidInput'>Enter valid company</span>
      )}
      <button onClick={addProduct} className='appButton'>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;

