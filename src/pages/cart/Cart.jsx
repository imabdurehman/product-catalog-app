import React from "react";
import styles from "./Cart.module.css";
import { IoClose } from "react-icons/io5";

const Cart = ({ cart, setCart, setIsCartOpen }) => {
  const closeHandler = () => {
    setIsCartOpen(false);
  };

  const quantityIncrementHandler = (id) => {
    const updatedCartQuantity = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );
    setCart(updatedCartQuantity);
  };

  const quantityDecrementHandler = (id) => {
    const selectedProduct = cart.find((item) => item.id === id);

    if (!selectedProduct) return;

    if (selectedProduct.quantity > 1) {
      const updatedCartQuantity = cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      );
      setCart(updatedCartQuantity);
    } else {
      const filterCartItem = cart.filter((item) => item.id !== id);
      setCart(filterCartItem);
    }
  };

  const removeProductHandler = (id) => {
    const filterCartItem = cart.filter((item) => item.id !== id);
    setCart(filterCartItem);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.cartDrawer}>
        {/* Header */}

        <div className={styles.cartHeader}>
          <h2>Shopping Cart</h2>

          <button onClick={closeHandler} className={styles.closeBtn}>
            <IoClose />
          </button>
        </div>

        {/* Body */}

        <div className={styles.cartBody}>
          {cart.length === 0 ? (
            <h3 className={styles.emptyCart}>Your cart is empty.</h3>
          ) : (
            cart.map((item) => (
              <div className={styles.cartItem} key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className={styles.productInfo}>
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>

                  <div className={styles.quantity}>
                    <button onClick={() => quantityDecrementHandler(item.id)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => quantityIncrementHandler(item.id)}>
                      +
                    </button>
                  </div>
                </div>

                <div className={styles.rightSide}>
                  <p className={styles.subtotal}>
                    {item.price * item.quantity}
                  </p>

                  <button
                    onClick={() => removeProductHandler(item.id)}
                    className={styles.removeBtn}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}

        <div className={styles.cartFooter}>
          <div className={styles.total}>
            <h3>Total</h3>
            <h3>$999</h3>
          </div>

          <button className={styles.checkoutBtn}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
