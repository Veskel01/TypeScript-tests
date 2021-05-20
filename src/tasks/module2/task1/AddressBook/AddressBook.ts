import Contact from "../Contact/Contact";
import Group from "../Group/Group";
import is from "is_js";

// error Handler

const errorHandler = (error: string): Error => {
  throw new Error(error);
};

// interface to return all contacts in AddressBook
interface IGetAllContacts {
  Contacts: Contact[];
  Groups: Group[];
}

interface IfindContactInAddressBook {
  searchingInContacts: number;
  searchingInGroups: number;
}

// class methods

const findContactInAddressBook = (
  contactToFind: string,
  listOfContacts: Contact[],
  listOfGroups: Group[]
): IfindContactInAddressBook => {
  if (is.empty(contactToFind)) {
    errorHandler(`Contact cannot be empty!`);
  }
  const regExForContact: RegExp = new RegExp(contactToFind, "g");
  const searchingInContacts: number = listOfContacts.findIndex((singleContact: Contact) => {
    return Object.values(singleContact).some((value: string) => value.match(regExForContact));
  });
  const [_contacts]: Group[] = listOfGroups;
  const searchingInGroups: number = _contacts._contacts.findIndex((singleContact) => {
    return Object.values(singleContact).some((value: string) => value.match(regExForContact));
  });
  if (searchingInContacts !== -1 || searchingInGroups !== -1) {
    return { searchingInContacts, searchingInGroups };
  } else {
    throw errorHandler(`Contact not found!`);
  }
};

// main class interface
interface IAddressBook {
  contacts: Contact[];
  groups: Group[];
  addNewContact: (firstName: string, surname: string, email: string) => Contact;
  addNewGroup: (groupName: string) => Group;
  findContact: (contactToFind: string) => Contact;
  removeContact: (contactToRemove: string) => void;
  removeGroup: (groupName: string) => Group[] | Error;
  getContacts: () => IGetAllContacts;
}

class AddressBook implements IAddressBook {
  contacts: Contact[];
  groups: Group[];
  constructor() {
    this.contacts = [];
    this.groups = [];
  }

  addNewContact(firstName: string, surname: string, email: string): Contact {
    this.contacts.some((singleContact: Contact) => {
      if (singleContact.firstName === firstName && singleContact.surname === surname) {
        errorHandler(`Contact ${firstName} ${surname} already exists`);
      }
    });
    const contact: Contact = new Contact(firstName, surname, email);
    this.contacts.push(contact);
    return contact;
  }
  addNewGroup(groupName: string): Group {
    this.groups.some((singleGroup: Group) => {
      if (singleGroup.groupName === groupName) {
        errorHandler(`Group ${groupName} already exists`);
      }
    });
    const newGroup: Group = new Group(groupName);
    this.groups.push(newGroup);
    return newGroup;
  }
  findContact(contactToFind: string): Contact {
    const result: IfindContactInAddressBook = findContactInAddressBook(contactToFind, this.contacts, this.groups);
    const { searchingInContacts, searchingInGroups } = result;
    if (searchingInContacts !== -1) {
      return this.contacts[searchingInContacts];
    } else {
      const [_contacts]: Group[] = this.groups;
      return _contacts._contacts[searchingInGroups];
    }
  }
  removeContact(contactToRemove: string): void {
    if (is.empty(contactToRemove)) {
      errorHandler(`Contact to remove cannot be empty!`);
    }
    const result: IfindContactInAddressBook = findContactInAddressBook(contactToRemove, this.contacts, this.groups);
    const { searchingInContacts, searchingInGroups } = result;
    if (searchingInContacts !== -1) {
      this.contacts.splice(searchingInContacts, 1);
    } else {
      const [_contacts]: Group[] = this.groups;
      _contacts._contacts.splice(searchingInGroups, 1);
    }
  }
  removeGroup(groupName: string): Group[] | Error {
    const findGroupIndex: number = this.groups.findIndex((singleGroup: Group) => {
      const groupNameRegEx: RegExp = new RegExp(groupName, "g");
      return singleGroup.groupName.match(groupNameRegEx);
    });
    return findGroupIndex !== -1 ? this.groups.splice(findGroupIndex, 1) : errorHandler(`Group ${groupName} not found`);
  }
  getContacts(): IGetAllContacts {
    const allContactsInAddressBooks: { Contacts: Contact[]; Groups: Group[] } = {
      Contacts: this.contacts,
      Groups: this.groups,
    };
    return allContactsInAddressBooks;
  }
}

export default AddressBook;
