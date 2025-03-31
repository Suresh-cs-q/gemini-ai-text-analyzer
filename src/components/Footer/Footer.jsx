import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.contactInfo}>
          <h4>Let's Connect</h4>
          <p className={styles.subtitle}>Feel free to reach out through any of these channels. I'm always open to new opportunities and collaborations.</p>
          <div className={styles.contactDetails}>
            <div className={styles.contactItem}>
              <h5>Email</h5>
              <p><a href="mailto:Suresh.manghwar@gmail.com">Suresh.manghwar@gmail.com</a></p>
            </div>
            <div className={styles.contactItem}>
              <h5>GitHub</h5>
              <p><a href="https://github.com/Suresh-cs-q" target="_blank" rel="noopener noreferrer">github.com/Suresh-cs-q</a></p>
            </div>
            <div className={styles.contactItem}>
              <h5>LinkedIn</h5>
              <p><a href="https://linkedin.com/in/sureshkumar-cs" target="_blank" rel="noopener noreferrer">linkedin.com/in/sureshkumar-cs</a></p>
            </div>
            <div className={styles.contactItem}>
              <h5>Phone</h5>
              <p><a href="tel:+923131136263">+92-313-1136263</a></p>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>© {currentYear} Suresh Kumar. All rights reserved.</p>
          <p>Built with React</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;