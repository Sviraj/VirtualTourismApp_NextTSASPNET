import React from "react";
import styles from "../styles/Footer.module.css";
import fb from "../images/fb logo.png";
import insta from "../images/insta.png";
import youtube from "../images/youtube.png";
import twitter from "../images/twitter image.png";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-container"]}>
        {/* About Section */}
        <div className={styles["footer-section"]}>
          <h3>About Us</h3>
          <p>
            Explore the world with us! We provide the best travel experiences
            to make your journeys unforgettable. Your adventure starts here.
          </p>
        </div>

        {/* Quick Links */}
        <div className={styles["footer-section"]}>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/destinations">Destinations</a>
            </li>
            <li>
              <a href="/packages">Tour Packages</a>
            </li>
            <li>
              <a href="/blog">Travel Blog</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className={styles["footer-section"]}>
          <h3>Contact</h3>
          <p>Email: contact@tourismexample.com</p>
          <p>Phone: +94 (123) 456-7890</p>
          <p>Address: No. 45 Jawatta Road, Colombo 06</p>
        </div>

        {/* Social Media Links */}
        <div className={styles["footer-section"]}>
          <h3>Follow Us</h3>
          <div className={styles["social-icons"]}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={fb} alt="Facebook" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={insta} alt="Instagram" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={twitter} alt="Twitter" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={youtube} alt="YouTube" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className={styles["footer-bottom"]}>
        <p>&copy; 2025 Virtual Tourism. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
