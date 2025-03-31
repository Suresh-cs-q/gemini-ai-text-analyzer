import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">AI Insights</Link>
      </div>
      <ul className={styles.navLinks}>
        <li><Link to="/" className={styles.navLink}>Home</Link></li>
        <li><Link to="/about" className={styles.navLink}>About</Link></li>
        <li><Link to="/contact" className={styles.navLink}>Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;