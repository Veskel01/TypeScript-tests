import data from '../../../tasks/module1/task4/example';
import findPhraseInArray from '../../../tasks/module1/task4/index';

describe('Find phrase in Array tests', () => {
  describe('When invalid arguments are provided', () => {
    it('When array is empty should throw error', () => {
      expect(() => findPhraseInArray([], 'ja')).toThrowError('Array is too short');
    });
    it('When word to search arg is empty should throw error', () => {
      expect(() => findPhraseInArray(data, '')).toThrowError('Word to search is too short');
    });

    it('Throws error if no word was found in the array', () => {
      const word: string = '123';
      expect(() => findPhraseInArray(data, word)).toThrowError(`${word} does not occur in array`);
    });
  });

  describe('When valid arguments are provided', () => {
    it('Every item in array should have the given word', () => {
      const word: string = 'a';
      const result = findPhraseInArray(data, word);
      expect(result.map((tuple) => tuple[1].includes(word))).toBeTruthy();
    });
  });
});
