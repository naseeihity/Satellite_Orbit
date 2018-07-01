import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import { postComd } from '../utils/fetch';

import styles from '../style/table.css';

const TYPE = {
  '0': '动量轮A',
  '1': '动量轮B',
  '11': 'GPS',
  on: '开启',
  off: '关闭'
};

class Control extends Component {
  constructor(props) {
    super(props);
    this.state = { openSnackbar: false, snackMsg: '', status: 0 };
  }

  pubulishComd = (type, data) => {
    const sateId = this.props.curSateId;

    postComd({ sateId, type, data }).then(msg => {
      let snackMsg = '';
      let openSnackbar = false;
      let status = 0;
      if (msg && msg.returnMsg && 'success' === msg.returnMsg) {
        openSnackbar = true;
        status = 1;
        snackMsg = TYPE[type] + TYPE[data] + '成功';
      } else {
        openSnackbar = false;
        status = 0;
        snackMsg = TYPE[type] + TYPE[data] + '失败';
      }

      this.setState({ openSnackbar, snackMsg, status });
    });
  };

  handleClose = () => {
    this.setState({ openSnackbar: false, snackMsg: '' });
  };

  render() {
    const { snackMsg, openSnackbar } = this.state;
    const snackClass = this.state.status ? styles.success : styles.fail;
    return (
      <div className={styles.ctl_btnlist}>
        <div className={styles.ctl_column}>
          <Button
            variant="raised"
            color="primary"
            className={styles.ctl_btn}
            onClick={this.pubulishComd.bind(this, 0, 'on')}
          >
            动量轮A开
          </Button>
          <Button
            variant="raised"
            onClick={this.pubulishComd.bind(this, 0, 'off')}
            color="secondary"
            className={styles.ctl_btn}
          >
            动量轮A关
          </Button>
        </div>
        <div className={styles.ctl_column}>
          <Button
            variant="raised"
            onClick={this.pubulishComd.bind(this, 1, 'on')}
            color="primary"
            className={styles.ctl_btn}
          >
            动量轮B开
          </Button>
          <Button
            variant="raised"
            onClick={this.pubulishComd.bind(this, 1, 'off')}
            color="secondary"
            className={styles.ctl_btn}
          >
            动量轮B关
          </Button>
        </div>

        <div className={styles.ctl_column}>
          <Button
            variant="raised"
            onClick={this.pubulishComd.bind(this, 11, 'on')}
            color="primary"
            className={styles.ctl_btn}
          >
            GPS开
          </Button>
          <Button
            variant="raised"
            onClick={this.pubulishComd.bind(this, 11, 'off')}
            color="secondary"
            className={styles.ctl_btn}
          >
            GPS关
          </Button>
        </div>
        <Snackbar
          className={`${styles.snackBar} ${snackClass}`}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={openSnackbar}
          onClose={this.handleClose}
          ContentProps={{ 'aria-describedby': 'ctl-message-id' }}
          message={<span id="ctl-message-id">{snackMsg}</span>}
        />
      </div>
    );
  }
}

export default Control;
