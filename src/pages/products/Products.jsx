import React from "react";
import Nav from "../../components/nav/Nav";
import ProductList from "../../components/productlist/ProductList";
import Footer from "../../components/footer/Footer";
import SearchBar from "../../components/searchbar/SearchBar";
import products from "../../data/products.json";
import { useState } from "react";
import styles from "./Products.module.css";
import CategoryFilter from "../../components/categoryfilter/CategoryFilter";

const Products = () => {
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("All");
  const [sorting, setSorting] = useState("default");

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
  const searchProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchInputLower),
  );

  const filterCategory = searchProducts.filter(
    (product) => category === "All" || product.category === category,
  );

  const sortedProducts = [...filterCategory].sort((a, b) => {
    if (sorting === "default") {
      return a.id - b.id;
    } else if (sorting === "price-low-to-high") {
      return a.price - b.price;
    } else if (sorting === "price-high-to-low") {
      return b.price - a.price;
    } else if (sorting === "rating") {
      return b.rating - a.rating;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  return (
    <div>
      <Nav />

      <div className={styles.control}>
        <SearchBar
          searchInput={searchInput}
          searchInputHandler={searchInputHandler}
        />
        <CategoryFilter
          label="Filter"
          id="filtering"
          value={category}
          onchange={categoryHandler}
        >
          <option value="All">All</option>
          <option value="Phone">Phones</option>
          <option value="Laptop">Laptops</option>
          <option value="Smart Watch">Watches</option>
          <option value="Earbuds">Earbuds</option>
        </CategoryFilter>

        <CategoryFilter
          label="Sort"
          id="sorting"
          value={sorting}
          onchange={sortingHandler}
        >
          <option value="default">Default</option>
          <option value="price-low-to-high">Price Low–High</option>
          <option value="price-high-to-low">Price High–Low</option>
          <option value="rating">Rating</option>
          <option value="name">Name (A-Z)</option>
        </CategoryFilter>
      </div>

      {sortedProducts.length !== 0 ? (
        <ProductList products={sortedProducts} />
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
