export const getRandomColor = () => {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += Math.round(Math.random() * 16).toString(16);
  }
  return color;
}