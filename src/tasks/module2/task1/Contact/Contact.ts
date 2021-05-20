import { v4 as uuidv4 } from "uuid";
import is from "is_js";
import { format } from "date-fns";

const errorHandler = (error: string): void => {
  throw new Error(error);
};

// check empty values

const checkIfValueIsEmpty = (value: string): void => {
  if (is.empty(value)) {
    errorHandler("Value cannot be empty!");
  }
};

// check incorrect email

const throwErrorOnIncorrectEmail = (email: string): void => {
  if (is.not.email(email)) {
    errorHandler("Invalid email");
  }
};

const returnDate = (): string => {
  const date: Date = new Date();
  return format(date, "dd-MM-yyyy");
};

interface IContact {
  id: string;
  firstName: string;
  surname: string;
  email: string;

  _dateOfCreate: string;
  _lastModifyDate?: string;

  modifyFirstName: (newFirstName: string) => void;
  modifySurname: (newSurname: string) => void;
  modifyEmail: (newEmail: string) => void;

  _setUpdatedDate: (newEmail: string) => void;
}

class Contact implements IContact {
  public id: string;
  public firstName: string;
  public surname: string;
  public email: string;
  _dateOfCreate: string;
  _lastModifyDate?: string;
  constructor(firstName: string, surname: string, email: string) {
    this.id = uuidv4();
    checkIfValueIsEmpty(firstName);
    this.firstName = firstName;
    checkIfValueIsEmpty(surname);
    this.surname = surname;
    throwErrorOnIncorrectEmail(email);
    this.email = email;
    this._dateOfCreate = returnDate();
    this._lastModifyDate;
  }

  _setUpdatedDate() {
    this._lastModifyDate = format(new Date(), "dd-MM-yyyy");
  }

  modifyFirstName(newFirstName: string): void {
    checkIfValueIsEmpty(newFirstName);
    this.firstName = newFirstName;
    this._lastModifyDate = returnDate();
  }

  modifySurname(newSurname: string): void {
    checkIfValueIsEmpty(newSurname);
    this.surname = newSurname;
    this._lastModifyDate = returnDate();
  }

  modifyEmail(newEmail: string): void {
    throwErrorOnIncorrectEmail(newEmail);
    this.email = newEmail;
    this._lastModifyDate = returnDate();
  }

  containsPhrase(phrase: string) {
    const regexForPhrase: RegExp = new RegExp(phrase, "g");
    const result: boolean = Object.values(this).some((word: string) => word.match(regexForPhrase));
    return result === true ? result : errorHandler(`Word ${phrase} not found`);
  }
}

export default Contact;
