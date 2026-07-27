import React from "react";
import Nav from "../../components/nav/Nav";
import ProductList from "../../components/productlist/ProductList";
import Footer from "../../components/footer/Footer";
import SearchBar from "../../components/searchbar/SearchBar";
import products from "../../data/products.json";
import { useState } from "react";
import styles from "./Products.module.css";
import CategoryFilter from "../../components/categoryfilter/CategoryFilter";
import Sorting from "../../components/sorting/Sorting";

const Products = () => {
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("All");
  const [sorting, setSorting] = useState("Default" || 0);

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const sortingHandler = (e) => {
    setSorting(e.target.value);
  };

  const searchInputLower = searchInput.toLowerCase().trim();
  const filterProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchInputLower),
  );

  const filterCategory = filterProducts.filter(
    (product) => category === "All" || product.category === category,
  );

  return (
    <div>
      <Nav />

      <div className={styles.control}>
        <SearchBar
          searchInput={searchInput}
          searchInputHandler={searchInputHandler}
        />
        <CategoryFilter category={category} categoryHandler={categoryHandler} />
        <Sorting sorting={sorting} sortingHandler={sortingHandler} />
      </div>

      {filterCategory.length !== 0 ? (
        <ProductList products={filterCategory} />
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
