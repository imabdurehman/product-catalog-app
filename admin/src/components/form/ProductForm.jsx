import { useEffect, useState } from "react";

import styles from "./ProductForm.module.css";

const initialForm = {
  name: "",
  brand: "",
  category: "",
  price: "",
  rating: "",
  description: "",
  image: "",
};

const ProductForm = ({
  product,
  onSubmit,
  onClose,
  submitText,
  loadingText,
}) => {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        brand: product.brand || "",
        category: product.category || "",
        price: product.price ?? "",
        rating: product.rating ?? "",
        description: product.description || "",
        image: product.image || "",
      });
    } else {
      setFormData(initialForm);
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await onSubmit({
        ...formData,
        price: Number(formData.price),
        rating: Number(formData.rating),
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label>Product Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </div>

        <div className={styles.field}>
          <label>Brand</label>

          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Enter brand"
          />
        </div>

        <div className={styles.field}>
          <label>Category</label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
          />
        </div>

        <div className={styles.field}>
          <label>Price</label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </div>

        <div className={styles.field}>
          <label>Rating</label>

          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="0 - 5"
          />
        </div>

        <div className={styles.field}>
          <label>Image URL</label>

          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>

        <div className={styles.fieldFull}>
          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
          />
        </div>
      </div>

      <div className={styles.footer}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? loadingText : submitText}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
