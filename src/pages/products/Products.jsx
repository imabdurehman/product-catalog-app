import React from "react";
import Nav from "../../components/nav/Nav";
import ProductList from "../../components/productlist/ProductList";
import Footer from "../../components/footer/Footer";
import SearchBar from "../../components/searchbar/SearchBar";
import products from "../../data/products.json";
import { useState } from "react";
import styles from "./Products.module.css";

const Products = () => {
  const [searchInput, setSearchInput] = useState("");

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const searchInputLower = searchInput.toLowerCase().trim();
  const filterProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchInputLower),
  );

  return (
    <div className={styles.control}>
      <Nav />
      <SearchBar
        searchInput={searchInput}
        searchInputHandler={searchInputHandler}
      />
      {filterProducts.length !== 0 ? (
        <ProductList products={filterProducts} />
      ) : (
        <div className={styles.notFoundContainer}>
          <h2>No Products Found</h2>
          <p>Try searching with another product name.</p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Products;
