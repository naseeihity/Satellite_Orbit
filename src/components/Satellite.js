import React, { Component } from 'react';
import { Divider } from '@material-ui/core';

import styles from './style/ctlbar.css';

class Satellite extends Component {
  render() {
    return (
      <div>
        <div className={styles.ctlbar_title}>遥测数据订阅</div>
        <Divider />
      </div>
    );
  }
}

export default Satellite;
