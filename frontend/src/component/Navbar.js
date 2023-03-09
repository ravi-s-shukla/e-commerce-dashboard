/** @format */

import React from "react";
import { json, Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = localStorage.getItem("users");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <>
      <img
        alt='logo'
        className='logo'
        src='https://www.pngfind.com/pngs/m/29-290389_e-commerce-website-logo-png-download-e-commerce.png'
      />
      {auth ? (
        <ul className='nav-ul'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/add'>Add Product</Link>
          </li>
          <li>
            <Link to='/update'>Update Product</Link>
          </li>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <Link onClick={logout} to='/logout'>
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className='nav-ul nav-right'>
          <li>
            <Link to='/signup'>Sign-up</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default Navbar;

