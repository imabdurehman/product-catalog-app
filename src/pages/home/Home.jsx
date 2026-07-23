import React from "react";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import BannerImage from "../../assets/techshack-banner.png";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div>
      <Nav />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.left}>
          <h1>
            Discover the Latest
            <span> Tech Products</span>
          </h1>
          <p>
            Explore premium smartphones, laptops, smart watches and earbuds at
            TechShack.
          </p>
          <button>Explore Products</button>
        </div>
        <div className={styles.right}>
          <img src={BannerImage} alt="TechShack Banner" />
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2>Why Choose TechShack?</h2>

        <div className={styles.featureCards}>
          <div className={styles.card}>
            <h3>Latest Technology</h3>
            <p>
              Discover the newest smartphones, laptops, watches and smart
              gadgets.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Premium Quality</h3>
            <p>We provide reliable and high-quality tech products.</p>
          </div>

          <div className={styles.card}>
            <h3>Easy Shopping</h3>
            <p>Find your favorite products with a smooth experience.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
