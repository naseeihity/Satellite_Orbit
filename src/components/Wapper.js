import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Globe from './Globe';
import CtlBar from './CtlBar';
import styles from './style/wrapper.css';

class Wapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  close = open => {
    this.setState({ open });
  };

  render() {
    const { open } = this.state;
    const openleftCls = open ? styles.right_btn_hide : '';
    return (
      <div className={styles.wapper_box}>
        <Button
          mini
          variant="fab"
          color="primary"
          aria-label="openleft"
          className={`${styles.right_btn} ${openleftCls}`}
          onClick={this.handleDrawerOpen}
        >
          <ChevronRight />
        </Button>
        {open ? <CtlBar isOpen={open} closeCallback={this.close} /> : null}
        <Globe />
      </div>
    );
  }
}

export default Wapper;
