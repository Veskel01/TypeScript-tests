import { randomChunkSize } from './example';

const errorHandler = (error: string): void => {
  throw new Error(error);
};

function aggregateIntoChunks<T>(array: T[]): T[][] {
  if (array.length < 4) {
    errorHandler('Array is too short');
  }
  const chunks: T[][] = [];
  const copied: T[] = [...array];
  copied.reduce((acc: T, current: T, index: number) => {
    const size: number = randomChunkSize(4, 7);
    index % size === 0 ? chunks.push(copied.splice(0, size)) : chunks.push(copied.splice(0, size));
    return acc;
  });
  return chunks;
}

export default aggregateIntoChunks;
