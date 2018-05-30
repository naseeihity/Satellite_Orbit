export const difference = (a, b) =>
  a.concat(b).filter(v => !a.includes(v) || !b.includes(v));
