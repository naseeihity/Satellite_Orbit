import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

const obc = {
  no: 1,
  time: '2018-6-13',
  chipTemp: 35,
  mode: 1,
  rstCnt: 10,
  upCnt: 4,
  downCnt: 6,
  storeCnt: 33,
  lastRst: '2018-6-13',
  obcTemp: 65
};

function Communication(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <div>通信息系(发送端)</div>
      <Table className={classes.table}>
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
            <CustomTableCell component="th" scope="row">
              {obc.no}
            </CustomTableCell>
            <CustomTableCell>{obc.time}</CustomTableCell>
            <CustomTableCell>{obc.chipTemp}</CustomTableCell>
            <CustomTableCell>{obc.mode}</CustomTableCell>
            <CustomTableCell>{obc.rstCnt}</CustomTableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div>通信信息(接收端)</div>
      <Table className={classes.table}>
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
            <CustomTableCell component="th" scope="row">
              {obc.upCnt}
            </CustomTableCell>
            <CustomTableCell>{obc.downCnt}</CustomTableCell>
            <CustomTableCell>{obc.storeCnt}</CustomTableCell>
            <CustomTableCell>{obc.lastRst}</CustomTableCell>
            <CustomTableCell>{obc.obcTemp}</CustomTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

Communication.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Communication);
