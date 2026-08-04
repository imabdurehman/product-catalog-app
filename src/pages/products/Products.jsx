import React, { useEffect } from "react";
import ProductList from "../../components/productlist/ProductList";
import SearchBar from "../../components/searchbar/SearchBar";
import products from "../../data/products.json";
import { useState } from "react";
import styles from "./Products.module.css";
import CategoryFilter from "../../components/categoryfilter/CategoryFilter";

const Products = () => {
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("All");
  const [sorting, setSorting] = useState("default");
  const [visibleProducts, setVisibleProducts] = useState(6);

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const sortingHandler = (e) => {
    setSorting(e.target.value);
  };

  const loadHandler = () => {
    setVisibleProducts((prev) => prev + 6);
  };

  const searchInputLower = searchInput.toLowerCase().trim();
  const searchProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchInputLower),
  );

  const filterProducts = searchProducts.filter(
    (product) => category === "All" || product.category === category,
  );

  const sortedProducts = [...filterProducts].sort((a, b) => {
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

  const loadProducts = sortedProducts.slice(0, visibleProducts);
  useEffect(() => {
    setVisibleProducts(6);
  }, [searchInput, category, sorting]);

  return (
    <div>
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

      {loadProducts.length !== 0 ? (
        <ProductList products={loadProducts} />
      ) : (
        <div className={styles.notFoundContainer}>
          <h2>No Products Found</h2>
          <p>Try searching with another product name.</p>
        </div>
      )}

      {visibleProducts < sortedProducts.length && (
        <button className={styles.loadMore} onClick={loadHandler}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Products;
