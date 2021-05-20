import randomSize from "./example";

type Result = number[];
export function generateArrayWithRandomNumber(howManyNumber: number, min: number, max: number): Result {
  if (howManyNumber <= 0) {
    throw new Error("Array length is too short");
  }
  if (max < min) {
    throw new Error("Max size cannot be smaller than min size");
  }
  if (Number.isNaN(howManyNumber) || Number.isNaN(min) || Number.isNaN(max)) {
    throw new Error("You cannot enter NaN as a value");
  }
  const arrayWithRandomNumbers: Result = Array.from({ length: howManyNumber }, () => randomSize(min, max));
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
    throw new Error("Number of arrays to create cannot be less or equal to 0");
  }
  if (Number.isNaN(howManyArrays)) {
    throw new Error("Number of arrays cannot be NaN");
  }

  const result: ResultArrayOfArrays = [];
  for (let i: number = 0; i < howManyArrays; i++) {
    result.push(generateArrayWithRandomNumber(howManyNumber, min, max));
  }
  return result;
}
