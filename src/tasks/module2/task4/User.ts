import { v4 as uuidv4 } from 'uuid';
import is from 'is_js';

// error handler

const errorHandler = (error: string): void => {
  throw new Error(error);
};

// throws error on invalid email

const throwErrorOnInvalidEmail = (email: string): void => {
  if (is.not.email(email)) {
    errorHandler('Invalid email');
  }
};

// throws error on invalid name or surname

const throwErrorOnEmptyName = (name: string): void => {
  if (is.empty(name)) {
    errorHandler('Name cannot be empty!');
  }
};

export interface IUser {
  id: string;
  firstName: string;
  surname: string;
  email: string;
}

class User implements IUser {
  public id: string;
  public firstName: string;
  public surname: string;
  public email: string;
  constructor(firstName: string, surname: string, email: string) {
    this.id = uuidv4();
    throwErrorOnEmptyName(firstName);
    this.firstName = firstName;
    throwErrorOnEmptyName(surname);
    this.surname = surname;
    throwErrorOnInvalidEmail(email);
    this.email = email;
  }
}

export default User;
