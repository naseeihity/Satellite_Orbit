import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import $ from 'jquery';
import 'echarts-gl';
import { postStation, postSatellite } from './utils/fetch';
import WsSatellite from './utils/ws';
import { CMD } from './utils/api';
import xyz2blh from './utils/transfer';

import baseImg from './asset/earth.jpg';
import starImg from './asset/starfield.jpg';
import nightImg from './asset/night.jpg';
import { stationSvg, satellSvg } from './utils/svg.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.series = [];
    this.echart = React.createRef();

    this.satellite = [];

    this.getOption = this.getOption.bind(this);
    this.setOption = this.setOption.bind(this);
    this.getStations = this.getStations.bind(this);
    this.getSatellite = this.getSatellite.bind(this);
    this.subScribe = this.subScribe.bind(this);
    this.getMsg = this.getMsg.bind(this);
  }

  componentDidMount() {
    this.getStations();
    this.getSatellite();
    const blh = xyz2blh(-2148778.283, 4426643.49, 4044675.194);
    console.log(blh.b, blh.l, blh.h);
  }

  setOption(series) {
    const echarts_instance = this.echart.current.getEchartsInstance();
    echarts_instance.setOption({ series: series });
  }

  getStations() {
    const echarts_instance = this.echart.current.getEchartsInstance();
    const setOption = this.setOption;

    let stations = [];
    let stationsPoints = [];
    let series = this.series;

    // 获取地面站数据
    postStation().then(data => {
      stations = data.stations;

      stations.forEach(station => {
        stationsPoints.push({
          name: station.description,
          value: [station.longitude, station.latitude, 0]
        });
      });

      series.push({
        label: {
          textStyle: {
            fontSize: 12
          },
          show: false,
          formatter: data => data.data.name
        },
        type: 'scatter3D',
        coordinateSystem: 'globe',
        blendMode: 'lighter',
        symbol: 'path://' + stationSvg,
        symbolSize: 12,
        itemStyle: {
          color: '#ED5F55',
          opicity: 0.8,
          borderColor: '#ECECEE'
        },
        data: stationsPoints
      });
      setOption(series);
      echarts_instance.hideLoading();
    });
  }

  getSatellite() {
    const subScribe = this.subScribe;
    postSatellite().then(data => {
      this.satellite = data.satellites;
      console.log(this.satellite);
      this.satellite.forEach(item => {
        item.id == 2 && subScribe(item.id);
      });
    });
  }

  subScribe(id) {
    const getMsg = this.getMsg;
    const ws = new WsSatellite();
    ws.open(CMD.ADD, id);
    ws.getRes(getMsg);
  }

  getMsg(msg) {
    let series = [].concat(this.series);
    if (msg.data.postions) {
      const xyz = msg.data.postions[0].r;
      const point = xyz2blh(xyz[0], xyz[1], xyz[2]);
      point[2] = 1;
      console.log(point);

      series.push({
        type: 'scatter3D',
        coordinateSystem: 'globe',
        blendMode: 'source-over',
        symbol: 'path://' + satellSvg,
        symbolSize: 25,
        itemStyle: {
          color: '#8579AF',
          opicity: 1,
          borderColor: '#ECECEE'
        },
        data: [point]
      });
      this.setOption(series);
    }
  }

  getOption() {
    return {
      backgroundColor: '#000',
      globe: {
        viewControl: {
          distance: 250,
          maxDistance: 450,
          minDistance: 100,
          autoRotate: false
          // targetCoord: [116.46, 39.92]
        },
        globeRadius: 100,
        globeOuterRadius: 110,
        baseTexture: baseImg,
        displacementScale: 0.1,
        shading: 'lambert',
        environment: starImg,
        light: { ambient: { intensity: 0.3 }, main: { intensity: 1.5 } },
        layers: [{ type: 'blend', blendTo: 'emission', texture: nightImg }]
      }
    };
  }

  render() {
    return (
      <ReactEcharts
        ref={this.echart}
        option={this.getOption()}
        style={{ height: '100%' }}
        showLoading={true}
      />
    );
  }
}

export default App;
