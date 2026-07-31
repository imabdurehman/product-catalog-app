import { createContext, useState, useEffect } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem("cartDetails")) || [],
  );
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cartDetails", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, isCartOpen, setCart, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};
