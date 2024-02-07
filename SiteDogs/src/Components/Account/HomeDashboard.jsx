import React from 'react';
import './GlobalDashboard.css';
import HeaderDashboard from './HeaderDashboard';
import Feed from '../Feed/Feed';
import styles from './HomeDashboard.module.css';
import { UserContext } from '../../UserContext';
import Head from '../../Helper/Head';

const HomeDashboard = () => {
  const { data } = React.useContext(UserContext);
  return (
    <>
      <Head title="Minha Conta" />
      <HeaderDashboard title="Minha Conta" />
      <section className={`${styles.home} `}>
        <Feed user={data.id} />
      </section>
    </>
  );
};

export default HomeDashboard;
