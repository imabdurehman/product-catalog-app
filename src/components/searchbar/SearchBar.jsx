import React from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";

const SearchBar = ({ searchInput, searchInputHandler }) => {
  return (
    <div className={styles.searchBox}>
      <FaSearch />
      <input
        type="text"
        placeholder="Search products.."
        value={searchInput}
        onChange={searchInputHandler}
      />
    </div>
  );
};

export default SearchBar;
