import React from "react";
import styles from "./CategoryFilter.module.css";

const CategoryFilter = ({ label, id, value, onchange, children }) => {
  return (
    <div className={styles.filterControlsBox}>
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={onchange}>
        {children}
      </select>
    </div>
  );
};

export default CategoryFilter;
