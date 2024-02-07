import React from 'react';
import styles from './Input.module.css';

const Input = ({ register, id, ...props }) => {
  if (register) {
    return (
      <>
        <input className={styles.input} {...register(id)} id={id} {...props} />
      </>
    );
  }
  return <input className={styles.input} id={id} {...props} />;
};

export default Input;
