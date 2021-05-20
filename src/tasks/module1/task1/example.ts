export const alphabet: string[] = "abcdefghijklmnoprstuwxyz".split("");

//function to get random size of chunks
export function randomChunkSize(minSize: number, maxSize: number) {
  return Math.round(Math.random() * (maxSize - minSize) + minSize);
}
