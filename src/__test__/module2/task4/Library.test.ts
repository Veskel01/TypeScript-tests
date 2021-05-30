import User from '../../../tasks/module2/task4/User';
import Book from '../../../tasks/module2/task4/Book';
import Library, { ILibrary } from '../../../tasks/module2/task4/Library';

describe('Library class tests', () => {
  let library: ILibrary;
  beforeEach(() => {
    library = new Library();
  });
  describe('When invalid arguments are provided', () => {
    it(' - Should throws an error if a user who doesnt exist tries to borrow a book', () => {
      const firstName: string = 'Dee';
      const surname: string = 'Funk';
      const email: string = 'Elijah_Schmidt@hotmail.com';
      const title: string = 'title';
      const author: string = 'author';
      const desc: string = 'desc';

      const user = new User(firstName, surname, email);
      const book = library.addNewBook(title, author, desc);

      expect(() => library.borrowBook(user, book)).toThrowError(`User ${user.firstName} not found!`);
    });

    it(' - Should throws an error if book does not exists when user tries to borrow it', () => {
      const firstName: string = 'Dee';
      const surname: string = 'Funk';
      const email: string = 'Elijah_Schmidt@hotmail.com';
      const title: string = 'title';
      const author: string = 'author';
      const desc: string = 'desc';

      const user = library.addNewUser(firstName, surname, email);
      const book = new Book(title, author, desc);

      expect(() => library.borrowBook(user, book)).toThrowError(`Book ${book.title} not found!`);
    });

    it(' - Should throws an error if borrow for user does not exist', () => {
      const firstName: string = 'Dee';
      const surname: string = 'Funk';
      const email: string = 'Elijah_Schmidt@hotmail.com';
      const title: string = 'title';
      const author: string = 'author';
      const desc: string = 'desc';

      const user = library.addNewUser(firstName, surname, email);
      const book = library.addNewBook(title, author, desc);

      expect(() => library.returnBook(book, user)).toThrowError(`Borrow for ${user.firstName} not found`);
    });

    it(' - Should throws an error if a penalty is setted', () => {
      const firstName: string = 'Dee';
      const surname: string = 'Funk';
      const email: string = 'Elijah_Schmidt@hotmail.com';
      const title: string = 'title';
      const author: string = 'author';
      const desc: string = 'desc';

      const user = library.addNewUser(firstName, surname, email);
      const book = library.addNewBook(title, author, desc);
      const borrow = library.borrowBook(user, book);

      borrow.returnDate = new Date(2021, 4, 20);

      expect(() => library.returnBook(book, user)).toThrowError(
        `You cannot return the book because a penalty was setted`
      );
    });
  });

  describe('When valid arguments are provided', () => {
    let library: ILibrary;
    beforeEach(() => {
      library = new Library();
    });

    it(' - Library should add a new Book', () => {
      const title: string = 'title';
      const author: string = 'author';
      const desc: string = 'desc';

      const book = library.addNewBook(title, author, desc);

      expect(library.allBooks).toContain(book);
    });

    it(' - Library should add a new user', () => {
      const name: string = 'Cleora';
      const surname: string = 'Kunze';
      const email: string = 'Rafaela12@hotmail.com';

      const user = library.addNewUser(name, surname, email);

      expect(library.users).toContain(user);
    });

    it(' - Library should remove borrowed book from allBooks list', () => {
      const name: string = 'Cleora';
      const surname: string = 'Kunze';
      const email: string = 'Rafaela12@hotmail.com';
      const title: string = 'title';
      const author: string = 'author';
      const desc: string = 'desc';

      const user = library.addNewUser(name, surname, email);
      const book = library.addNewBook(title, author, desc);
      library.borrowBook(user, book);

      expect(library.allBooks).not.toContain(book);
    });

    it(' - Library should add borrowed book to allBorrowedBooks list', () => {
      const name: string = 'Cleora';
      const surname: string = 'Kunze';
      const email: string = 'Rafaela12@hotmail.com';
      const title: string = 'title';
      const author: string = 'author';
      const desc: string = 'desc';

      const user = library.addNewUser(name, surname, email);
      const book = library.addNewBook(title, author, desc);
      library.borrowBook(user, book);

      expect(library.allBorrowedBooks).toContain(book);
    });

    it(' - Library should create a new Borrow', () => {
      const name: string = 'Cleora';
      const surname: string = 'Kunze';
      const email: string = 'Rafaela12@hotmail.com';
      const title: string = 'title';
      const author: string = 'author';
      const desc: string = 'desc';

      const user = library.addNewUser(name, surname, email);
      const book = library.addNewBook(title, author, desc);
      library.borrowBook(user, book);

      expect(library.allBorrowsList).toHaveLength(1);
    });

    it(' - Library should correctly create a borrow for given user and book', () => {
      const name: string = 'Cleora';
      const surname: string = 'Kunze';
      const email: string = 'Rafaela12@hotmail.com';
      const title: string = 'title';
      const author: string = 'author';
      const desc: string = 'desc';

      const user = library.addNewUser(name, surname, email);
      const book = library.addNewBook(title, author, desc);
      const borrowObject = library.borrowBook(user, book);

      expect(borrowObject.bookID).toStrictEqual(book.id);
      expect(borrowObject.userID).toStrictEqual(user.id);
    });
  });
});
