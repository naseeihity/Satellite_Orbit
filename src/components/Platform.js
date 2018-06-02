import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import Typography from '@material-ui/core/Typography';
import { getStatistic } from './utils/fetch';

import styles from './style/platform.css';

class Platform extends Component {
  constructor(props) {
    super(props);
    this.echart = React.createRef();

    this.state = { total: 0, date: [], count: [], days: 0 };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    getStatistic().then(data => {
      const total = data.total || 0;
      let days = 0;
      let date = [];
      let count = [];
      if (data.statistic) {
        days = data.statistic.length;
        data.statistic.forEach(item => {
          count.push(item.count);
          date.push(item.date.slice(5));
        });
      }

      this.setState({ total, date, count, days });
    });
  };

  initOption = () => {
    const { date, count, days } = this.state;
    return {
      title: {
        text: `近${days}天接收数据量`,
        left: 'center',
        textStyle: { fontSize: 14, align: 'center', verticalAlign: 'middle' }
      },
      xAxis: {
        type: 'category',
        axisLabel: { interval: 0, rotate: -70 },
        data: date
      },
      yAxis: { type: 'value', name: '帧', axisLabel: { margin: 1 } },
      grid: { left: '20%' },
      series: [
        {
          data: count,
          type: 'line',
          symbolSize: 8,
          color: ['#325ea1'],
          emphasis: { label: { show: true, color: ['#74FA8D'] } }
        }
      ]
    };
  };

  render() {
    const { total } = this.state;
    return (
      <div className={styles.platform_box}>
        <div className={styles.platform_total}>
          <div className={styles.totalnum}>
            <Typography component="div" className={styles.total}>
              累计接收数
            </Typography>
            {total}
          </div>
        </div>
        <div className={styles.platform_chart}>
          <ReactEcharts
            className={styles.echarts}
            ref={this.echart}
            style={{ height: '90%', width: '100%' }}
            option={this.initOption()}
          />
        </div>
      </div>
    );
  }
}

export default Platform;
