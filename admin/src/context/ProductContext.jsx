import { createContext, useCallback, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const getProducts = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/product`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      throw error;
    }
  }, []);

  const addProduct = async (productData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(productData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.messages?.join(", ") || data.message || "Failed to add product",
        );
      }

      setProducts((prevProducts) => [...prevProducts, data]);

      return data;
    } catch (error) {
      throw error;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/product/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(productData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.messages?.join(", ") ||
            data.message ||
            "Failed to update product",
        );
      }

      setProducts((prevProducts) =>
        prevProducts.map((product) => (product._id === id ? data : product)),
      );

      return data;
    } catch (error) {
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/product/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id),
      );

      return data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};
