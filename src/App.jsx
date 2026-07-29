import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Products from "./pages/products/Products";
import ProductDetails from "./pages/productdetails/ProductDetails";
import PageNotFound from "./pages/pagenotfound/PageNotFound";
import Cart from "./pages/cart/Cart";
import Nav from "./components/nav/Nav";
import { useState, useEffect } from "react";

function App() {
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem("cartDetails")) || [],
  );
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cartDetails", JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <Nav cart={cart} setIsCartOpen={setIsCartOpen} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route
          path="/product/:id"
          element={
            <ProductDetails
              cart={cart}
              setCart={setCart}
              setIsCartOpen={setIsCartOpen}
            />
          }
        ></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>

      {isCartOpen && (
        <Cart cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />
      )}
    </div>
  );
}

export default App;
