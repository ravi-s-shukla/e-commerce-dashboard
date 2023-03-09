/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    let data = await fetch("http://localhost:8000/listproduct", {
      headers: { authentication: JSON.parse(localStorage.getItem("token")) },
    });
    data = await data.json();
    setProducts(data);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:8000/delete/${id}`, {
      method: "Delete",
      headers: { authentication: JSON.parse(localStorage.getItem("token")) },
    });
    result = await result.json();
    if (result) {
      getProduct();
    }
  };

  const searchHandle = async (event) => {
    const key = event.target.value;
    if (key) {
      let data = await fetch(`http://localhost:8000/search/${key}`, {
        headers: { authentication: JSON.parse(localStorage.getItem("token")) },
      });
      data = await data.json();
      if (data) {
        setProducts(data);
      }
    } else {
      getProduct();
    }
  };

  return (
    <div className='productList'>
      <h1>Product List</h1>
      <input
        type='text'
        placeholder='Search Product'
        className='searchInput'
        onChange={searchHandle}
      />
      <ul>
        <li>S.no</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((product, index) => (
          <ul key={product._id}>
            <li>{index + 1}</li>
            <li>{product.name}</li>
            <li>{product.price}</li>
            <li>{product.category}</li>
            <li>{product.company}</li>
            <li>
              <button onClick={() => deleteProduct(product._id)}>Delete</button>
              <Link to={"/update/" + product._id}>
                <button>Update</button>
              </Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Result Found</h1>
      )}
    </div>
  );
};

export default ProductList;

