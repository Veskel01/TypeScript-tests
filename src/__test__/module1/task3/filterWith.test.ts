import data from '../../../tasks/module1/task3/Data';
import filterWith from '../../../tasks/module1/task3/index';

describe('Function FilterWith tests', () => {
  describe('When invalid arguments are provided', () => {
    it('Throws error if array is empty', () => {
      expect(() => filterWith([], 'Jakub')).toThrowError('Array cannot be empty');
    });
    it('If typeof filter is not a number or string function should return empty array', () => {
      expect(filterWith(data, { hellp: 'World' })).toStrictEqual([]);
    });
    it('If filter length is less than 2 function should return an empty array', () => {
      expect(filterWith(data, '1')).toStrictEqual([]);
    });
  });

  describe('When valid arguments are provided', () => {
    it('Funtion should return an array with 1 object inside', () => {
      expect(filterWith(data, '5e985a07feddae7617ac44f6')).toHaveLength(1);
    });

    it('Function should return object with correct data', () => {
      const result = filterWith(data, '5e985a07feddae7617ac44f6')[0];

      const { _id, name } = result;

      expect(_id).toStrictEqual('5e985a07feddae7617ac44f6');
      expect(name).toStrictEqual('Cummings Baxter');
    });

    it('function should find correct object when tag is provided as filter ', () => {
      const tag: string = 'labore';
      const result = filterWith(data, tag)[0];
      expect(result.tags).toContain(tag);
    });

    it('Function should filter the deepest array in object', () => {
      const friendName: string = 'Horton Haley';

      const result = filterWith(data, friendName)[0];

      const { friends } = result;

      Object.values(friends).map((value) => {
        expect(value.name === friendName);
      });
    });
  });
});
