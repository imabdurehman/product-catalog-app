import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Products from "./pages/Products";
import ProductDetails from "./pages/productdetails/ProductDetails";
import PageNotFound from "./pages/pagenotfound/PageNotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/productDetails/:id" element={<ProductDetails />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
