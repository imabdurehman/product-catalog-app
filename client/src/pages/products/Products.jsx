import React, { useEffect } from "react";
import ProductList from "../../components/productlist/ProductList";
import SearchBar from "../../components/searchbar/SearchBar";
import { useState } from "react";
import styles from "./Products.module.css";
import CategoryFilter from "../../components/categoryfilter/CategoryFilter";
import Loader from "../../components/loader/Loader";
import ErrorMessage from "../../components/error/ErrorMessage";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sorting, setSorting] = useState("default");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchAllProducts = async (
    search = "",
    category = "All",
    sort = "default",
    page = 1,
    limit = 6,
  ) => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/product?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}&sort=${encodeURIComponent(sort)}&page=${page}&limit=${limit}`,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products");
      }

      if (page === 1) {
        setProducts(data.products);
      } else {
        setProducts((prev) => [...prev, ...data.products]);
      }

      setHasMore(data.hasMore);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchInput]);

  useEffect(() => {
    setPage(1);

    fetchAllProducts(debouncedSearch.trim(), category, sorting, 1, 6);
  }, [debouncedSearch, category, sorting]);

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
    const nextPage = page + 1;

    setPage(nextPage);

    fetchAllProducts(searchInput.trim(), category, sorting, nextPage, 6);
  };

  if (loading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />;
  }

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

      {products.length !== 0 ? (
        <ProductList products={products} />
      ) : (
        <div className={styles.notFoundContainer}>
          <h2>No Products Found</h2>
          <p>Try searching with another product name.</p>
        </div>
      )}

      {hasMore && (
        <button className={styles.loadMore} onClick={loadHandler}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Products;
