import { reduceRightFn } from '../../../tasks/module1/task2/index';

describe('Reduce right fn tests', () => {
  describe('When invalid argument is provided', () => {
    it('Should throw error if array is empty', () => {
      expect(() => reduceRightFn([], (acc) => acc)).toThrowError('Array is empty');
    });
  });

  describe('When valid arguments are provided', () => {
    it('Function correctly reverse an array', () => {
      const result = reduceRightFn([1, 2, 3], (acc, prev, index, arr) => arr);
      expect(result).toStrictEqual([3, 2, 1]);
    });

    it('Function correctly split values and returns reveresed array', () => {
      const result = reduceRightFn(
        [1, 2, 3, 4, 5, 6, 7, 8],
        (acc, val) => {
          if (val % 2 === 0) {
            acc.push(val);
          }
          return acc;
        },
        [] as number[]
      );
      expect(result).toStrictEqual([8, 6, 4, 2]);
    });
  });
});
