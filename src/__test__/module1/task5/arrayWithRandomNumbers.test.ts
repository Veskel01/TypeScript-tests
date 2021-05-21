import { generateArrayWithRandomNumbers } from '../../../tasks/module1/task5/index';

describe('Generate array with random numbers tests', () => {
  describe('When invalid arguments are provided', () => {
    it('Throws an error if generated array could be empty', () => {
      expect(() => generateArrayWithRandomNumbers(0, 1, 1)).toThrowError('Generated array cannot be empty');
    });
    it('Throws an error if the largest number would be less than the smallest', () => {
      expect(() => generateArrayWithRandomNumbers(5, 10, 5)).toThrowError(
        'Max size cannot be smaller than min size'
      );
    });
    it('Throws an error if array size,min or max number will be NaN', () => {
      expect(() => generateArrayWithRandomNumbers(NaN, 1, 2)).toThrowError();
      expect(() => generateArrayWithRandomNumbers(1, NaN, 2)).toThrowError();
      expect(() => generateArrayWithRandomNumbers(1, 2, NaN)).toThrowError('You cannot enter NaN as a value');
    });
  });

  describe('When valid arguments are provided', () => {
    it('returns array with the correct length', () => {
      const numOfArrays: number = 3;
      expect(generateArrayWithRandomNumbers(numOfArrays, 5, 10)).toHaveLength(numOfArrays);
    });
    it('Returns array with numbers between min and max', () => {
      const result = generateArrayWithRandomNumbers(5, 1, 1);
      result.map((value) => expect(value).toStrictEqual(1));
    });
  });
});
