import React from "react";
import styles from "../filtercontrols/FilterControls.module.css";

const Sorting = ({ sorting, sortingHandler }) => {
  return (
    <div className={styles.filterControlsBox}>
      <label htmlFor="sorting">Sort</label>
      <select id="sorting" value={sorting} onChange={sortingHandler}>
        <option value="Default">Default</option>
        <option value={sorting}>Price Low–High</option>
        <option value={sorting}>Price High–Low</option>
        <option value={sorting}>Rating</option>
        <option value={sorting}>Name (A-Z)</option>
      </select>
    </div>
  );
};

export default Sorting;
