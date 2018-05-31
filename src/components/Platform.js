import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import styles from './style/platform.css';

class Platform extends Component {
  render() {
    return (
      <div className={styles.platform_box}>
        <div className={styles.platform_total}>
          <Card>
            <CardContent>接受总量</CardContent>
          </Card>
        </div>
        <div className={styles.platform_chart}>折线图</div>
      </div>
    );
  }
}

export default Platform;
