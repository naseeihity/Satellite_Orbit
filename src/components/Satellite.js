import React, { Component } from 'react';
import { Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import styles from './style/ctlbar.css';

const materialStyles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500]
    }
  },
  checked: {},
  size: {
    width: 40,
    height: 40
  },
  sizeIcon: {
    fontSize: 20
  }
};

class Satellite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '2'
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={styles.ctlbar_title}>遥测数据订阅</div>
        <Divider />
        <div className={styles.satellite_content}>
          <FormControl component="fieldset" required>
            <RadioGroup
              aria-label="satellite"
              name="satellite"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <FormControlLabel
                value="3"
                checked
                control={
                  <Radio
                    classes={{ root: classes.root, checked: classes.checked }}
                  />
                }
                label="SPACE-STATION"
              />
              <FormControlLabel
                value="2"
                control={
                  <Radio
                    classes={{ root: classes.root, checked: classes.checked }}
                  />
                }
                label="NJUST-1"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    );
  }
}

export default withStyles(materialStyles)(Satellite);
