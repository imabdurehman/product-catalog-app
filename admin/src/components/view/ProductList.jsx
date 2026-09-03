import { useProducts } from "../../context/ProductContext";
import styles from "./ProductList.module.css";

const ProductList = ({ onEdit, onDelete }) => {
  const { products } = useProducts();

  if (products.length === 0) {
    return <div className={styles.message}>No products found.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Products</h2>
          <p>Manage your product inventory</p>
        </div>

        <span className={styles.count}>{products.length} Products</span>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className={styles.productInfo}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.productImage}
                    />

                    <div>
                      <strong>{product.name}</strong>
                      <span>{product._id}</span>
                    </div>
                  </div>
                </td>

                <td>{product.brand}</td>

                <td>
                  <span className={styles.category}>{product.category}</span>
                </td>

                <td className={styles.price}>${product.price}</td>

                <td>
                  <span className={styles.rating}>★ {product.rating}</span>
                </td>

                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.editButton}
                      onClick={() => onEdit(product)}
                    >
                      Edit
                    </button>

                    <button
                      className={styles.deleteButton}
                      onClick={() => onDelete(product)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
