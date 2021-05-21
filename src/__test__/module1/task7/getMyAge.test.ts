import getMyAge from '../../../tasks/module1/task7';

describe('GetMyAge function tests', () => {
  describe('When invalid argument is provided', () => {
    it('Throws an Error if date is future', () => {
      expect(() => getMyAge(2022)).toThrowError();
      expect(() => getMyAge('2022')).toThrowError();
      expect(() => getMyAge(new Date(2022, 1, 1))).toThrowError();
    });
    it('Throws an Error if date is from long past', () => {
      expect(() => getMyAge(1879)).toThrowError();
      expect(() => getMyAge('1879')).toThrowError();
      expect(() => getMyAge(new Date(1879, 1, 12))).toThrowError();
    });
    it('Throws an Error if date is actual year', () => {
      expect(() => getMyAge(2021)).toThrowError();
      expect(() => getMyAge('2021')).toThrowError();
      expect(() => getMyAge(new Date(2021, 5, 12))).toThrowError();
    });
    it('Throws an error if input is NaN', () => {
      expect(() => getMyAge(NaN)).toThrowError();
      expect(() => getMyAge('NaN')).toThrowError();
      expect(() => getMyAge(new Date(NaN))).toThrowError();
    });
    it('Throws an error if invalid date is provided', () => {
      expect(() => getMyAge(new Date('foo'))).toThrowError();
    });
  });
  describe('When valid arguments are provided', () => {
    it('Should return correct year of birth', () => {
      expect(getMyAge(2000)).toBe(21);
      expect(getMyAge('2000')).toBe(21);
      console.log(getMyAge(new Date(2000, 6, 9)));
      expect(getMyAge(new Date(2000, 9, 6))).toBe(21);
    });
  });
});
