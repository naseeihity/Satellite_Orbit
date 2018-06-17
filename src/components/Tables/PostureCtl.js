import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import postStyles from '../style/table.css';

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

function PostureCtl(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table
        className={classes.table}
        fixedHeader={false}
        style={{ tableLayout: 'auto' }}
      >
        <TableHead>
          <TableRow>
            <CustomTableCell>姿控模式</CustomTableCell>
            <CustomTableCell>姿控时间</CustomTableCell>
            <CustomTableCell>CPU温度</CustomTableCell>
            <CustomTableCell>动量轮转速</CustomTableCell>
            <CustomTableCell>重启计数</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={classes.row}>
            <CustomTableCell>{obc.no}</CustomTableCell>
            <CustomTableCell>{obc.time}</CustomTableCell>
            <CustomTableCell>{obc.chipTemp}</CustomTableCell>
            <CustomTableCell>{obc.mode}</CustomTableCell>
            <CustomTableCell>{obc.rstCnt}</CustomTableCell>
          </TableRow>
        </TableBody>
        <TableHead>
          <TableRow>
            <CustomTableCell>阻尼计数</CustomTableCell>
            <CustomTableCell>测量计数</CustomTableCell>
            <CustomTableCell>稳定计数</CustomTableCell>
            <CustomTableCell>上次复位</CustomTableCell>
            <CustomTableCell>指令计数</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={classes.row}>
            <CustomTableCell>{obc.upCnt}</CustomTableCell>
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
            <CustomTableCell>1</CustomTableCell>
            <CustomTableCell>1</CustomTableCell>
            <CustomTableCell>1</CustomTableCell>
            <CustomTableCell>1</CustomTableCell>
            <CustomTableCell>1</CustomTableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table
        className={classes.table}
        fixedHeader={false}
        style={{ tableLayout: 'auto' }}
      >
        <TableHead>
          <TableRow className={postStyles.threeRow}>
            <CustomTableCell>磁强计X</CustomTableCell>
            <CustomTableCell>磁强计Y</CustomTableCell>
            <CustomTableCell>磁强计Z</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={`${postStyles.threeRow} ${classes.row}`}>
            <CustomTableCell>1</CustomTableCell>
            <CustomTableCell>1</CustomTableCell>
            <CustomTableCell>1</CustomTableCell>
          </TableRow>
        </TableBody>
        <TableHead>
          <TableRow className={postStyles.threeRow}>
            <CustomTableCell>陀螺仪X</CustomTableCell>
            <CustomTableCell>陀螺仪Y</CustomTableCell>
            <CustomTableCell>陀螺仪Z</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={`${postStyles.threeRow} ${classes.row}`}>
            <CustomTableCell>1</CustomTableCell>
            <CustomTableCell>1</CustomTableCell>
            <CustomTableCell>1</CustomTableCell>
          </TableRow>
        </TableBody>
        <TableHead>
          <TableRow className={postStyles.threeRow}>
            <CustomTableCell>定姿偏航角</CustomTableCell>
            <CustomTableCell>定姿滚动角</CustomTableCell>
            <CustomTableCell>定姿俯仰角</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={`${postStyles.threeRow} ${classes.row}`}>
            <CustomTableCell>1</CustomTableCell>
            <CustomTableCell>1</CustomTableCell>
            <CustomTableCell>1</CustomTableCell>
          </TableRow>
        </TableBody>
        <TableHead>
          <TableRow className={postStyles.fourRow}>
            <CustomTableCell>俯仰角度</CustomTableCell>
            <CustomTableCell>俯仰角速度</CustomTableCell>
            <CustomTableCell>定轨模式</CustomTableCell>
            <CustomTableCell>GPS搜星数</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={`${postStyles.fourRow} ${classes.row}`}>
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

PostureCtl.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostureCtl);
