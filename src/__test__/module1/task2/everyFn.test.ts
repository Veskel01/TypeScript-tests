import { everyFn } from '../../../tasks/module1/task2/index';

describe('EveryFn tests', () => {
  describe('When invalid argument are provided', () => {
    it('Throws error if array is empty', () => {
      expect(() => everyFn([], (val) => val > 0)).toThrowError('Array is empty');
    });
  });

  describe('When valid arguments are provided', () => {
    it('Should return true, because every value fulfills the condition', () => {
      const result: boolean = everyFn([2, 4, 6, 8, 10], (val) => val % 2 === 0);

      expect(result).toBeTruthy();
    });

    it('Should return false, because one value reject the condition', () => {
      const result: boolean = everyFn([1, 2, 3, 4], (val) => val > 1);
      expect(result).toBeFalsy();
    });
  });
});
