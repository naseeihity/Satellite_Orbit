import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import $ from 'jquery';
import 'echarts-gl';
import { postStation, postSatellite } from './utils/fetch';
import WsSatellite from './utils/ws';
import { CMD } from './utils/api';

import baseImg from './asset/earth.jpg';
import starImg from './asset/starfield.jpg';
import nightImg from './asset/night.jpg';
import { stationSvg } from './utils/svg.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.echart = React.createRef();

    this.satellite = [];

    this.getOption = this.getOption.bind(this);
    this.getStations = this.getStations.bind(this);
    this.getSatellite = this.getSatellite.bind(this);
    this.subScribe = this.subScribe.bind(this);
  }

  componentDidMount() {
    this.getStations();
    this.getSatellite();
  }

  getStations() {
    const echarts_instance = this.echart.current.getEchartsInstance();

    let stations = [];
    let stationsPoints = [];
    let series = [];

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

      echarts_instance.setOption({ series: series });

      echarts_instance.hideLoading();
    });
  }

  getSatellite() {
    const subScribe = this.subScribe;
    postSatellite().then(data => {
      this.satellite = data.satellites;
      console.log(this.satellite);
      this.satellite.forEach(item => {
        subScribe(item.id);
      });
    });
  }

  subScribe(id) {
    const ws = new WsSatellite();
    ws.open(CMD.ADD, id);
  }

  getOption() {
    return {
      backgroundColor: '#000',
      globe: {
        viewControl: {
          distance: 250,
          maxDistance: 450,
          minDistance: 100,
          autoRotate: false,
          targetCoord: [116.46, 39.92]
        },
        baseTexture: baseImg,
        displacementScale: 0.1,
        shading: 'lambert',
        environment: starImg,
        light: { ambient: { intensity: 0.3 }, main: { intensity: 1.5 } },
        layers: [{ type: 'blend', blendTo: 'emission', texture: nightImg }]
      }
    };
  }

  componentWillUnmount() {}

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
