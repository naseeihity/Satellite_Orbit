import isNumber from 'lodash.isnumber';
import dayjs from 'dayjs';
import clonedeep from 'lodash.clonedeep';

const a = 6378137;
const b = 6356752.3142;
const e2 = (a * a - b * b) / (a * a);
const ee2 = (a * a - b * b) / (b * b);

const toDegrees = angle => angle * (180 / Math.PI);

export const xyz2blh = (x, y, z) => {
  if (!isNumber(x) || !isNumber(y) || !isNumber(z)) {
    console.log('x||y||z is not a number!');
    return;
  }

  let latitude = 0;
  let longitude = 0;
  let height = 0;

  const seta = Math.atan((a * z) / (b * Math.sqrt(x * x + y * y)));

  // get B纬度
  latitude = Math.atan(
    (z + ee2 * b * Math.pow(Math.sin(seta), 3)) / (Math.sqrt(x * x + y * y) - e2 * a * Math.pow(Math.cos(seta), 3))
  );

  // get L经度
  if (x > 0) {
    longitude = Math.atan(y / x);
  } else if (x === 0 && y > 0) {
    longitude = Math.PI / 2;
  } else if (x === 0 && y < 0) {
    longitude = (3 * Math.PI) / 2;
  } else if (x < 0) {
    if (y >= 0) {
      longitude = Math.atan(y / x) + Math.PI;
    } else if (y < 0) {
      longitude = -Math.PI + Math.atan(y / x);
    }
  }

  // get H
  const N = a / Math.sqrt(1 - e2 * Math.pow(Math.sin(latitude), 2));
  height =
    Math.sqrt(x * x + y * y) * Math.cos(latitude) +
    z * Math.sin(latitude) -
    N * (1 - e2 * Math.pow(Math.sin(latitude), 2));

  return [toDegrees(longitude), toDegrees(latitude), height];
};

export const calcv = (x, y, z) => Math.sqrt(x * x + y * y + z * z);

export default xyz2blh;

// ===========
// 卫星信息转换
// ===========

const MODE = ['基本模式', '低电压模式'];
const getTime = time => {
  return dayjs(time).isValid() ? dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss') : '未知';
};

// 温度转化
const getTemperature = (t, type) => {
  // 星务 cpu
  if ('CPU' === type) {
    return `${t / 100} \u2103`;
  } else if ('STAR' === type) {
    return `${t * 0.0625} \u2103`;
  } else if ('CPU2' === type) {
    return `${t} \u2103`;
  } else if ('COMM' === type) {
    return `${(t * -0.07669 + 195.6037).toFixed(1)}  \u2103`;
  }
};

const getMode = mode => {
  return MODE[mode];
};

const getSwitchSatus = s => {
  let switchArr = s.toString(2).split('');
  return switchArr.map(item => {
    return { status: item, cls: item === '1' ? 'on' : 'off' };
  });
};

const calMagmeter = mArr => {
  return mArr.map(m => Math.floor(m / 10) + ' nT');
};

const calGyro = gArr => {
  return gArr.map(g => g / 100 + ' °/s');
};

const calDter = dObj => {
  var newObj = {};
  for (let key of Object.keys(dObj)) {
    if ('pitchAngSpd' === key) {
      newObj[key] = dObj[key] / 100 + ' deg/s';
    } else {
      newObj[key] = dObj[key] / 100 + ' deg';
    }
  }
  return newObj;
};

const calElectric = c => {
  return (c * 0.16643964).toFixed(1) + ' mA';
};

const calVolt = v => {
  return (v * 4.88).toFixed(1) + ' mV';
};

const calPower = p => {
  return (20 * Math.log10(p * 0.00767)).toFixed(1) + ' dBM';
};

const calStrength = s => {
  return (s * 0.03 - 152).toFixed(1) + ' dBM';
};

export const transObc = o => {
  const obc = clonedeep(o);
  let obcInfo = obc;
  // 时间转换
  obcInfo.time = getTime(obc.time);
  // 温度转换
  obcInfo.chipTemp = getTemperature(obc.chipTemp, 'CPU');
  // 工作模式
  obcInfo.mode = getMode(obc.mode);
  // 星务温度
  obcInfo.obcTemp = getTemperature(obc.obcTemp, 'STAR');
  // 开关状态
  obcInfo.switches = getSwitchSatus(obc.switches);

  return obcInfo;
};

export const transAdcs = a => {
  const adcs = clonedeep(a);

  let adcsInfo = adcs;
  // 温度转换
  adcsInfo.chipTemp = getTemperature(adcs.chipTemp, 'CPU2');
  // 转速
  adcsInfo.attiMeas.wheelSpd = adcs.attiMeas.wheelSpd + ' Rad/Min';
  // 开关状态
  adcsInfo.attiMeas.subSwitch = getSwitchSatus(adcs.attiMeas.subSwitch);
  // 磁强计转换
  adcsInfo.attiMeas.magmeter = calMagmeter(adcs.attiMeas.magmeter);
  // 陀螺仪转化
  adcsInfo.attiMeas.gyro = calGyro(adcs.attiMeas.gyro);
  // 定姿角
  adcsInfo.attiDter = calDter(adcs.attiDter);

  return adcsInfo;
};

export const transComm = c => {
  const comm = clonedeep(c);

  let commInfo = comm;

  // 电流转换
  commInfo.recv.cur = calElectric(comm.recv.cur);
  // 电压
  commInfo.recv.motherVol = calVolt(comm.recv.motherVol);
  // 温度
  commInfo.recv.cryTemp = getTemperature(comm.recv.cryTemp, 'COMM');
  commInfo.recv.ampTemp = getTemperature(comm.recv.ampTemp, 'COMM');
  commInfo.recv.signal = calStrength(comm.recv.signal);

  //功率
  commInfo.send.reflectPower = calPower(comm.send.reflectPower);
  commInfo.send.forwardPower = calPower(comm.send.forwardPower);

  //温度
  commInfo.send.cryTemp = getTemperature(comm.send.cryTemp, 'COMM');
  commInfo.send.ampTemp = getTemperature(comm.send.ampTemp, 'COMM');

  return commInfo;
};
