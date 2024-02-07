import React from 'react';
import './GlobalDashboard.css';
import styles from './Statistics.module.css';
import HeaderDashboard from './HeaderDashboard';
import Head from '../../Helper/Head';
import useFetch from '../../Hooks/useFetch';
import { STATS_GET } from '../../api';
import Loading from '../../Helper/Loading';
const StatisticsGraph = React.lazy(() => import('./StatisticsGraph')); //Carregar componente dinamicamente quando necessario

const Statistics = () => {
  const { request, loading, error, data } = useFetch();

  React.useEffect(() => {
    async function fetchData() {
      const { url, options } = STATS_GET();
      await request(url, options);
    }
    fetchData();
  }, [request]);

  if (loading)
    return (
      <p className={styles.loading}><Loading /></p>
    );
  if (error) return <p>{error}</p>;
  if (data)
    return (
      <React.Suspense fallback={<div></div>}>
        <Head title="Estatisticas" />
        <HeaderDashboard title="Estatisticas" />
        <StatisticsGraph data={data} /> 
      </React.Suspense>
    );
  else {
    return null;
  }
};

export default Statistics;
