import React, { Component } from 'react';
import { Drawer, List, IconButton, Divider } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import CtlItems from './CtlItems';
import CtlbarContent from './CtlbarContent';
import Orbit from './Orbit';
import Platform from './Platform';

import styles from './style/ctlbar.css';

class CtlBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.isOpen
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.isOpen
    });
  }

  handleDrawerClose = () => {
    this.setState({ open: false });
    this.props.closeCallback(false);
  };

  render() {
    const { open } = this.state;
    const ctlBarCls = open ? styles.ctlbar_drawer : '';

    return (
      <div className={styles.ctlbar_content}>
        <Drawer variant="permanent" open={open} className={ctlBarCls}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
          <Divider />
          <List>
            <CtlItems />
          </List>
        </Drawer>
        <div className={styles.ctlbar_right}>
          <CtlbarContent>
            <Platform />
          </CtlbarContent>
        </div>
      </div>
    );
  }
}

export default CtlBar;
