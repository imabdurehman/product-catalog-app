import React from "react";
import logo from "../../assets/techshack-logo.png";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <img src={logo} alt="TechShack Logo" />
      <p>© 2026 TechShack. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
