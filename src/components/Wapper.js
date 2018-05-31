import React, { Component } from 'react';
import Globe from './Globe';
import styles from './style/wrapper.css';

class Wapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.wapper_box}>
        <Globe />
      </div>
    );
  }
}

export default Wapper;
