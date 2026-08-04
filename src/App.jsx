import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Products from "./pages/products/Products";
import ProductDetails from "./pages/productdetails/ProductDetails";
import PageNotFound from "./pages/pagenotfound/PageNotFound";
import Cart from "./pages/cart/Cart";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import { useContext } from "react";
import { CartContext } from "./context/CartContext";

function App() {
  const { isCartOpen } = useContext(CartContext);

  return (
    <div>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>

      {isCartOpen && <Cart />}

      <Footer />
    </div>
  );
}

export default App;
