export function generateArray(size = 20) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 200) + 20);
  }
  return arr;
}
