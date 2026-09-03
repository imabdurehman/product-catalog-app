import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import { useProducts } from "../../context/ProductContext";

import ProductList from "../../components/view/ProductList";

import AddProduct from "../../components/add/AddProduct";

import EditProduct from "../../components/edit/EditProduct";

import DeleteProduct from "../../components/delete/DeleteProduct";

import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const { products, getProducts } = useProducts();

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [logoutError, setLogoutError] = useState("");

  const [showAdd, setShowAdd] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [deletingProduct, setDeletingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        await getProducts();
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [getProducts]);

  const handleLogout = async () => {
    try {
      const success = await logout();

      if (success) {
        navigate("/login");
      }
    } catch (error) {
      setLogoutError(error.message);
    }
  };

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}

      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span>TS</span>
          <h2>TechShack</h2>
        </div>

        <nav className={styles.sidebarNav}>
          <button className={`${styles.navLink} ${styles.active}`}>
            <span>▦</span>
            Dashboard
          </button>
        </nav>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          <span>↪</span>
          Logout
        </button>
      </aside>

      {/* Main */}

      <div className={styles.dashboardMain}>
        <header className={styles.dashboardHeader}>
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, Admin 👋</p>
          </div>

          <div className={styles.adminProfile}>
            <div className={styles.adminAvatar}>A</div>

            <div>
              <strong>Admin</strong>
              <small>Administrator</small>
            </div>
          </div>
        </header>

        <main className={styles.dashboardContent}>
          {/* Stats */}

          <section className={styles.stats}>
            <div className={styles.statCard}>
              <div>
                <p>Total Products</p>
                <h2>{products.length}</h2>
                <span>Current inventory</span>
              </div>

              <div className={styles.statIcon}>▦</div>
            </div>

            <div className={styles.statCard}>
              <div>
                <p>Total Users</p>
                <h2>1</h2>
                <span>Only Admin</span>
              </div>

              <div className={styles.statIcon}>👨‍💼</div>
            </div>

            <div className={styles.statCard}>
              <div>
                <p>Admin Rights</p>
                <h2>CRUD</h2>
                <span>Manage Products</span>
              </div>

              <div className={styles.statIcon}>⚙</div>
            </div>

            <div className={styles.statCard}>
              <div>
                <p>Categories</p>

                <h2>
                  {new Set(products.map((product) => product.category)).size}
                </h2>

                <span>Product categories</span>
              </div>

              <div className={styles.statIcon}>🗂️</div>
            </div>
          </section>

          {/* Product Section */}

          <section className={styles.productsSection}>
            <div className={styles.productsHeader}>
              <div>
                <h2>Product Management</h2>
                <p>Add, edit and delete products</p>
              </div>

              <button
                className={styles.addBtn}
                onClick={() => setShowAdd(true)}
              >
                + Add Product
              </button>
            </div>

            {logoutError && <div className={styles.error}>{logoutError}</div>}

            {loading ? (
              <div className={styles.message}>Loading products...</div>
            ) : error ? (
              <div className={`${styles.message} ${styles.error}`}>{error}</div>
            ) : (
              <ProductList
                onEdit={setEditingProduct}
                onDelete={setDeletingProduct}
              />
            )}
          </section>
        </main>
      </div>

      {/* Add Product */}

      {showAdd && <AddProduct onClose={() => setShowAdd(false)} />}

      {/* Edit Product */}

      {editingProduct && (
        <EditProduct
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}

      {/* Delete Product */}

      {deletingProduct && (
        <DeleteProduct
          product={deletingProduct}
          onClose={() => setDeletingProduct(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
