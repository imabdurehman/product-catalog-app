import React from "react";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";
import products from "../../data/products.json";
import styles from "./ProductDetails.module.css";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);

  const quantityHandler = (e) => {
    const value = Number(e.target.value);

    if (value >= 1) {
      setQuantity(value);
    }
  };

  const findProduct = products.find((product) => product.id === id);

  if (!findProduct) {
    return (
      <div className={styles.notFound}>
        <h1>Product Not Found</h1>
        <p>The product you are looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className={styles.detailContainer}>
      <Nav />

      <div className={styles.productContent}>
        <div className={styles.left}>
          <img src={findProduct.image} alt={findProduct.name} />
        </div>

        <div className={styles.right}>
          <div className={styles.names}>
            <p>{findProduct.brand}</p>
            <h1>{findProduct.name}</h1>
          </div>

          <div className={styles.rating}>
            <FaStar />
            <span>{findProduct.rating}</span>
          </div>

          <div className={styles.price}>
            <p>${findProduct.price}</p>
          </div>

          <div className={styles.desc}>
            <p>{findProduct.description}</p>
          </div>

          <div className={styles.quantity}>
            <label>Quantity : </label>
            <input type="number" value={quantity} onChange={quantityHandler} />
          </div>

          <div className={styles.cartButton}>
            <button>Add To Cart</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
