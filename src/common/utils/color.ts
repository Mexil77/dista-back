export const generateRandomColor = (): string => {
  let R = Math.floor(Math.random() * 255);
  let G = Math.floor(Math.random() * 255);
  let B = Math.floor(Math.random() * 255);
  return `rgba(${R},${G},${B},1)`;
};
