//function to getRandom suze of array;

function randomSize(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}
export default randomSize;
