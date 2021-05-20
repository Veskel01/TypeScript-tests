import { someFn } from '../../../tasks/module1/task2/index';

describe('SomeFn tests', () => {
  describe('When invalid argument provided', () => {
    it('Throws an error if array is empty', () => {
      expect(() => someFn([], (val) => val)).toThrowError('Array is empty');
    });
  });

  describe('When valid arguments provided', () => {
    it('Should return true if value is in array', () => {
      const result: boolean = someFn(['Jakub', 'Mateusz', 'Grzegorz'], (val) => val === 'Jakub');

      expect(result).toBeTruthy();
    });

    it('Should return false if value not meet the condition', () => {
      const result: boolean = someFn([1, 2, 3], (acc) => acc > 3);

      expect(result).toBeFalsy();
    });
  });
});
