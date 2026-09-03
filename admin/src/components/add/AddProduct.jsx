import { useProducts } from "../../context/ProductContext";
import ProductForm from "../form/ProductForm";

import styles from "./AddProduct.module.css";

const AddProduct = ({ onClose }) => {
  const { addProduct } = useProducts();

  const handleAddProduct = async (formData) => {
    await addProduct(formData);

    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div>
            <h2>Add Product</h2>
            <p>Create a new product</p>
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
          onSubmit={handleAddProduct}
          onClose={onClose}
          submitText="Add Product"
          loadingText="Adding..."
        />
      </div>
    </div>
  );
};

export default AddProduct;
