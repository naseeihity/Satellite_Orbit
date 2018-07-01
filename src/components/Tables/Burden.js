import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import { postImg } from '../utils/fetch';

import styles from '../style/table.css';

class Burder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgId: '',
      radioId: '',
      videoId: ''
    };
  }

  componentDidMount() {
    const sateId = this.props.curSateId;
    // 获取到图片列表重新渲染列表，并缓存
    postImg({ sateId }).then(msg => console.log(msg));
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleImgChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleRadioChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleVideoChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className={styles.bur_container}>
        <div className={styles.ctl_column}>
          <FormControl className={styles.bur_select}>
            <InputLabel htmlFor="img-list">图片列表</InputLabel>
            <Select
              value={this.state.imgId}
              onChange={this.handleImgChange}
              inputProps={{
                name: 'imgId',
                id: 'img-list'
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>图片1</MenuItem>
              <MenuItem value={20}>图片2</MenuItem>
              <MenuItem value={30}>图片3</MenuItem>
            </Select>
          </FormControl>
          <Button variant="raised" color="primary" className={styles.bur_btn}>
            下传图片
          </Button>
        </div>
        <div className={styles.ctl_column}>
          <FormControl className={styles.bur_select}>
            <InputLabel htmlFor="radio-list">语音列表</InputLabel>
            <Select
              value={this.state.radioId}
              onChange={this.handleRadioChange}
              inputProps={{
                name: 'radioId',
                id: 'radio-list'
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>语音1</MenuItem>
              <MenuItem value={20}>语音2</MenuItem>
              <MenuItem value={30}>语音3</MenuItem>
            </Select>
          </FormControl>
          <Button variant="raised" color="primary" className={styles.bur_btn}>
            语音转发
          </Button>
        </div>
        <div className={styles.ctl_column}>
          <FormControl className={styles.bur_select}>
            <InputLabel htmlFor="video-list">视频列表</InputLabel>
            <Select
              value={this.state.videoId}
              onChange={this.handleVideoChange}
              inputProps={{
                name: 'videoId',
                id: 'video-list'
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>视频1</MenuItem>
              <MenuItem value={20}>视频2</MenuItem>
              <MenuItem value={30}>视频3</MenuItem>
            </Select>
          </FormControl>
          <Button variant="raised" color="primary" className={styles.bur_btn}>
            太空 VR
          </Button>
        </div>
      </div>
    );
  }
}

export default Burder;
