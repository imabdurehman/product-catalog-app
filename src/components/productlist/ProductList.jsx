import React from "react";
import ProductCard from "../productcard/ProductCard";
import products from "../../data/products.json";
import styles from "./ProductList.module.css";

const ProductList = () => {
  return (
    <div className={styles.cardContainer}>
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default ProductList;
