import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/techshack-logo-black.png";
import styles from "./Nav.module.css";
import { FaShoppingCart } from "react-icons/fa";

const Nav = () => {
  const activeCheck = ({ isActive }) => (isActive ? styles.active : "");

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <NavLink to="/" end>
          <img src={logo} alt="TechShack Logo" />
        </NavLink>

        <ul>
          <li>
            <NavLink to="/" end className={activeCheck}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/products" className={activeCheck}>
              Products
            </NavLink>
          </li>

          <li>
            <NavLink to="/about" className={activeCheck}>
              About
            </NavLink>
          </li>
        </ul>

        <NavLink to="/cart" className={activeCheck}>
          <div className={styles.cartWrapper}>
            <FaShoppingCart className={styles.cartIcon} />
            <span>0</span>
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
