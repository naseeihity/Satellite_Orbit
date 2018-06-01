import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Globe from './Globe';
import CtlBar from './CtlBar';
import SatelliteInfo from './SatelliteInfo';

import styles from './style/wrapper.css';

class Wapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lopen: false,
      ropen: false
    };
  }

  handleDrawerOpen = () => {
    this.setState({ lopen: true });
  };

  handleDrawerClose = () => {
    this.setState({ lopen: false });
  };

  closeDrawer = open => {
    this.setState({ lopen: open });
  };

  closeTab = open => {
    this.setState({ ropen: open });
  };

  render() {
    const { lopen, ropen } = this.state;
    const openleftCls = lopen ? styles.btn_hide : '';
    const openrightCls = ropen ? styles.btn_hide : '';

    return (
      <div className={styles.wapper_box}>
        <Button
          mini
          variant="fab"
          color="primary"
          aria-label="openleft"
          className={`${styles.btn} ${styles.btn_left} ${openleftCls}`}
          onClick={this.handleDrawerOpen}
        >
          <ChevronRight />
        </Button>
        {lopen ? (
          <CtlBar isOpen={lopen} closeCallback={this.closeDrawer} />
        ) : null}
        <Globe />
        <Button
          mini
          variant="fab"
          color="primary"
          aria-label="openright"
          className={`${styles.btn} ${styles.btn_right} ${openrightCls}`}
          onClick={this.closeTab}
        >
          <ChevronLeft />
        </Button>
        {ropen ? (
          <SatelliteInfo isOpen={ropen} closeCallback={this.closeTab} />
        ) : null}
      </div>
    );
  }
}

export default Wapper;
