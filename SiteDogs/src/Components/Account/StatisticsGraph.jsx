import React from 'react';
import styles from './StatisticsGraph.module.css';
import { VictoryPie, VictoryBar, VictoryChart, VictoryArea } from 'victory';

const StatisticsGraph = ({ data }) => {
  const [total, setTotal] = React.useState(0);
  const [graph, setGraph] = React.useState([]);

  React.useEffect(() => {
    const graphData = data.map((item) => {
      return {
        x: item.title,
        y: Number(item.acessos),
      };
    });
    setTotal(data.map((item) => +item.acessos).reduce((a, b) => a + b, 0));
    setGraph(graphData);
  }, [data]);
  return (
    <section className="container efeito">
      <div className={styles.acessos}>
        <p>Acessos: {total}</p>
      </div>
      <div className={styles.graphContainer}>
        <div className={styles.graph}>
          <VictoryPie
            data={graph}
            colorScale={['tomato', 'purple', 'gold', 'gray', 'orange', 'navy']}
            padAngle={({ datum }) => datum.y}
            innerRadius={100}
          />
        </div>
        
        <div className={styles.graph}>
          <VictoryChart domainPadding={{ x: 15 }}>
            <VictoryBar
              data={graph}
              style={{ data: { fill: '#c43a31' } }}
              alignment="start"
              animate={{
                duration: 500,
                onLoad: { duration: 500 },
              }}
              barRatio={0.6}
            />
          </VictoryChart>
        </div>
      </div>
    </section>
  );
};

export default StatisticsGraph;
