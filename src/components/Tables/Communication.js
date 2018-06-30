import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { transComm } from '../utils/transfer';

import tableStyles from '../style/table.css';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: '3px 6px',
    textAlign: 'center'
  },
  body: {
    fontSize: 14,
    textAlign: 'center',
    padding: '3px 6px'
  }
}))(TableCell);

const styles = theme => ({
  root: {
    maxWidth: '100%',
    overflowX: 'auto',
    background: 'transparent'
  },
  table: {
    maxWidth: '100%'
  },
  row: {
    backgroundColor: theme.palette.background.default
  }
});

function Communication(props) {
  const { classes, communicationInfo: info } = props;
  const comm = info ? transComm(info) : null;

  return <Paper className={classes.root}>
      <div className={tableStyles.title}>通信信息(发送端)</div>
      <Table className={`${classes.table} ${tableStyles.table}`}>
        <TableHead>
          <TableRow>
            <CustomTableCell>通信电流</CustomTableCell>
            <CustomTableCell>通信电压</CustomTableCell>
            <CustomTableCell>晶振温度</CustomTableCell>
            <CustomTableCell>功放温度</CustomTableCell>
            <CustomTableCell>信号强度</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={classes.row}>
            <CustomTableCell>
              {comm.recv.cur} <span>mA</span>
            </CustomTableCell>
            <CustomTableCell>
              {comm.recv.motherVol} <span>mV</span>
            </CustomTableCell>
            <CustomTableCell>
              {comm.recv.cryTemp} <span>&#8451;</span>
            </CustomTableCell>
            <CustomTableCell>
              {comm.recv.ampTemp} <span>&#8451;</span>
            </CustomTableCell>
            <CustomTableCell>
              {comm.recv.signal} <span>dBM</span>
            </CustomTableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className={tableStyles.title}>通信信息(接收端)</div>
      <Table className={`${classes.table} ${tableStyles.table}`}>
        <TableHead>
          <TableRow>
            <CustomTableCell>发射功率</CustomTableCell>
            <CustomTableCell>前向功率</CustomTableCell>
            <CustomTableCell>晶振温度</CustomTableCell>
            <CustomTableCell>功放温度</CustomTableCell>
            <CustomTableCell>信标状态</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={classes.row}>
            <CustomTableCell>
              {comm.send.reflectPower} <span>dBM</span>
            </CustomTableCell>
            <CustomTableCell>
              {comm.send.forwardPower} <span>dBM</span>
            </CustomTableCell>
            <CustomTableCell>
            {comm.send.cryTemp} <span>&#8451;</span>
            </CustomTableCell>
            <CustomTableCell>
              {comm.send.ampTemp} <span>&#8451;</span>
            </CustomTableCell>
            <CustomTableCell>{comm.send.status}</CustomTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>;
}

Communication.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Communication);
