import { filterFn } from '../../../tasks/module1/task2/index';

describe('Custom filter function tests', () => {
  describe('When invalid arguments provided', () => {
    it('Should throw Error if array is empty', () => {
      expect(() => filterFn([], (value) => value)).toThrowError('Array is too short');
    });
  });

  describe('When valid arguments are provided', () => {
    it('Correctly filter array', () => {
      const result = filterFn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (value) => value % 2 === 0);

      expect(result).toStrictEqual([2, 4, 6, 8, 10]);
    });

    it('Correctly filter array by value index', () => {
      const result = filterFn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (value, index) => value % index === 0);
      expect(result).toStrictEqual([2]);
    });
  });
});
