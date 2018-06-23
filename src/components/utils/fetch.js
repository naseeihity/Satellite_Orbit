import axios from 'axios';
import { station, satellite, stationStatus, statistic, smart, curInfo } from './api';

const page = { page: { no: '1', size: '20' } };

export const postStation = data =>
  axios.post(station, JSON.stringify(Object.assign({}, page, data))).then(res => res.data);

export const postSatellite = data =>
  axios.post(satellite, JSON.stringify(Object.assign({}, page, data))).then(res => res.data);

export const getStationStatus = () => axios.get(stationStatus).then(res => res.data);

export const getStatistic = () => axios.get(statistic).then(res => res.data);

export const postSmart = data => axios.post(smart, JSON.stringify(data)).then(res => res.data);

export const postCurInfo = data => axios.post(curInfo, JSON.stringify(data)).then(res => res.data);
