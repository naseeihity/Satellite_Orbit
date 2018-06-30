import React, { Component } from 'react';
import find from 'lodash.find';
import Button from '@material-ui/core/Button';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Globe from './Globe';
import CtlBar from './CtlBar';
import SatelliteInfo from './SatelliteInfo';
import { postSatellite, postCurInfo } from './utils/fetch';
import evt from './utils/event';
import { CMD } from './utils/api';

import styles from './style/wrapper.css';

import { NJUST } from './utils/consts';

class Wapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lopen: false,
      ropen: false,
      satellites: [],
      defaultSate: new Set([NJUST]),
      curSateId: '2',
      curSateInfo: null
    }; // 默认订阅的卫星
  }

  componentDidMount() {
    const curSate = new Set(this.state.defaultSate);
    const id = this.state.curSateId;
    evt.addListener('subscirbeSatellite', item => {
      CMD.ADD === item.type ? curSate.add(item.id) : curSate.delete(item.id);
      this.setState({ defaultSate: curSate });
    });

    // 监听订阅的卫星(信息)改变
    evt.addListener('getSateInfo', item => {
      this.setState({ curSateId: item.id, curSateInfo: item.data });
    });

    postSatellite().then(data => {
      this.setState({ satellites: data.satellites });
    });

    // 默认订阅卫星数据
    postCurInfo({ sateId: id }).then(data => {
      this.setState({ curSateInfo: data });
    });
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
    const { lopen, ropen, satellites, defaultSate, curSateInfo, curSateId } = this.state;
    const openleftCls = lopen ? styles.btn_hide : '';
    const openrightCls = ropen ? styles.btn_hide : '';
    const curSate = find(satellites, ('id': curSateId)) || '';

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
          <CtlBar isOpen={lopen} closeCallback={this.closeDrawer} satellites={satellites} defaultSate={defaultSate} />
        ) : null}
        <Globe satellites={satellites} defaultSate={defaultSate} />
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
          <SatelliteInfo isOpen={ropen} closeCallback={this.closeTab} curSateInfo={curSateInfo} curSate={curSate} />
        ) : null}
      </div>
    );
  }
}

export default Wapper;
