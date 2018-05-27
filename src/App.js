import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import $ from 'jquery';
import 'echarts-gl';
import { postStation, postSatellite } from './utils/fetch';

import baseImg from './asset/earth.jpg';
import heightImg from './asset/bathymetry_bw_composite_4k.jpg';
import starImg from './asset/starfield.jpg';
import nightImg from './asset/night.jpg';
import cloudImg from './asset/clouds.png';
import {stationSvg} from './utils/svg.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.echart = React.createRef();

    this.satellite = [];

    this.getOption = this.getOption.bind(this);
  }

  componentDidMount() {
    console.log(this.echart);
    const echarts_instance = this.echart.current.getEchartsInstance();

    let stations = [];
    let stationsPoints = [];
    let series = [];
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
          show: true,
          formatter: (data) => data.data.name
        },
        type: 'scatter3D',
        coordinateSystem: 'globe',
        blendMode: 'lighter',
        symbol: 'path://' + stationSvg,
        symbolSize: 20,
        itemStyle: {
          color: '#5D919D',
          opicity: 0.8,
          borderColor: '#ECECEE'
        },
        data: stationsPoints
      });

      echarts_instance.setOption({
        series: series
      });

      echarts_instance.hideLoading();
    });

    postSatellite().then(data => {
      this.satellite = data.satellites;
    });
  }

  getOption() {
    return {
      backgroundColor: '#000',
      globe: {
        baseTexture: baseImg,
        heightTexture: heightImg,
        displacementScale: 0.1,
        shading: 'lambert',
        environment: starImg,
        light: { ambient: { intensity: 0.1 }, main: { intensity: 1.5 } },
        layers: [
          { type: 'blend', blendTo: 'emission', texture: nightImg },
          {
            type: 'overlay',
            texture: cloudImg,
            shading: 'lambert',
            distance: 5
          }
        ]
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
