import { reduceFn } from '../../../tasks/module1/task2/index';

describe('Reduce function tests', () => {
  describe('When invalid arguments provided', () => {
    it('Should thorw error if array is empty', () => {
      expect(() => reduceFn([], (acc, val) => acc)).toThrowError('Array is empty');
    });
  });

  describe('When valid arguments provided', () => {
    it('Should reduce array to single value', () => {
      const result = reduceFn([1, 2, 3], (acc, val) => (acc += val));
      expect(result).toStrictEqual(6);
    });
    it('Function should work properly when initialValue is provided', () => {
      const result = reduceFn(
        [1, 2, 3, 4, 5, 6],
        (acc, val) => {
          return (acc += val);
        },
        10
      );
      expect(result).toStrictEqual(31);
    });

    it('Function should correctly push values to arrays', () => {
      const result = reduceFn(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        (acc, val) => {
          if (val % 2 === 0) {
            acc.evens.push(val);
          } else {
            acc.odds.push(val);
          }
          return acc;
        },
        {
          evens: [] as number[],
          odds: [] as number[],
        }
      );
      result.evens.map((value) => {
        expect(value % 2 === 0).toBeTruthy();
      });
      result.odds.map((value) => {
        expect(value % 2 !== 0).toBeTruthy();
      });
    });
  });
});
