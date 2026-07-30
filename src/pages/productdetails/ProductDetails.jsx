import React from "react";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";
import products from "../../data/products.json";
import styles from "./ProductDetails.module.css";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";

const ProductDetails = ({ cart, setCart, setIsCartOpen }) => {
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const quantityIncrementHandler = () => {
    setQuantity((prev) => prev + 1);
  };

  const quantityDecrementHandler = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const selectedProduct = products.find((product) => product.id === id);

  if (!selectedProduct) {
    return (
      <div className={styles.notFound}>
        <h1>Product Not Found</h1>
        <p>The product you are looking for doesn't exist.</p>
      </div>
    );
  }

  const cartHandler = () => {
    const existingProduct = cart.find((item) => item.id === selectedProduct.id);

    // product exist in cart
    if (existingProduct) {
      const quantityIncreaser = cart.map((item) =>
        item.id === selectedProduct.id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );

      setCart(quantityIncreaser);
    }

    // product not exist in cart
    else {
      setCart([...cart, { ...selectedProduct, quantity: quantity }]);
    }

    setIsCartOpen(true);
  };

  return (
    <div className={styles.detailContainer}>
      <div className={styles.productContent}>
        <div className={styles.left}>
          <img src={selectedProduct.image} alt={selectedProduct.name} />
        </div>

        <div className={styles.right}>
          <div className={styles.names}>
            <p>{selectedProduct.brand}</p>
            <h1>{selectedProduct.name}</h1>
          </div>

          <div className={styles.rating}>
            <FaStar />
            <span>{selectedProduct.rating}</span>
          </div>

          <div className={styles.price}>
            <p>${selectedProduct.price}</p>
          </div>

          <div className={styles.desc}>
            <p>{selectedProduct.description}</p>
          </div>

          <div className={styles.quantity}>
            <span>Quantity : </span>
            <button onClick={quantityDecrementHandler}>-</button>
            <p>{quantity}</p>
            <button onClick={quantityIncrementHandler}>+</button>
          </div>

          <div className={styles.cartButton}>
            <button onClick={cartHandler}>Add To Cart</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
