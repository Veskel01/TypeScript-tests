import { generateArrayOfArrays } from '../../../tasks/module1/task5/index';

describe('Generate array of array tests', () => {
  describe('When invalid arguments are provided', () => {
    it('Correctly throws an errors from generateArrayWithRandomNumbers function', () => {
      expect(() => generateArrayOfArrays(3, 0, 5, 10)).toThrowError('Generated array cannot be empty');
      expect(() => generateArrayOfArrays(3, 3, 10, 5)).toThrowError(
        'Max size cannot be smaller than min size'
      );
      expect(() => generateArrayOfArrays(3, 2, 5, NaN)).toThrowError('You cannot enter NaN as a value');
    });

    it('Throws an error if the number of arrays is invalid', () => {
      expect(() => generateArrayOfArrays(0, 5, 10, 15)).toThrowError(
        'Number of arrays to create cannot be less or equal to 0'
      );
      expect(() => generateArrayOfArrays(NaN, 5, 10, 15)).toThrowError('Number of arrays cannot be NaN');
    });

    describe('When arguments are valid', () => {
      const min: number = 1;
      const max: number = 5;
      const numOfArrays: number = 2;
      const numOfNumbers: number = 5;
      const result: number[][] = generateArrayOfArrays(numOfArrays, numOfNumbers, min, max);
      it('Num of arrays should be correct', () => {
        expect(result).toHaveLength(numOfArrays);
      });
      it('NumOfnumbers should be correct', () => {
        result.map((item) => expect(item).toHaveLength(numOfNumbers));
      });
      it('Every number in array should be draw from the given limit', () => {
        result.map((item) => {
          item.map((value) => {
            expect(value).toBeGreaterThanOrEqual(1);
            expect(value).toBeLessThanOrEqual(5);
          });
        });
      });
    });
  });
});
