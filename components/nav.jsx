"use client";
import { useState } from "react";
import styles from "./nav.module.css";
import Page from "@/app/Contact/page";
import About from "@/app/About/page";
import Link from "next/link";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const removeActive = () => {
    setIsActive(false);
  };

  return (
    <div className="navBar">
      <header className="nav-header">
        <nav className={`${styles.navbar}`}>
          <a href="#home" className={`${styles.logo}`}>
            Menu
          </a>
          <ul className={`${styles.navMenu} ${isActive ? styles.active : ""}`}>
            <li onClick={removeActive}>
              <a href="#home" className={`${styles.navlink}`}>
                Home
              </a>
            </li>
            <li onClick={removeActive}>
              <Link href="/Contact" className={`${styles.navlink}`}>
                Contact
              </Link>
            </li>
            <li onClick={removeActive}>
              <Link href="/About" className={`${styles.navlink}`}>
                About
              </Link>
            </li>
            <li onClick={removeActive}>
              <Link href="/SignIn" className={`${styles.navlink}`}>
                Sign In
              </Link>
            </li>
          </ul>
          <div
            className={`${styles.hamburger} ${isActive ? styles.active : ""}`}
            onClick={toggleActiveClass}
          >
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
