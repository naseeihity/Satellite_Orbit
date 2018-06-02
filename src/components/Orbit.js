import React, { Component } from 'react';
import { Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

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
    this.state = {
      checked: [],
      spaceStation: true,
      njust1: false
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={styles.ctlbar_title}>卫星轨迹订阅</div>
        <Divider />
        <div className={styles.satellite_content}>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.spaceStation}
                    onChange={this.handleChange('spaceStation')}
                    value="gilad"
                    classes={{
                      switchBase: classes.switchBase,
                      checked: classes.checked,
                      bar: classes.bar
                    }}
                  />
                }
                label="SPACE-STATION"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.njust1}
                    onChange={this.handleChange('njust1')}
                    value="jason"
                    classes={{
                      switchBase: classes.switchBase,
                      checked: classes.checked,
                      bar: classes.bar
                    }}
                  />
                }
                label="NJUST-1"
              />
            </FormGroup>
          </FormControl>
        </div>
      </div>
    );
  }
}
export default withStyles(materialStyles)(Orbit);
