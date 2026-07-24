import React from "react";
import styles from "./ProductCard.module.css";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <img src={product.image} alt={product.name} />
        <p>{product.brand}</p>
        <h3>{product.name}</h3>
      </div>

      <div className={styles.mid}>
        <span>Category : {product.category}</span>
        <div className={styles.rating}>
          <FaStar />
          <span>{product.rating}</span>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>Price : ${product.price}</p>
        <button onClick={handleClick}>View Details</button>
      </div>
    </div>
  );
};

export default ProductCard;
