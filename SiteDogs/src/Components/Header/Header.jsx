import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';

const Header = () => {
  const { data } = React.useContext(UserContext);
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link to="/">
          {' '}
          <i className="fa-solid fa-dog fa-2xl"></i>{' '}
        </Link>
        {data ? (
          <Link to="/conta" className={styles.login}>
            {data.username} <i className="fa-solid fa-user"></i>
          </Link>
        ) : (
          <Link to="/login" className={styles.login}>
            Login / Criar <i className="fa-solid fa-user"></i>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
