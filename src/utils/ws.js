import random from 'lodash.random';
import { WS_SATELLITE } from './api';

export default class WsSatellite {
  constructor() {
    this.ws = new WebSocket(WS_SATELLITE);
  }

  open(taskType, satelliteId) {
    const no = random(0, 1000);
    const cmd = taskType || 1;
    const data = satelliteId || 0;
    const ws = this.ws;
    ws.onopen = () => {
      console.log('Connection open ...');
      ws.send(
        JSON.stringify({
          no,
          cmd,
          data
        })
      );
    };

    ws.onerror = err => {
      console.log(err);
    };

    ws.onclose = () => {
      console.log('Connection closed!');
    };
  }

  close(taskType, satelliteId) {
    const ws = this.ws;
    ws.close();
  }

  getRes(func) {
    const ws = this.ws;
    ws.onmessage = data => func(JSON.parse(data.data));
  }
}
