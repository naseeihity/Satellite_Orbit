import React, { Component } from 'react';
import { Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { postSmart } from './utils/fetch';

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

  componentDidMount() {
    this.getSelectInfo();
  }

  getSelectInfo = () => {
    const id = parseInt(this.state.value, 10);
    postSmart({ sateId: id }).then(data => {
      console.log(data);
    });
  };

  handleChange = event => {
    this.setState({ value: event.target.value }, this.getSelectInfo);
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
                control={
                  <Radio
                    classes={{ root: classes.root, checked: classes.checked }}
                  />
                }
                label="SPACE-STATION"
              />
              <FormControlLabel
                value="2"
                checked
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
