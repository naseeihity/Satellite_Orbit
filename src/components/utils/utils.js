export const difference = (a, b) => a.concat(b).filter(v => !a.includes(v) || !b.includes(v));

export const secondCovert = s => {
  var seconds = parseInt(s, 10);

  if (isNaN(seconds)) {
    throw new TypeError('Invalid value');
  }

  return {
    days: Math.floor(seconds / 3600),
    hours: Math.floor(seconds / 60 / 60) % 60,
    minutes: Math.floor((seconds / 60) % 60),
    seconds: Math.floor(seconds % 60)
  };
};
