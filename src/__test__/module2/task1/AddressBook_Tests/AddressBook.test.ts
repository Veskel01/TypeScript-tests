import Group from '../../../../tasks/module2/task1/Group/Group';
import AddressBook from '../../../../tasks/module2/task1/AddressBook/AddressBook';
import Contact from '../../../../tasks/module2/task1/Contact/Contact';

describe('AddressBook Tests', () => {
  let addressBook: AddressBook;
  let testGroupInAddressBook: Group;
  const testGroupName: string = 'TestGroupName';
  beforeEach(() => {
    addressBook = new AddressBook();
    testGroupInAddressBook = addressBook.addNewGroup(testGroupName);
  });
  describe('When invalid arguments are provided:', () => {
    it(' - Throws an error if contact already exists', () => {
      const testContactName: string = 'test1';
      const testContactSurname: string = 'test1surname';
      const testContactEmail: string = 'test1@gmail.com';

      addressBook.addNewContact(testContactName, testContactSurname, testContactEmail);

      expect(() =>
        addressBook.addNewContact(testContactName, testContactSurname, testContactEmail)
      ).toThrowError(`Contact ${testContactName} ${testContactSurname} already exists`);
    });
    it(' - Throws an error if invalid group name provided and if group already exists', () => {
      expect(() => addressBook.addNewGroup('')).toThrowError('Value cannot be empty');
    });

    it(' - Throws an Error if group already exists', () => {
      expect(() => addressBook.addNewGroup(testGroupName)).toThrowError(
        `Group ${testGroupName} already exists`
      );
    });

    it(' - Throws an Error if contact does not exists in addressBoo', () => {
      expect(() => addressBook.findContact('KONTAKT')).toThrowError('Contact not found!');
    });

    it(' - Throws an Error if invalid contact name to find is provided', () => {
      expect(() => addressBook.findContact('')).toThrowError('Value cannot be empty');
    });

    it(' - Throws an Error if Contact to remove does not exists', () => {
      const fakeContact: string = 'FakeContact';
      expect(() => addressBook.removeContact(fakeContact)).toThrowError('Contact not found!');
    });

    it(' - Throws an Error if invalid contact name to remove is provided', () => {
      expect(() => addressBook.removeContact('')).toThrowError('Value cannot be empty');
    });

    it(' - Throws an error if groupName to remove is invalid or does not exist', () => {
      const fakeGroupName: string = 'Testowa grupa';
      expect(() => addressBook.removeGroup(fakeGroupName)).toThrowError(`Group ${fakeGroupName} not found`);
    });

    it(' - Throws an Error if invalid groupName to remove is provided', () => {
      expect(() => addressBook.removeGroup('')).toThrowError('Value cannot be empty');
    });
  });

  describe('When valid arguments are provided:', () => {
    it(' - Method correctly creates new Contact', () => {
      const name: string = 'Jakub';
      const surname: string = 'Andrzejewski';
      const email: string = 'jakubandrzejewski@gmail.com';
      const expectedLenghOfAdressBook = addressBook.contacts.length + 1;
      const newContact = addressBook.addNewContact(name, surname, email);

      expect(addressBook.contacts).toHaveLength(expectedLenghOfAdressBook);
      expect(addressBook.contacts).toContain(newContact);
      expect(newContact).toBeInstanceOf(Contact);
      expect(newContact).toStrictEqual(addressBook.contacts.pop());
    });

    it(' - Method correctly creates new Group', () => {
      const newGroup = addressBook.addNewGroup('test');
      expect(newGroup).toBeInstanceOf(Group);
      expect(addressBook.groups).toContain(newGroup);
    });

    it(' - Method correctly find new contact in Contact List', () => {
      const name: string = 'TestName';
      const surname: string = 'TestSurname';
      const email: string = 'testEmail@gmail.com';
      addressBook.addNewContact(name, surname, email);

      const contact = addressBook.findContact(name);

      expect(contact.firstName).toStrictEqual(name);
      expect(contact.surname).toStrictEqual(surname);
      expect(contact.email).toStrictEqual(email);
    });

    it(' - Method correctly finds contact in group', () => {
      const name: string = 'TestName';
      const surname: string = 'TestSurname';
      const email: string = 'testEmail@gmail.com';
      testGroupInAddressBook.createNewContact(name, surname, email);

      const contact = addressBook.findContact(name);
      expect(contact.firstName).toStrictEqual(name);
      expect(contact.surname).toStrictEqual(surname);
      expect(contact.email).toStrictEqual(email);
    });

    it(' - Method correctly removes Contact from contact list', () => {
      const name: string = 'TestName';
      const surname: string = 'TestSurname';
      const email: string = 'testEmail@gmail.com';

      const contact = addressBook.addNewContact(name, surname, email);

      const lengthBeforeRemove = addressBook.contacts.length;

      addressBook.removeContact(name);

      expect(addressBook.contacts.length).not.toStrictEqual(lengthBeforeRemove);
      expect(addressBook).not.toContain(contact);
    });

    it(' - Method correctly removes contact from Group', () => {
      const name: string = 'TestName';
      const surname: string = 'TestSurname';
      const email: string = 'testEmail@gmail.com';

      const contact = testGroupInAddressBook.createNewContact(name, surname, email);

      const lengthBeforeRemove = testGroupInAddressBook._contacts.length;

      testGroupInAddressBook.removeContact(name);

      expect(testGroupInAddressBook._contacts.length).not.toStrictEqual(lengthBeforeRemove);
      expect(testGroupInAddressBook._contacts).not.toContain(contact);
    });

    it(' - Method correctly returns all contacts from Address Book', () => {
      const allContacts = addressBook.getContacts();

      expect(addressBook.contacts).toStrictEqual(allContacts.Contacts);
      expect(addressBook.groups).toStrictEqual(allContacts.Groups);
    });
  });
});
