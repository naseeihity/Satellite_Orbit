import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import $ from 'jquery';
import 'echarts-gl';
import find from 'lodash.find';
import isEqual from 'lodash.isequal';
import difference from 'lodash.difference';

import { postStation, postSatellite, getStationStatus } from './utils/fetch';
import WsSatellite from './utils/ws';
import { CMD } from './utils/api';
import { xyz2blh, calcv } from './utils/transfer';

import baseImg from './asset/elev_bump_4k.jpg';
// import baseImg from './asset/newearth.png';
// import starImg from './asset/starfield.jpg';
import starImg from './asset/star.jpg';
import nightImg from './asset/night1.jpg';
import { stationSvg, satellSvg } from './utils/svg.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.echart = React.createRef();

    this.state = { satellite: [], stationsCache: [], onlineStation: [] };

    this.ws = {};
    this.interv = null;

    this.initOption = this.initOption.bind(this);
    this.setOption = this.setOption.bind(this);
    this.getStations = this.getStations.bind(this);
    this.getStationsStatus = this.getStationsStatus.bind(this);
    this.getSatellite = this.getSatellite.bind(this);
    this.subScribe = this.subScribe.bind(this);
    this.getMsg = this.getMsg.bind(this);
    this.getEchartOpt = this.getEchartOpt.bind(this);
  }

  componentDidMount() {
    const echarts_instance = this.echart.current.getEchartsInstance();

    this.ws = new WsSatellite();

    echarts_instance.on('click', params => {
      if (params.componentType === 'series') {
        if (
          params.seriesType === 'scatter3D' &&
          params.seriesName === 'satellite'
        ) {
          console.log('clicked satellite');
        }
      }
    });
    this.getStations();
    this.getSatellite();
  }

  getEchartOpt() {
    const echarts_instance = this.echart.current.getEchartsInstance();
    return echarts_instance.getOption();
  }

  setOption(opt) {
    const echarts_instance = this.echart.current.getEchartsInstance();
    opt.forEach(element => {
      echarts_instance.setOption(element);
    });
    echarts_instance.hideLoading();
  }

  getStationsStatus() {
    let series = this.getEchartOpt().series;
    const { onlineStation, stationsCache } = this.state;

    const setOption = this.setOption;

    getStationStatus().then(data => {
      if (!isEqual(data.stations, onlineStation)) {
        data.stations = [12];
        const changedItem = difference(data.stations, onlineStation);

        this.setState(prevState => {
          return { onlineStation: data.stations };
        });
        series.forEach(item => {
          if ('station' === item.name) {
            changedItem.forEach(id => {
              let station = find(stationsCache, { id: id });
              station.online = !station.online;
            });
            item.data = stationsCache;
          }
        });
        setOption([{ series }]);
      }
    });
  }

  getStations() {
    const setOption = this.setOption;
    const getStationsStatus = this.getStationsStatus;
    let interv = this.interv;

    let stations = [];
    let stationsPoints = [];
    let series = [];

    // 获取地面站数据
    postStation().then(data => {
      // 获取并缓存地面站点位
      stations = data.stations;
      stations.forEach(station => {
        stationsPoints.push({
          id: station.id,
          info: station,
          online: false,
          name: station.description,
          value: [station.longitude, station.latitude, 0]
        });
      });

      this.setState(() => {
        return { stationsCache: stationsPoints };
      });

      // 轮训地面站在线状态
      interv = setInterval(getStationsStatus, 10000);

      // 初始化地面站点位信息
      series.push({
        type: 'scatter3D',
        name: 'station',
        label: {
          textStyle: {
            fontSize: 12
          },
          distance: 10,
          show: true,
          formatter: data => data.data.name
        },
        coordinateSystem: 'globe',
        symbol: 'path://' + stationSvg,
        symbolSize: 15,
        itemStyle: {
          color: param => {
            const color = param.data.online ? 'green' : '#ED5F55';
            return color;
          },
          opicity: 0.8,
          borderColor: '#ECECEE'
        },
        data: stationsPoints
      });

      // 初始化卫星点位信息
      series.push({
        type: 'scatter3D',
        name: 'satellite',
        coordinateSystem: 'globe',
        symbol: 'path://' + satellSvg,
        symbolSize: 20,
        itemStyle: {
          color: '#D8DBE3',
          opicity: 1,
          borderColor: '#ECECEE'
        },
        label: {
          textStyle: {
            fontSize: 12
          },
          emphasis: {
            show: true
          },
          show: true,
          position: 'top',
          formatter: data => {
            const value = data.data;
            let { name, speed, height } = value;
            speed = speed.toFixed(1);
            height = (height / 1000).toFixed(1);

            const display = `${name} : \nspeed: ${speed}m/s\nheight: ${height}km`;

            return display;
          }
        },
        data: []
      });
      setOption([{ series }]);
    });
  }

  getSatellite() {
    const subScribe = this.subScribe;
    const getMsg = this.getMsg;

    const ws = this.ws;

    ws.connect().then(() => {
      postSatellite().then(data => {
        this.setState({ satellite: data.satellites });

        data.satellites.forEach(item => {
          if (item.id === 2 || item.id === 3) {
            subScribe(item.id);
          }
        });
        ws.getRes(getMsg);
      });
    });
  }

  subScribe(id) {
    const ws = this.ws;
    ws.open(CMD.ADD, id);
  }

  getMsg(msg) {
    const satellite = this.state.satellite;
    let series = [].concat(this.getEchartOpt().series);

    if (msg.data.postions) {
      const posArr = msg.data.postions;
      let points = [];
      posArr.forEach(pos => {
        const xyz = pos.r;
        const v = calcv(...pos.v);
        const name = find(satellite, { id: pos.sateId }).name;
        const blh = xyz2blh(xyz[0], xyz[1], xyz[2]);
        points.push({
          name: name,
          height: blh[2],
          speed: v,
          value: blh
        });
      });

      series.forEach(item => {
        if ('satellite' === item.name) {
          item.data = points;
        }
      });

      this.setOption([
        {
          series,
          globe: { viewControl: { targetCoord: null } }
        }
      ]);
    }
  }

  initOption() {
    return {
      backgroundColor: '#000',
      globe: {
        viewControl: {
          distance: 250,
          maxDistance: 450,
          minDistance: 120,
          autoRotate: false,
          targetCoord: [116.46, 39.92]
        },
        globeRadius: 100,
        globeOuterRadius: 110,
        baseTexture: baseImg,
        displacementScale: 0.1,
        shading: 'lambert',
        environment: starImg,
        light: { ambient: { intensity: 0.5 }, main: { intensity: 1.0 } },
        layers: [{ type: 'blend', blendTo: 'emission', texture: nightImg }]
      }
    };
  }

  render() {
    return (
      <ReactEcharts
        ref={this.echart}
        option={this.initOption()}
        style={{ height: '100%' }}
        showLoading={true}
      />
    );
  }
}

export default App;
