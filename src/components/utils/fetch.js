import axios from 'axios';
import { station, satellite, stationStatus } from './api';

const page = { page: { no: '1', size: '20' } };

export const postStation = data =>
  axios
    .post(station, JSON.stringify(Object.assign({}, page, data)))
    .then(res => res.data);

export const postSatellite = data =>
  axios
    .post(satellite, JSON.stringify(Object.assign({}, page, data)))
    .then(res => res.data);

export const getStationStatus = () =>
  axios.get(stationStatus).then(res => res.data);
