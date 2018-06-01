import React, { Component } from 'react';
import { Drawer, List, IconButton } from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import styles from './style/satelliteInfo.css';

const TabContainer = ({ children, dir }) => {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  );
};

class SatelliteInfo extends Component {
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

  handleTabsClose = () => {
    this.setState({ open: false });
    this.props.closeCallback(false);
  };

  handleChange = (event, pageId) => {
    this.setState({ pageId });
  };

  handleChangeIndex = index => {
    this.setState({ pageId: index });
  };

  render() {
    const { open, pageId } = this.state;
    return (
      <div className={styles.content}>
        <div className={styles.tabbox}>
          <AppBar position="static" className={styles.appbar}>
            <Tabs
              value={pageId}
              onChange={this.handleChange}
              textColor="primary"
              scrollable
              scrollButtons="off"
            >
              <Tab label="星务" className={styles.tab} />
              <Tab label="姿控" className={styles.tab} />
              <Tab label="通信" className={styles.tab} />
              <Tab label="电源" className={styles.tab} />
              <Tab label="载荷" className={styles.tab} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={'x'}
            index={pageId}
            onChangeIndex={this.handleChangeIndex}
            className={styles.charts_box}
          >
            <TabContainer dir={'left'}>
              <span>星务</span>
            </TabContainer>
            <TabContainer dir={'left'}>姿控</TabContainer>
            <TabContainer dir={'left'}>通信</TabContainer>
            <TabContainer dir={'left'}>电源</TabContainer>
            <TabContainer dir={'left'}>载荷</TabContainer>
          </SwipeableViews>
        </div>
        <div className={styles.footer}>
          <Typography component="span" className={styles.title}>
            SPACE-STATION
          </Typography>
          <IconButton
            onClick={this.handleTabsClose}
            className={styles.right_btn}
          >
            <ChevronRight />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default SatelliteInfo;
