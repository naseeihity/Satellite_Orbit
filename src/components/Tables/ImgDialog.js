import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import find from 'lodash.find';
import defaultImg from '../asset/defaultImg.svg';

import styles from '../style/table.css';

class ImgDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      img: props.img,
      id: props.id,
      image: find(props.img, { id: props.id }),
      completed: 0,
      finishLoad: false
    };

    this.timer = null;
  }

  handleClose = () => {
    const { dialogClose } = this.props;
    this.setState({ open: false });
    dialogClose(false);
    clearInterval(this.timer);
  };

  componentWillReceiveProps(nextProps) {
    const { open, img, id } = nextProps;
    let finishLoad = true;
    if (open) {
      if (open !== this.state.open || img !== this.state.img || id !== this.state.id) {
        if (id !== this.state.id) {
          finishLoad = false;
        }
        this.setState({ open, img, id, finishLoad, image: find(img, { id: id }) });
        this.timer = setInterval(this.progress, 500);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    if (completed === 100) {
      this.setState({ completed: 0, finishLoad: true });
      clearInterval(this.timer);
    } else {
      const diff = Math.random() * 20;
      this.setState({ completed: Math.min(completed + diff, 100) });
    }
  };

  render() {
    const imgName = this.state.image ? this.state.image.name : '';
    const imgUrl = this.state.image ? this.state.image.url : defaultImg;
    const imgClass = this.state.finishLoad ? styles.show : '';
    const loadClass = this.state.finishLoad ? styles.hide : '';
    return (
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{imgName}</DialogTitle>
        <DialogContent className={styles.dialog_container}>
          <div className={`${styles.img_loading} ${loadClass}`}>
            <CircularProgress variant="determinate" size={50} value={this.state.completed} />
          </div>
          <div className={`${styles.img_container} ${imgClass}`}>
            <img src={imgUrl} className={styles.image} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            关闭
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ImgDialog;
