import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import Typography from '@material-ui/core/Typography';

import styles from './style/platform.css';

class Platform extends Component {
  constructor(props) {
    super(props);
    this.echart = React.createRef();
  }

  initOption = () => {
    return {
      title: {
        text: '近7天接收数据量',
        left: 'center',
        textStyle: { fontSize: 14, align: 'center', verticalAlign: 'middle' }
      },
      xAxis: {
        type: 'category',
        axisLabel: { interval: 0, rotate: -70 },
        data: ['5-25', '5-26', '5-27', '5-28', '5-29', '5-30', '5-31']
      },
      yAxis: { type: 'value', name: '帧', axisLabel: { margin: 1 } },
      grid: { left: '20%' },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          symbolSize: 8,
          color: ['#325ea1'],
          emphasis: { label: { show: true, color: ['#74FA8D'] } }
        }
      ]
    };
  };

  render() {
    return (
      <div className={styles.platform_box}>
        <div className={styles.platform_total}>
          <div className={styles.totalnum}>
            <Typography component="div" className={styles.total}>
              TOTAL
            </Typography>
            123456
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
