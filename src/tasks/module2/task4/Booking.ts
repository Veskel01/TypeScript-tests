import { addDays, differenceInBusinessDays, lightFormat } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { IBook } from './Book';
import { IUser } from './User';

// error Handler

const errorHandler = (error: string): void => {
  throw new Error(error);
};

// date methods

const getActualDateWithFormat = (): string => {
  return lightFormat(new Date(), 'MM/dd/yyyy');
};

const getReturnDateWithFormat = (): string => {
  const penaltyDate: Date = addDays(new Date(), 7);
  return lightFormat(penaltyDate, 'MM/dd/yyyy');
};

const getReturnDateWithoutFormat: Date = addDays(new Date(getReturnDateWithFormat()), 7);
export interface IBooking {
  id: string;
  userID: string;
  borrowDate: string;
  returnDate: string;
  bookID: string;
  bookTitle: string;
  penalty: number;
  borrowBook: (
    bookIndex: number,
    allBooks: IBook[],
    allBorrowList: IBooking[],
    allBorrowedBooks: IBook[],
    book: IBook,
    user: IUser
  ) => IBooking;
  returnBook: (
    borrowIndex: number,
    allBooks: IBook[],
    allBorrowsList: IBooking[],
    allBorrowedBooks: IBook[],
    book: IBook
  ) => void;
}

class Booking implements IBooking {
  public id: string;
  public userID: string;
  public borrowDate: string;
  public returnDate: string;
  public bookID: string;
  public bookTitle: string;
  public penalty: number;
  constructor() {
    this.id = uuidv4();
    this.userID = '';
    this.borrowDate = getActualDateWithFormat();
    this.returnDate = getReturnDateWithFormat();
    this.bookID = '';
    this.bookTitle = '';
    this.penalty = 0;
  }
  public borrowBook(
    bookIndex: number,
    allBooks: IBook[],
    allBorrowList: IBooking[],
    allBorrowedBooks: IBook[],
    book: IBook,
    user: IUser
  ): IBooking {
    this.bookID = book.id;
    this.bookTitle = book.title;
    this.userID = user.id;
    allBooks.splice(bookIndex, 1);
    allBorrowList.push(this);
    allBorrowedBooks.push(book);
    if (new Date() > getReturnDateWithoutFormat) {
      const difference: number = differenceInBusinessDays(new Date(), getReturnDateWithoutFormat);
      this.penalty = difference * 5;
    }
    return this;
  }

  public returnBook(
    borrowIndex: number,
    allBooks: IBook[],
    allBorrowsList: IBooking[],
    allBorrowedBooks: IBook[],
    book: IBook
  ): void {
    const { penalty } = allBorrowsList[borrowIndex];
    if (penalty === 0) {
      const bookIdInBorrowedBooks: number = allBorrowedBooks.findIndex(
        (borrowedBook: IBook) => borrowedBook.id === book.id
      );
      allBooks.push(book);
      allBorrowedBooks.splice(bookIdInBorrowedBooks, 1);
      allBorrowsList.splice(borrowIndex, 1);
      return console.log(`Book with title: ${book.title} returned succesfully !`);
    } else {
      errorHandler(`The penalty for keeping the book too long is ${penalty} zł. You can't return the book`);
    }
  }
}

export default Booking;
