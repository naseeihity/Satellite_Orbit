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

function StarService(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>卫星号</CustomTableCell>
            <CustomTableCell>星上时间</CustomTableCell>
            <CustomTableCell>CPU温度</CustomTableCell>
            <CustomTableCell>工作模式</CustomTableCell>
            <CustomTableCell>重启计数</CustomTableCell>
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
        <TableHead>
          <TableRow>
            <CustomTableCell>上行计数</CustomTableCell>
            <CustomTableCell>下行计数</CustomTableCell>
            <CustomTableCell>存储计数</CustomTableCell>
            <CustomTableCell>上次复位</CustomTableCell>
            <CustomTableCell>星务温度</CustomTableCell>
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
        <TableHead>
          <TableRow>
            <CustomTableCell>开关状态#1</CustomTableCell>
            <CustomTableCell>开关状态#2</CustomTableCell>
            <CustomTableCell>开关状态#3</CustomTableCell>
            <CustomTableCell>开关状态#4</CustomTableCell>
            <CustomTableCell>开关状态#5</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={classes.row}>
            <CustomTableCell component="th" scope="row">
              1
            </CustomTableCell>
            <CustomTableCell>1</CustomTableCell>
            <CustomTableCell>1</CustomTableCell>
            <CustomTableCell>1</CustomTableCell>
            <CustomTableCell>1</CustomTableCell>
          </TableRow>
        </TableBody>
        <TableHead>
          <TableRow>
            <CustomTableCell>开关状态#6</CustomTableCell>
            <CustomTableCell>开关状态#7</CustomTableCell>
            <CustomTableCell>开关状态#8</CustomTableCell>
            <CustomTableCell>开关状态#9</CustomTableCell>
            <CustomTableCell>开关状态#10</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={classes.row}>
            <CustomTableCell component="th" scope="row">
              1
            </CustomTableCell>
            <CustomTableCell>1</CustomTableCell>
            <CustomTableCell>1</CustomTableCell>
            <CustomTableCell>1</CustomTableCell>
            <CustomTableCell>1</CustomTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

StarService.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StarService);
