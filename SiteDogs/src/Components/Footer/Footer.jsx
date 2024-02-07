import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>
        <i className="fa-solid fa-dog fa-2xl"></i>
      </span>
      <p>
        Dogs | Todos os direitos reservados |{' '}
        <i className="fa-brands fa-x-twitter" style={{ color: '#000000' }}></i>
        <a
          href="https://twitter.com/WillyanCosta"
          target="_blank"
          rel="noopener noreferrer"
        >
          WillyanCosta
        </a>
      </p>
    </footer>
  );
};

export default Footer;
