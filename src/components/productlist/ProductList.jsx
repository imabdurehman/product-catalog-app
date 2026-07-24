import React from "react";
import ProductCard from "../productcard/ProductCard";
import styles from "./ProductList.module.css";

const ProductList = ({ products }) => {
  return (
    <div className={styles.cardContainer}>
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default ProductList;
