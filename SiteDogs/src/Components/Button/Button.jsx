import React from 'react';
import styles from './Button.module.css';

const Button = ({ name, ...props }) => {
  return <button className={styles.btn} {...props}>{name}</button>;
};

export default Button;
