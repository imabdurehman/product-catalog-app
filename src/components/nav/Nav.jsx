import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/techshack-logo-black.png";
import styles from "./Nav.module.css";
import { FaShoppingCart } from "react-icons/fa";

const Nav = ({ cart, setIsCartOpen }) => {
  const activeCheck = ({ isActive }) => (isActive ? styles.active : "");

  const cartCount = cart.reduce((total, item) => {
    return (total += item.quantity);
  }, 0);

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

        <button onClick={() => setIsCartOpen(true)} className={styles.cartBtn}>
          <div className={styles.cartWrapper}>
            <FaShoppingCart className={styles.cartIcon} />
            <span>{cartCount}</span>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
