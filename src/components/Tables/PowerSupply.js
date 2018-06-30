import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

function PowerSupply(props) {
  const { classes, powerInfo: info } = props;
  const eps = info ? info : null;

  return <Paper className={classes.root}>
      <Table className={`${classes.table} ${tableStyles.table}`}>
        <TableHead>
          <TableRow>
            <CustomTableCell>母线电流</CustomTableCell>
            <CustomTableCell>母线电压</CustomTableCell>
            <CustomTableCell>通信机电流</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={classes.row}>
            <CustomTableCell>
              {eps.motherCurr} <span>mA</span>
            </CustomTableCell>
          <CustomTableCell>{eps.motherVol} <span>mV</span></CustomTableCell>
          <CustomTableCell>{eps.commCurr} <span>mA</span></CustomTableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table className={classes.table} className={`${classes.table} ${tableStyles.table}`}>
        <TableHead>
          <TableRow>
            <CustomTableCell>光电流1</CustomTableCell>
            <CustomTableCell>光电流2</CustomTableCell>
            <CustomTableCell>光电流3</CustomTableCell>
            <CustomTableCell>光电流4</CustomTableCell>
            <CustomTableCell>光电流5</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={classes.row}>
          <CustomTableCell>{eps.curr[0]} <span>mA</span></CustomTableCell>
          <CustomTableCell>{eps.curr[1]} <span>mA</span></CustomTableCell>
          <CustomTableCell>{eps.curr[2]} <span>mA</span></CustomTableCell>
          <CustomTableCell>{eps.curr[3]} <span>mA</span></CustomTableCell>
          <CustomTableCell>{eps.curr[4]} <span>mA</span></CustomTableCell>
          </TableRow>
        </TableBody>
        <TableHead>
          <TableRow>
            <CustomTableCell>光电压1</CustomTableCell>
            <CustomTableCell>光电压2</CustomTableCell>
            <CustomTableCell>光电压3</CustomTableCell>
            <CustomTableCell>光电压4</CustomTableCell>
            <CustomTableCell>光电压5</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={classes.row}>
          <CustomTableCell>{eps.vol[0]} <span>mV</span></CustomTableCell>
            <CustomTableCell>{eps.vol[1]} <span>mV</span></CustomTableCell>
            <CustomTableCell>{eps.vol[2]} <span>mV</span></CustomTableCell>
            <CustomTableCell>{eps.vol[3]} <span>mV</span></CustomTableCell>
            <CustomTableCell>{eps.vol[4]} <span>mV</span></CustomTableCell>
          </TableRow>
        </TableBody>
        <TableHead>
          <TableRow>
            <CustomTableCell>电池板温度1</CustomTableCell>
            <CustomTableCell>电池板温度2</CustomTableCell>
            <CustomTableCell>电池板温度3</CustomTableCell>
            <CustomTableCell>电池板温度4</CustomTableCell>
            <CustomTableCell>电池板温度5</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={classes.row}>
          <CustomTableCell>{eps.temp[0]} <span>&#8451;</span></CustomTableCell>
            <CustomTableCell>{eps.temp[1]} <span>&#8451;</span></CustomTableCell>
            <CustomTableCell>{eps.temp[2]} <span>&#8451;</span></CustomTableCell>
            <CustomTableCell>{eps.temp[3]} <span>&#8451;</span></CustomTableCell>
            <CustomTableCell>{eps.temp[4]} <span>&#8451;</span></CustomTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>;
}

PowerSupply.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PowerSupply);
