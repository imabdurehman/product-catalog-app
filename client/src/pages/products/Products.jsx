import React, { useEffect, useState } from "react";
import ProductList from "../../components/productlist/ProductList";
import SearchBar from "../../components/searchbar/SearchBar";
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
  const [loadingMore, setLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadMoreError, setLoadMoreError] = useState("");

  const fetchAllProducts = async (
    search = "",
    category = "All",
    sort = "default",
    page = 1,
    limit = 6,
  ) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/product?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}&sort=${encodeURIComponent(sort)}&page=${page}&limit=${limit}`,
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch products");
    }

    return data;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    let active = true;

    const getProducts = async () => {
      setPage(1);
      setLoading(true);
      setErrorMessage("");
      setLoadMoreError("");

      try {
        const data = await fetchAllProducts(
          debouncedSearch.trim(),
          category,
          sorting,
          1,
          6,
        );

        if (!active) return;

        setProducts(data.products);
        setHasMore(data.hasMore);
      } catch (error) {
        if (active) {
          setErrorMessage(error.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    getProducts();

    return () => {
      active = false;
    };
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

  const loadHandler = async () => {
    if (loadingMore || !hasMore) return;

    const nextPage = page + 1;

    setLoadingMore(true);
    setLoadMoreError("");

    try {
      const data = await fetchAllProducts(
        debouncedSearch.trim(),
        category,
        sorting,
        nextPage,
        6,
      );

      setProducts((prev) => [...prev, ...data.products]);
      setHasMore(data.hasMore);
      setPage(nextPage);
    } catch (error) {
      setLoadMoreError(error.message || "Failed to load more products.");
    } finally {
      setLoadingMore(false);
    }
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

      {loadMoreError && (
        <p className={styles.loadMoreError} role="alert">
          {loadMoreError}
        </p>
      )}

      {hasMore && (
        <button
          className={styles.loadMore}
          onClick={loadHandler}
          disabled={loadingMore}
        >
          {loadingMore ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default Products;
