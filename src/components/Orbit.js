import React, { Component } from 'react';
import { Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import evt from './utils/event';
import { CMD } from './utils/api';

import styles from './style/ctlbar.css';

const materialStyles = {
  switchBase: {
    color: green[50],
    '&$checked': {
      color: green[500],
      '& + $bar': {
        backgroundColor: green[500]
      }
    }
  },
  bar: {},
  checked: {}
};

class Orbit extends Component {
  constructor(props) {
    super(props);
    this.sates = {};
    props.satellites.forEach(item => {
      let status = false;
      props.defaultSate.has(item.id) && (status = true);
      this.sates[item.name] = {
        status: status,
        id: item.id
      };
    });
    this.state = {
      ...this.sates,
      checked: [],
      spaceStation: false,
      njust1: true
    };
  }

  componentDidMount() {
    console.log(this.props.satellites);
    console.log(this.state);
  }

  handleChange = (name, id) => event => {
    this.setState({ [name]: { status: event.target.checked, id: id } });
    const type = event.target.checked ? CMD.ADD : CMD.REMOVE;
    evt.emit('subscirbeSatellite', { id, type });
  };

  render() {
    const { classes, satellites } = this.props;
    const Labes = satellites.map((item, index) => {
      return (
        <FormControlLabel
          key={item.id}
          control={
            <Switch
              checked={this.state[item.name].status}
              onChange={this.handleChange(item.name, item.id)}
              value={item.name}
              classes={{
                switchBase: classes.switchBase,
                checked: classes.checked,
                bar: classes.bar
              }}
            />
          }
          label={item.name.toUpperCase()}
        />
      );
    });
    return (
      <div>
        <div className={styles.ctlbar_title}>卫星轨迹订阅</div>
        <Divider />
        <div className={styles.satellite_content}>
          <FormControl component="fieldset">
            <FormGroup>{Labes}</FormGroup>
          </FormControl>
        </div>
      </div>
    );
  }
}
export default withStyles(materialStyles)(Orbit);
