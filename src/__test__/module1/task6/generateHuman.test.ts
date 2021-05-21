import generateHuman from '../../../tasks/module1/task6';
import firstNamesArray from '../../../tasks/module1/task6/firstNames';
import secondNamesArray from '../../../tasks/module1/task6/secondNames';

describe('Generate Human function tests', () => {
  describe('Check if function returns good properties', () => {
    const result = generateHuman();

    it('Function correctly get random name from array of names', () => {
      expect(firstNamesArray.includes(result.name));
    });
    it('Function correctly get secondName from array of secondNames', () => {
      expect(secondNamesArray.includes(result.surname));
    });
    it('Function return one of the countries list', () => {
      expect(['USA', 'UK', 'PL']).toContain(result.country);
    });

    it('Function return age between 18 & 85', () => {
      expect(result.age).toBeGreaterThanOrEqual(18);
      expect(result.age).toBeLessThanOrEqual(85);
    });
    it('Function returns an email build on firstName & secondName', () => {
      expect(result.email).toStrictEqual(`${result.name}.${result.surname}@email.com`);
    });
    it('Function resturns a nine-digit phone number', () => {
      expect(result.phoneNumber.toString().split('')).toHaveLength(9);
    });

    it('Every number in phone is in range from 1 to 9', () => {
      const arrayOfNumbersInPhone = result.phoneNumber.toString().split('');
      arrayOfNumbersInPhone.map((value) => {
        expect(Number(value)).toBeGreaterThanOrEqual(1);
        expect(Number(value)).toBeLessThanOrEqual(9);
      });
    });
  });
});
