import { addDays, lightFormat, differenceInCalendarDays, isPast } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { IBook } from './Book';
import { IUser } from './User';

// error Handler

const errorHandler = (error: string): void => {
  throw new Error(error);
};

// date methods

const getActualDateWithFormat = (): Date => {
  return new Date();
};

const getReturnDateWithFormat = (): Date => {
  const penaltyDate: Date = addDays(new Date(), 7);
  return penaltyDate;
};

export interface IBooking {
  id: string;
  userID: string;
  borrowDate: Date;
  returnDate: Date;
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
  ) => boolean;
}

class Booking implements IBooking {
  public id: string;
  public userID: string;
  public borrowDate: Date;
  public returnDate: Date;
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
    return this;
  }

  public returnBook(
    borrowIndex: number,
    allBooks: IBook[],
    allBorrowsList: IBooking[],
    allBorrowedBooks: IBook[],
    book: IBook
  ): boolean {
    const { returnDate } = allBorrowsList[borrowIndex];
    if (isPast(returnDate)) {
      const difference: number = differenceInCalendarDays(new Date(), returnDate);
      allBorrowsList[borrowIndex].penalty = difference * 5;
    }
    const { penalty } = allBorrowsList[borrowIndex];
    if (penalty === 0) {
      const bookIdInBorrowedBooks: number = allBorrowedBooks.findIndex(
        (borrowedBook: IBook) => borrowedBook.id === book.id
      );
      allBooks.push(book);
      allBorrowedBooks.splice(bookIdInBorrowedBooks, 1);
      allBorrowsList.splice(borrowIndex, 1);
    } else {
      errorHandler(`You cannot return the book because a penalty was setted`);
    }
    return true;
  }
}

export default Booking;
