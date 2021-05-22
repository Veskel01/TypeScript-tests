const arrayToPaginate: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

import paginateArray from '../../../tasks/module1/task10/index';

describe('Paginate array function tests', () => {
  describe('When invalid arguments are provided', () => {
    it('Throws an error if pageIndex or elementsOnPage is NaN', () => {
      expect(() => paginateArray(arrayToPaginate, NaN, 10)).toThrowError();
      expect(() => paginateArray(arrayToPaginate, 1, NaN)).toThrowError();
    });
    it('Throws an error if index to pagination is greater than array length', () => {
      expect(() => paginateArray(arrayToPaginate, 15, 1)).toThrowError(
        'Index to pagination is greater than the indexes of the array'
      );
    });
    it('Throws an error if array is shorter than the elements needed', () => {
      expect(() => paginateArray(arrayToPaginate, 3, 25)).toThrowError(
        'Elements in array are shorter than the elements needed'
      );
    });
    it('Throws an error if array does not contain enoug elements for pagination', () => {
      expect(() => paginateArray(arrayToPaginate, 14, 2)).toThrowError(
        'The array does not contain enough elements for pagination'
      );
    });

    it('Throws an error if array is empty', () => {
      expect(() => paginateArray([], 10, 1)).toThrowError('Array cannot be empty');
    });

    it('Throws an error if index to paginate is lower tham 0', () => {
      expect(() => paginateArray(arrayToPaginate, -2, 10)).toThrowError('Pagination index starts with 0');
    });
    it('Throws an error if elementsOnPage is lower than or equal 0', () => {
      expect(() => paginateArray(arrayToPaginate, 1, 0)).toThrowError(
        'ElementsOnPage must be greater than 0'
      );
    });
  });

  describe('When valid arguments are provided', () => {
    it('Return an array with correct elementsOnPage', () => {
      const elementsOnPage: number = 6;
      expect(paginateArray(arrayToPaginate, 0, elementsOnPage)).toHaveLength(6);
    });

    it('Return an array with values from given index ', () => {
      expect(paginateArray(arrayToPaginate, 0, 5)).toStrictEqual([1, 2, 3, 4, 5]);
      expect(paginateArray(arrayToPaginate, 1, 5)).toStrictEqual([6, 7, 8, 9, 10]);
      expect(paginateArray(arrayToPaginate, 2, 5)).toStrictEqual([11, 12, 13, 14, 15]);
      expect(paginateArray(arrayToPaginate, 2, 5)).toHaveLength(5);
    });
  });
});