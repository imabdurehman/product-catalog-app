import React from "react";
import styles from "../filtercontrols/FilterControls.module.css";

const Sorting = ({ sorting, sortingHandler }) => {
  return (
    <div className={styles.filterControlsBox}>
      <label htmlFor="sorting">Sort</label>
      <select id="sorting" value={sorting} onChange={sortingHandler}>
        <option value="default">Default</option>
        <option value="price-low-to-high">Price Low–High</option>
        <option value="price-high-to-low">Price High–Low</option>
        <option value="rating">Rating</option>
        <option value="name">Name (A-Z)</option>
      </select>
    </div>
  );
};

export default Sorting;
