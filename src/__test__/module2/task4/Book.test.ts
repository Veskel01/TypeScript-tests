import Book, { arrayOfImages, IBook } from '../../../tasks/module2/task4/Book';
import validator from 'validator';

describe('Book tests', () => {
  describe('When invalid arguments are provided:', () => {
    it('Should throws an error if invalid title is empty', () => {
      const invalidTitle: string = '';
      const author: string = 'author';
      const desc: string = 'description';
      expect(() => new Book(invalidTitle, author, desc)).toThrowError('Value cannot be empty');
    });
    it(' - Should Throws an error if invalid author is provided', () => {
      const title: string = 'title';
      const invalidAuthor: string = '';
      const desc: string = 'description';
      expect(() => new Book(title, invalidAuthor, desc)).toThrowError('Value cannot be empty');
    });
    it(' - Should Throws an error if invalid descritpion is provided', () => {
      const title: string = 'title';
      const author: string = 'author';
      const invalidDesc: string = '';
      expect(() => new Book(title, author, invalidDesc)).toThrowError('Value cannot be empty');
    });
  });

  describe('When valid arguments are provided:', () => {
    const title: string = 'title';
    const author: string = 'author';
    const description: string = 'description';
    let book: IBook;
    beforeEach(() => {
      book = new Book(title, author, description);
    });
    it(' - UUID should be set as id field', () => {
      const { id } = book;
      expect(validator.isUUID(id)).toBeTruthy();
    });

    it(' - Title should be correctly set', () => {
      expect(book.title).toStrictEqual(title);
    });

    it(' - Author should be correctly set', () => {
      expect(book.author).toStrictEqual(author);
    });

    it(' - Description should be correctly set', () => {
      expect(book.description).toStrictEqual(description);
    });

    it(' - image should be selected from the images array', () => {
      const isImageInArray: boolean = arrayOfImages.some((image) => image === book.image);
      expect(isImageInArray).toBeTruthy();
    });
  });
});
