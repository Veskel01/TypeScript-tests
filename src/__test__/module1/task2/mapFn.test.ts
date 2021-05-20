import { mapFn } from '../../../tasks/module1/task2/index';

describe('Own mapFn implementation tests', () => {
  describe('When an invalid argument is given', () => {
    it('Throws Error if array is too short', () => {
      expect(() => mapFn([], (value) => value)).toThrowError('Array length is too short');
    });
  });

  describe('When valid arguments provided', () => {
    it('Should multiply every item in array', () => {
      const result = mapFn([1, 2, 3, 4, 5], (value) => value * 2);

      expect(result).toStrictEqual([2, 4, 6, 8, 10]);
    });

    it('Should map every item in array', () => {
      expect(mapFn([1, 2, 3], (value) => value)).toStrictEqual([1, 2, 3]);
    });
  });
});
