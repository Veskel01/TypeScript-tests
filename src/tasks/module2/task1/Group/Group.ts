import is from "is_js";
import { v4 as uuidv4 } from "uuid";
import Contact from "../Contact/Contact";

// error handler

const errorHandler = (error: string) => {
  throw new Error(error);
};

// check if value is empty

const throwErrorOnEmptyValue = <T>(value: T): void | boolean => {
  if (is.empty(value)) {
    errorHandler("Value cannot be empty!");
  }
};

// interface for Group Class

interface IGroup {
  id: string;
  groupName: string;
  _contacts: Contact[];
  changeGroupName: (newGroupName: string) => void;
  createNewContact: (firstName: string, surname: string, email: string) => Contact;
  removeContact: (contactToRemove: string) => void;
  checkIfContactExists: (contactToCheck: string) => boolean;
  getContacts: () => Contact[];
}

class Group implements IGroup {
  public id: string;
  public groupName: string;
  _contacts: Contact[];
  constructor(groupName: string) {
    this.id = uuidv4();
    throwErrorOnEmptyValue(groupName);
    this.groupName = groupName;
    this._contacts = [];
  }

  changeGroupName(newGroupName: string): void {
    throwErrorOnEmptyValue(newGroupName);
    this.groupName = newGroupName;
  }

  createNewContact(firstName: string, surname: string, email: string): Contact {
    this._contacts.some((singleContact: Contact) => {
      if (singleContact.firstName === firstName && singleContact.surname === surname) {
        errorHandler(`Contact ${firstName} ${surname} already exists`);
      }
    });
    const contact: Contact = new Contact(firstName, surname, email);
    this._contacts.push(contact);
    return contact;
  }

  removeContact(contactToRemove: string): Contact[] {
    throwErrorOnEmptyValue(contactToRemove);
    const result: number = this._contacts.findIndex((singleContact: Contact) => {
      return Object.values(singleContact).includes(contactToRemove);
    });
    return result !== -1 ? this._contacts.splice(result, 1) : errorHandler("Contact not found");
  }

  checkIfContactExists(contactToCheck: string): boolean {
    throwErrorOnEmptyValue(contactToCheck);
    const regExForSearch: RegExp = new RegExp(contactToCheck, "g");
    const checkIfExistsResult: boolean = this._contacts.some((contact: Contact) => {
      return Object.values(contact).some(
        (valueInContact: string) => valueInContact.match(regExForSearch) && contact.id !== undefined
      );
    });
    return checkIfExistsResult;
  }

  getContacts() {
    if (is.empty(this._contacts)) {
      errorHandler("List of Contacts is empty");
    }
    return this._contacts;
  }
}

export default Group;
