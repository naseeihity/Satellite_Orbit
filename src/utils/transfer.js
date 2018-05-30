import isNumber from 'lodash.isnumber';
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

  const seta = Math.atan(a * z / (b * Math.sqrt(x * x + y * y)));

  // get B纬度
  latitude = Math.atan(
    (z + ee2 * b * Math.pow(Math.sin(seta), 3)) /
      (Math.sqrt(x * x + y * y) - e2 * a * Math.pow(Math.cos(seta), 3))
  );

  // get L经度
  if (x > 0) {
    longitude = Math.atan(y / x);
  } else if (x === 0 && y > 0) {
    longitude = Math.PI / 2;
  } else if (x === 0 && y < 0) {
    longitude = 3 * Math.PI / 2;
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
