import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';

import StarService from './Tables/StarService';
import PostureCtl from './Tables/PostureCtl';
import Communication from './Tables/Communication';
import PowerSupply from './Tables/PowerSupply';
import Burden from './Tables/Burden';
import Control from './Tables/Control';

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
      openSnackbar: true,
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

  handleClose = () => {
    this.setState({ openSnackbar: false, open: false });
    this.props.closeCallback(false);
  };

  render() {
    const { pageId, openSnackbar } = this.state;
    const { curSate, curSateInfo } = this.props;
    const curSateName = curSate.name ? curSate.name.toUpperCase() : '未知';
    const curSateId = curSate.id;
    const starServiceInfo = (curSateInfo && curSateInfo.obc) || null;
    const postureCtlInfo = (curSateInfo && curSateInfo.adcs) || null;
    const communicationInfo = (curSateInfo && curSateInfo.obc && curSateInfo.obc.comm) || null;
    const powerInfo = (curSateInfo && curSateInfo.obc && curSateInfo.obc.eps) || null;

    return (
      <div>
        {curSateInfo && starServiceInfo && postureCtlInfo ? (
          <div className={styles.content}>
            <div>
              <div className={styles.tabbox}>
                <AppBar position="static" className={styles.appbar}>
                  <Tabs value={pageId} onChange={this.handleChange} textColor="primary" scrollable scrollButtons="on">
                    <Tab label="星务" className={styles.tab} />
                    <Tab label="姿控" className={styles.tab} />
                    <Tab label="通信" className={styles.tab} />
                    <Tab label="电源" className={styles.tab} />
                    <Tab label="控制" className={styles.tab} />
                    <Tab label="载荷" className={styles.tab} />
                  </Tabs>
                </AppBar>
                <SwipeableViews
                  axis={'x'}
                  index={pageId}
                  onChangeIndex={this.handleChangeIndex}
                  className={styles.charts_box}
                >
                  <TabContainer dir={'left'} className={styles.tab_container}>
                    <StarService starServiceInfo={starServiceInfo} />
                  </TabContainer>
                  <TabContainer dir={'left'} className={styles.tab_container}>
                    <PostureCtl postureCtlInfo={postureCtlInfo} />
                  </TabContainer>
                  <TabContainer dir={'left'} className={styles.tab_container}>
                    <Communication communicationInfo={communicationInfo} />
                  </TabContainer>
                  <TabContainer dir={'left'} className={styles.tab_container}>
                    <PowerSupply powerInfo={powerInfo} />
                  </TabContainer>
                  <TabContainer dir={'left'} className={styles.tab_container}>
                    <Control curSateId={curSateId} />
                  </TabContainer>
                  <TabContainer dir={'left'} className={styles.tab_container}>
                    <Burden />
                  </TabContainer>
                </SwipeableViews>
              </div>
            </div>
            <div className={styles.footer}>
              <Typography component="span" className={styles.title}>
                {curSateName}
              </Typography>
              <IconButton onClick={this.handleTabsClose} className={styles.right_btn}>
                <ChevronRight />
              </IconButton>
            </div>
          </div>
        ) : (
          <Snackbar
            className={styles.snackBar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={openSnackbar}
            onClose={this.handleClose}
            ContentProps={{ 'aria-describedby': 'message-id' }}
            message={<span id="message-id">暂未获取到卫星信息</span>}
          />
        )}
      </div>
    );
  }
}

export default SatelliteInfo;
