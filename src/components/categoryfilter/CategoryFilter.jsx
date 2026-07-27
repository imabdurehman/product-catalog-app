import React from "react";
import styles from "../filtercontrols/FilterControls.module.css";

const CategoryFilter = ({ category, categoryHandler }) => {
  return (
    <div className={styles.filterControlsBox}>
      <label htmlFor="category">Filter</label>
      <select id="category" value={category} onChange={categoryHandler}>
        <option value="All">All</option>
        <option value="Phone">Phones</option>
        <option value="Laptop">Laptops</option>
        <option value="Smart Watch">Watches</option>
        <option value="Earbuds">Earbuds</option>
      </select>
    </div>
  );
};

export default CategoryFilter;
