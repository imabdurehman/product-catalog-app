import React from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import Loader from "../../components/loader/Loader";
import ErrorMessage from "../../components/error/ErrorMessage";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const { cart, setCart, setIsCartOpen } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/product/${id}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch product");
        }

        setProduct(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const quantityIncrementHandler = () => {
    setQuantity((prev) => prev + 1);
  };

  const quantityDecrementHandler = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />;
  }

  const addToCartHandler = () => {
    const existingProduct = cart.find((item) => item._id === product._id);

    // product exist in cart
    if (existingProduct) {
      const quantityIncreaser = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );

      setCart(quantityIncreaser);
    }

    // product not exist in cart
    else {
      setCart([...cart, { ...product, quantity: quantity }]);
    }

    setIsCartOpen(true);
  };

  return (
    <div className={styles.detailContainer}>
      <div className={styles.productContent}>
        <div className={styles.left}>
          <img src={product.image} alt={product.name} />
        </div>

        <div className={styles.right}>
          <div className={styles.names}>
            <p>{product.brand}</p>
            <h1>{product.name}</h1>
          </div>

          <div className={styles.rating}>
            <FaStar />
            <span>{product.rating}</span>
          </div>

          <div className={styles.price}>
            <p>${product.price}</p>
          </div>

          <div className={styles.desc}>
            <p>{product.description}</p>
          </div>

          <div className={styles.quantity}>
            <span>Quantity : </span>
            <button onClick={quantityDecrementHandler}>-</button>
            <p>{quantity}</p>
            <button onClick={quantityIncrementHandler}>+</button>
          </div>

          <div className={styles.cartButton}>
            <button onClick={addToCartHandler}>Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
