import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import styles from './style/ctlItems.css';

const ListItems = [
  {
    id: 0,
    name: '平台信息'
  },
  {
    id: 1,
    name: '遥测数据'
  },
  {
    id: 2,
    name: '卫星轨迹'
  }
];

class CtlItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNum: 0,
      style: {
        top: 0
      }
    };
  }

  select = id => {
    this.setState({ activeNum: id, style: { top: id * 87 + 'px' } });
    this.props.selectedPage(id);
  };

  render() {
    const { activeNum, style } = this.state;
    const items = ListItems.map((item, index) => {
      const active = index === activeNum ? styles.active : '';
      return (
        <ListItem
          key={item.id}
          className={`${styles.listItem} ${active}`}
          button
          onClick={e => this.select(item.id, e)}
        >
          <ListItemText className={styles.listText} primary={item.name} />
        </ListItem>
      );
    });
    return (
      <div>
        {items}
        <span className={styles.quebec} style={style} />
      </div>
    );
  }
}

export default CtlItems;
