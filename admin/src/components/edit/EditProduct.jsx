import { useProducts } from "../../context/ProductContext";
import ProductForm from "../form/ProductForm";

import styles from "./EditProduct.module.css";

const EditProduct = ({ product, onClose }) => {
  const { updateProduct } = useProducts();

  const handleUpdateProduct = async (formData) => {
    await updateProduct(product._id, formData);

    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div>
            <h2>Edit Product</h2>
            <p>Update product information</p>
          </div>

          <button
            className={styles.closeButton}
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        <ProductForm
          product={product}
          onSubmit={handleUpdateProduct}
          onClose={onClose}
          submitText="Update Product"
          loadingText="Updating..."
        />
      </div>
    </div>
  );
};

export default EditProduct;
