import React from 'react';
import Feed from '../Feed/Feed';
import styles from './Home.module.css';
import Head from '../../Helper/Head';

const Home = () => {
  return (
    <div className={styles.home}>
      <Head title="Home" />
      <Feed />
    </div>
  );
};

export default Home;
