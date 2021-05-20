import { everyFn } from '../../../tasks/module1/task2/index';

describe('EveryFn tests', () => {
  describe('When invalid argument are provided', () => {
    it('Throws error if array is empty', () => {
      expect(() => everyFn([], (val) => val > 0)).toThrowError('Array is empty');
    });
  });
});
