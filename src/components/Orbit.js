import React, { Component } from 'react';
import { Divider } from '@material-ui/core';

import styles from './style/ctlbar.css';

class Orbit extends Component {
  render() {
    return (
      <div>
        <div className={styles.ctlbar_title}>卫星轨迹订阅</div>
        <Divider />
      </div>
    );
  }
}

export default Orbit;
