import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { transObc } from '../utils/transfer';

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

function StarService(props) {
  const { classes, starServiceInfo: info } = props;
  const obc = info ? transObc(info) : null;
  return <div>
      {obc ? <Paper className={classes.root}>
          <Table className={`${classes.table} ${tableStyles.table}`}>
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
                <CustomTableCell>{obc.no}</CustomTableCell>
                <CustomTableCell>
                  {obc.time}
                </CustomTableCell>
            <CustomTableCell>{obc.chipTemp} <span>&#8451;</span></CustomTableCell>
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
                <CustomTableCell>{obc.upCnt}</CustomTableCell>
                <CustomTableCell>{obc.downCnt}</CustomTableCell>
                <CustomTableCell>{obc.storeCnt}</CustomTableCell>
                <CustomTableCell>{obc.lastRst}</CustomTableCell>
            <CustomTableCell>{obc.obcTemp} <span>&#8451;</span></CustomTableCell>
              </TableRow>
            </TableBody>
            <TableHead>
              <TableRow>
                <CustomTableCell>开关#1</CustomTableCell>
                <CustomTableCell>开关#2</CustomTableCell>
                <CustomTableCell>开关#3</CustomTableCell>
                <CustomTableCell>开关#4</CustomTableCell>
                <CustomTableCell>开关#5</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className={classes.row}>
                <CustomTableCell>
                  <span className={tableStyles[obc.switches[0].cls]} value={obc.switches[0].status} />
                </CustomTableCell>
                <CustomTableCell>
                  <span className={tableStyles[obc.switches[1].cls]} value={obc.switches[1].status} />
                </CustomTableCell>
                <CustomTableCell>
                  <span className={tableStyles[obc.switches[2].cls]} value={obc.switches[2].status} />
                </CustomTableCell>
                <CustomTableCell>
                  <span className={tableStyles[obc.switches[3].cls]} value={obc.switches[3].status} />
                </CustomTableCell>
                <CustomTableCell>
                  <span className={tableStyles[obc.switches[4].cls]} value={obc.switches[4].status} />
                </CustomTableCell>
              </TableRow>
            </TableBody>
            <TableHead>
              <TableRow>
                <CustomTableCell>开关#6</CustomTableCell>
                <CustomTableCell>开关#7</CustomTableCell>
                <CustomTableCell>开关#8</CustomTableCell>
                <CustomTableCell>开关#9</CustomTableCell>
                <CustomTableCell>开关#10</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className={classes.row}>
                <CustomTableCell>
                  <span className={tableStyles[obc.switches[5].cls]} value={obc.switches[5].status} />
                </CustomTableCell>
                <CustomTableCell>
                  <span className={tableStyles[obc.switches[6].cls]} value={obc.switches[6].status} />
                </CustomTableCell>
                <CustomTableCell>
                  <span className={tableStyles[obc.switches[7].cls]} value={obc.switches[7].status} />
                </CustomTableCell>
                <CustomTableCell>
                  <span className={tableStyles[obc.switches[8].cls]} value={obc.switches[8].status} />
                </CustomTableCell>
                <CustomTableCell>
                  <span className={tableStyles[obc.switches[9].cls]} value={obc.switches[9].status} />
                </CustomTableCell>
              </TableRow>
            </TableBody>
            <TableHead>
              <TableRow>
                <CustomTableCell>开关#11</CustomTableCell>
                <CustomTableCell>开关#12</CustomTableCell>
                <CustomTableCell>开关#13</CustomTableCell>
                <CustomTableCell>开关#14</CustomTableCell>
                <CustomTableCell>开关#15</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className={classes.row}>
                <CustomTableCell>
                  <span className={tableStyles[obc.switches[10].cls]} value={obc.switches[10].status} />
                </CustomTableCell>
                <CustomTableCell>
                  <span className={tableStyles[obc.switches[11].cls]} value={obc.switches[11].status} />
                </CustomTableCell>
                <CustomTableCell>
                  <span className={tableStyles[obc.switches[12].cls]} value={obc.switches[12].status} />
                </CustomTableCell>
                <CustomTableCell>
                  <span className={tableStyles[obc.switches[13].cls]} value={obc.switches[13].status} />
                </CustomTableCell>
                <CustomTableCell>
                  <span className={tableStyles[obc.switches[14].cls]} value={obc.switches[14].status} />
                </CustomTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper> : '获取星务信息失败'}
    </div>;
}

StarService.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StarService);
