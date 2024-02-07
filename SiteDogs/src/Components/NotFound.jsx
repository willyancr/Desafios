import React from 'react';
import styles from './NotFound.module.css';
import Button from './Button/Button';
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div className={`${styles.notFound} container`}>
      <h1 className="title">
        {' '}
        <span></span>Error: 404
      </h1>
      <p>Página não encontrada</p>
      <Link to="/">
        <Button name="Home"></Button>
      </Link>
    </div>
  );
};

export default NotFound;
