import { group } from "console";
import is, { boolean } from "is_js";

import Contact from "../Contact/Contact";
import Group from "../Group/Group";

// error Handler

const errorHandler = (error: string): Error => {
  throw new Error(error);
};

interface IAddressBook {
  contacts: Contact[];
  groups: Group[];
  addNewContact: (firstName: string, surname: string, email: string) => Contact;
  addNewGroup: (groupName: string) => Group;
  findContact: (contactToFind: string) => string | Error;
  removeContact: (contactToRemove: string) => void;
  removeGroup: (groupName: string) => Group[] | Error;
  getContacts: () => IGetAllContacts;
}

interface IGetAllContacts {
  Contacts: Contact[];
  Groups: Group[];
}

// class method

interface IFindContact {
  searchingInContacts: number;
  searchingInGroups: number;
}

const findContact = (contactToFind: string, groupsList: Group[], contactsList: Contact[]) => {
  const regExForContact: RegExp = new RegExp(contactToFind, "g");
  const searchingInContacts: Contact | undefined = contactsList.find((singleContact: Contact) => {
    return Object.values(singleContact).some((value: string) => value.match(regExForContact) && singleContact.id !== undefined);
  });
  const searchingInGroups: Group | undefined = groupsList.find((singleGroup: Group) => {
    const { _contacts }: Group = singleGroup;
    const result: boolean = _contacts.some((singleContact: Contact) => {
      return Object.values(singleContact).some((value: string) => value.match(regExForContact) && singleContact.id !== undefined);
    });
    return result;
  });
  return { searchingInContacts, searchingInGroups };
};

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

  findContact(contactToFind: string): string {
    //   // const regExForContact: RegExp = new RegExp(contactToFind, "g");
    //   // const findInContacts: number = this.contacts.findIndex((singleContact: Contact) => {
    //   //   return Object.values(singleContact).some((value: string) => value.match(regExForContact) && singleContact.id !== undefined);
    //   // });
    //   // const findInGroups: number = this.groups.findIndex((singleGroup: Group) => {
    //   //   const { _contacts }: Group = singleGroup;
    //   //   const result: boolean = _contacts.some((singleContact: Contact) => {
    //   //     return Object.values(singleContact).some(
    //   //       (value: string) => value.match(regExForContact) && singleContact.id !== undefined
    //   //     );
    //   //   });
    //   //   return result;
    //   // });
    //   // return findInContacts === -1 && findInGroups === -1
    //   //   ? errorHandler(`Nothing was found`)
    //   //   : findInContacts !== -1
    //   //   ? `Contact ${this.contacts[findInContacts].firstName} ${this.contacts[findInContacts].surname} was found`
    //   //   : `Contact was found in Group: ${this.groups[findInGroups].groupName}`;
    return "test";
  }
  removeContact(contactToRemove: string) {
    if (is.empty(contactToRemove)) {
      errorHandler(`Contact to remove cannot be empty!`);
    }
    const { searchingInContacts, searchingInGroups } = findContact(contactToRemove, this.groups, this.contacts);
    console.log(searchingInContacts, searchingInGroups);
  }

  removeGroup(groupName: string): Error | Group[] {
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
