import isRectangularTriangle from '../../../tasks/module1/task8/index';

describe('isRectangularTriangle tests', () => {
  describe('When invalid arguments are provided', () => {
    it('Throws an error if NaN is provided', () => {
      expect(() => isRectangularTriangle(NaN, 4, 5)).toThrowError();
      expect(() => isRectangularTriangle(3, NaN, 5)).toThrowError();
      expect(() => isRectangularTriangle(3, 4, NaN)).toThrowError();
    });

    it('Throws an Error if one of trinagle sides may be less than or equal 0 ', () => {
      expect(() => isRectangularTriangle(-1, 4, 5)).toThrowError();
      expect(() => isRectangularTriangle(3, 0, 5)).toThrowError();
      expect(() => isRectangularTriangle(3, 4, -10)).toThrowError();
    });
    it('Throws an Error if smaller sides are shorter than the the longest', () => {
      expect(() => isRectangularTriangle(3, 4, 12)).toThrowError();
    });
  });

  describe('When valid arguments are provided', () => {
    it('Triangle can be build with these sides', () => {
      expect(isRectangularTriangle(3, 4, 5)).toStrictEqual('Triangle can be build with these sides');
    });
    it('Triangle cannot be build with theses sides', () => {
      expect(isRectangularTriangle(3, 4, 4)).toStrictEqual(`Triangle cannot be build`);
    });
  });
});
