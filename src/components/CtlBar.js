import React, { Component } from 'react';
import { Drawer, List, IconButton, Divider } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import CtlItems from './CtlItems';
import CtlbarContent from './CtlbarContent';
import Platform from './Platform';
import Satellite from './Satellite';
import Orbit from './Orbit';

import styles from './style/ctlbar.css';

const pages = [Platform, Satellite, Orbit];
class CtlBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.isOpen,
      pageId: 0
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

  loadpage = id => {
    this.setState({
      pageId: id
    });
  };

  render() {
    const { open, pageId } = this.state;
    let { satellites } = this.props;
    const ctlBarCls = open ? styles.ctlbar_drawer : '';
    const Page = pages[pageId];

    return (
      <div className={styles.ctlbar_content}>
        <Drawer variant="permanent" open={open} className={ctlBarCls}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
          <Divider />
          <List>
            <CtlItems selectedPage={this.loadpage} />
          </List>
        </Drawer>
        <div className={styles.ctlbar_right}>
          <CtlbarContent>
            <Page satellites={satellites} />
          </CtlbarContent>
        </div>
      </div>
    );
  }
}

export default CtlBar;
