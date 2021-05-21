import randomSize from './example';

type Result = number[];
export function generateArrayWithRandomNumbers(howManyNumbers: number, min: number, max: number): Result {
  if (howManyNumbers <= 0) {
    throw new Error('Generated array cannot be empty');
  }
  if (max < min) {
    throw new Error('Max size cannot be smaller than min size');
  }
  if (Number.isNaN(howManyNumbers) || Number.isNaN(min) || Number.isNaN(max)) {
    throw new Error('You cannot enter NaN as a value');
  }
  const arrayWithRandomNumbers: Result = Array.from({ length: howManyNumbers }, () => randomSize(min, max));
  return arrayWithRandomNumbers;
}

type ResultArrayOfArrays = number[][];
export function generateArrayOfArrays(
  howManyArrays: number,
  howManyNumber: number,
  min: number,
  max: number
): ResultArrayOfArrays {
  if (howManyArrays <= 0) {
    throw new Error('Number of arrays to create cannot be less or equal to 0');
  }
  if (Number.isNaN(howManyArrays)) {
    throw new Error('Number of arrays cannot be NaN');
  }

  const result: ResultArrayOfArrays = [];
  for (let i: number = 0; i < howManyArrays; i++) {
    result.push(generateArrayWithRandomNumbers(howManyNumber, min, max));
  }
  return result;
}
