import User, { IUser } from './User';
import Book, { IBook } from './Book';
import Booking, { IBooking } from './Booking';

const errorHandler = (error: string) => {
  throw new Error(error);
};
interface ILibrary {
  users: IUser[];
  allBooks: IBook[];
  allBorrowsList: any[];
  allBorrowedBooks: any[];
  addNewBook: (title: string, author: string, description: string) => IBook;
  addNewUser: (firstName: string, surname: string, email: string) => IUser;
  borrowBook: (user: IUser, book: IBook) => string;
  returnBook: (book: IBook, user: IUser) => void;
}

class Library implements ILibrary {
  public users: IUser[];
  public allBooks: IBook[];
  public allBorrowsList: IBooking[];
  public allBorrowedBooks: IBook[];
  constructor() {
    this.users = [];
    this.allBooks = [];
    this.allBorrowsList = [];
    this.allBorrowedBooks = [];
  }

  private _findUser(listOfUsers: IUser[], user: IUser): number {
    const findUserResult: number = listOfUsers.findIndex((singleUser: IUser) => {
      return singleUser.id === user.id;
    });
    return findUserResult;
  }

  private _findBook(listOfBooks: IBook[], book: IBook): number {
    const findBookResult: number = listOfBooks.findIndex((singleBook: IBook) => singleBook.id === book.id);
    return findBookResult;
  }

  public addNewBook(title: string, author: string, description: string): IBook {
    const newBook: IBook = new Book(title, author, description);
    this.allBooks.push(newBook);
    return newBook;
  }

  public addNewUser(firstName: string, surname: string, email: string): IUser {
    const newUser = new User(firstName, surname, email);
    this.users.push(newUser);
    return newUser;
  }

  public borrowBook(user: IUser, book: IBook): string {
    const findUserInLibrary = this._findUser(this.users, user);
    const findBookInLibrary = this._findBook(this.allBooks, book);
    if (findUserInLibrary === -1) {
      errorHandler(`User ${user.firstName} not found!`);
    } else if (findBookInLibrary === -1) {
      errorHandler(`Book ${book.title} not found!`);
    }
    const borrowedBook: IBooking = new Booking().borrowBook(
      findBookInLibrary,
      this.allBooks,
      this.allBorrowsList,
      this.allBorrowedBooks,
      book,
      user
    );
    return `Borrow nr:${borrowedBook.id} succesfully created`;
  }

  public returnBook(book: IBook, user: IUser): void {
    const borrowIndex: number = this.allBorrowsList.findIndex((singleBorrow: IBooking) => {
      const { userID } = singleBorrow;
      const { bookID } = singleBorrow;
      return userID === user.id && book.id === bookID;
    });
    if (borrowIndex === -1) {
      errorHandler(`Borrow for ${user.firstName} not found`);
    } else {
      new Booking().returnBook(borrowIndex, this.allBooks, this.allBorrowsList, this.allBorrowedBooks, book);
    }
  }
}

export default Library;
