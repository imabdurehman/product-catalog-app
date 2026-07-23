import React from "react";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import styles from "./About.module.css";

const About = () => {
  return (
    <div>
      <Nav />
      <section className={styles.about}>
        <div className={styles.left}>
          <h1>
            About <span>TechShack</span>
          </h1>

          <p>
            TechShack is a modern technology platform where you can explore the
            latest smartphones, laptops, smart watches and other gadgets.
          </p>

          <p>
            Our mission is to make technology shopping easier by providing
            detailed product information, categories and a smooth browsing
            experience.
          </p>
        </div>

        <div className={styles.right}>
          <div className={styles.stat}>
            <h2>100+</h2>
            <p>Products</p>
          </div>

          <div className={styles.stat}>
            <h2>50+</h2>
            <p>Brands</p>
          </div>

          <div className={styles.stat}>
            <h2>24/7</h2>
            <p>Support</p>
          </div>

          <div className={styles.stat}>
            <h2>10K+</h2>
            <p>Happy Customer</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
