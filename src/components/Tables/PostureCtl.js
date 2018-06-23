import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { transAdcs } from '../utils/transfer';

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

function PostureCtl(props) {
  const { classes, postureCtlInfo: info } = props;
  const adcs = info ? transAdcs(info) : null;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table} style={{ tableLayout: 'auto' }}>
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
            <CustomTableCell>{adcs.mode}</CustomTableCell>
            <CustomTableCell>{adcs.absTime}</CustomTableCell>
            <CustomTableCell>{adcs.chipTemp}</CustomTableCell>
            <CustomTableCell>{adcs.attiMeas.wheelSpd}</CustomTableCell>
            <CustomTableCell>{adcs.rstCnt}</CustomTableCell>
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
            <CustomTableCell>{adcs.dampCnt}</CustomTableCell>
            <CustomTableCell>{adcs.meterCnt}</CustomTableCell>
            <CustomTableCell>{adcs.stabCnt}</CustomTableCell>
            <CustomTableCell>{adcs.lastRst}</CustomTableCell>
            <CustomTableCell>{adcs.rcvCnt}</CustomTableCell>
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
            <CustomTableCell>
              <span className={tableStyles[adcs.attiMeas.subSwitch[0].cls]} value={adcs.attiMeas.subSwitch[0].status} />
            </CustomTableCell>
            <CustomTableCell>
              <span className={tableStyles[adcs.attiMeas.subSwitch[0].cls]} value={adcs.attiMeas.subSwitch[0].status} />
            </CustomTableCell>
            <CustomTableCell>
              <span className={tableStyles[adcs.attiMeas.subSwitch[0].cls]} value={adcs.attiMeas.subSwitch[0].status} />
            </CustomTableCell>
            <CustomTableCell>
              <span className={tableStyles[adcs.attiMeas.subSwitch[0].cls]} value={adcs.attiMeas.subSwitch[0].status} />
            </CustomTableCell>
            <CustomTableCell>
              <span className={tableStyles[adcs.attiMeas.subSwitch[0].cls]} value={adcs.attiMeas.subSwitch[0].status} />
            </CustomTableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table className={classes.table} style={{ tableLayout: 'auto' }}>
        <TableHead>
          <TableRow>
            <CustomTableCell>磁强计X</CustomTableCell>
            <CustomTableCell>磁强计Y</CustomTableCell>
            <CustomTableCell>磁强计Z</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={`${classes.row}`}>
            <CustomTableCell>{adcs.attiMeas.magmeter[0]}</CustomTableCell>
            <CustomTableCell>{adcs.attiMeas.magmeter[1]}</CustomTableCell>
            <CustomTableCell>{adcs.attiMeas.magmeter[2]}</CustomTableCell>
          </TableRow>
        </TableBody>
        <TableHead>
          <TableRow>
            <CustomTableCell>陀螺仪X</CustomTableCell>
            <CustomTableCell>陀螺仪Y</CustomTableCell>
            <CustomTableCell>陀螺仪Z</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={`${classes.row}`}>
            <CustomTableCell>{adcs.attiMeas.gyro[0]}</CustomTableCell>
            <CustomTableCell>{adcs.attiMeas.gyro[1]}</CustomTableCell>
            <CustomTableCell>{adcs.attiMeas.gyro[2]}</CustomTableCell>
          </TableRow>
        </TableBody>
        <TableHead>
          <TableRow>
            <CustomTableCell>定姿偏航角</CustomTableCell>
            <CustomTableCell>定姿滚动角</CustomTableCell>
            <CustomTableCell>定姿俯仰角</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={`${classes.row}`}>
            <CustomTableCell>{adcs.attiDter.dVectorYaw}</CustomTableCell>
            <CustomTableCell>{adcs.attiDter.dVectorRolling}</CustomTableCell>
            <CustomTableCell>{adcs.attiDter.dVectorPitch}</CustomTableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table className={classes.table} style={{ tableLayout: 'auto' }}>
        <TableHead>
          <TableRow>
            <CustomTableCell>俯仰角度</CustomTableCell>
            <CustomTableCell>俯仰角速度</CustomTableCell>
            <CustomTableCell>定轨模式</CustomTableCell>
            <CustomTableCell>GPS搜星数</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={`${classes.row}`}>
            <CustomTableCell>{adcs.attiDter.pitchAng}</CustomTableCell>
            <CustomTableCell>{adcs.attiDter.pitchAngSpd}</CustomTableCell>
            <CustomTableCell>{adcs.orbit.mode}</CustomTableCell>
            <CustomTableCell>{adcs.orbit.gpsCnt}</CustomTableCell>
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
