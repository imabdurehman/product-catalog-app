import { useState } from "react";
import { useProducts } from "../../context/ProductContext";
import styles from "./Delete.module.css";

const DeleteProduct = ({ product, onClose }) => {
  const { deleteProduct } = useProducts();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setError("");
    setLoading(true);

    try {
      await deleteProduct(product._id);

      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.icon}>!</div>

        <h2>Delete Product?</h2>

        <p>
          Are you sure you want to delete <strong>{product.name}</strong>? This
          action cannot be undone.
        </p>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.actions}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className={styles.deleteButton}
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
