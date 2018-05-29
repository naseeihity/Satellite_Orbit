import random from 'lodash.random';
import { WS_SATELLITE } from './api';

export default class WsSatellite {
  constructor() {
    this.ws = new WebSocket(WS_SATELLITE);
  }

  connect() {
    const ws = this.ws;

    return new Promise((resolve, reject) => {
      ws.onerror = err => {
        console.log(err);
        reject(ws);
      };

      ws.onclose = () => {
        console.log('Connection closed!');
      };

      ws.onopen = () => {
        console.log('Connection open ...');
        resolve(ws);
      };
    });
  }

  open(taskType, satelliteId) {
    const no = random(0, 1000);
    const cmd = taskType || 1;
    const data = satelliteId || 0;
    const ws = this.ws;
    ws.send(
      JSON.stringify({
        no,
        cmd,
        data
      })
    );
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
