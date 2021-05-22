import Group from '../../../../tasks/module2/task1/Group/Group';
import AddressBook from '../../../../tasks/module2/task1/AddressBook/AddressBook';
import Contact from '../../../../tasks/module2/task1/Contact/Contact';

describe('AddressBook Tests', () => {
  let addressBook: AddressBook;
  let testGroupInAddressBook: Group;
  beforeAll(() => {
    const testContactName: string = 'test1';
    const testContactSurname: string = 'test1surname';
    const testContactEmail: string = 'test1@gmail.com';

    const testGroupName: string = 'testGroup';
    addressBook = new AddressBook();
    testGroupInAddressBook = addressBook.addNewGroup(testGroupName);

    addressBook.addNewContact(testContactName, testContactSurname, testContactEmail);
  });
  describe('When invalid arguments are provided:', () => {
    it(' - Throws an error if contact already exists', () => {
      const testContactName: string = 'test1';
      const testContactSurname: string = 'test1surname';
      const testContactEmail: string = 'test1@gmail.com';
      expect(() =>
        addressBook.addNewContact(testContactName, testContactSurname, testContactEmail)
      ).toThrowError(`Contact ${testContactName} ${testContactSurname} already exists`);
    });
    it(' - Throws an error if invalid group name provided and if group already exists', () => {
      const testGroupName: string = 'testGroup';
      expect(() => addressBook.addNewGroup('')).toThrowError('Value cannot be empty');
      expect(() => addressBook.addNewGroup(testGroupName)).toThrowError(
        `Group ${testGroupName} already exists`
      );
    });

    it(' - Throws an Error if contact does not exists in addressBook, in any Group or invalid contact name is provided', () => {
      expect(() => addressBook.findContact('KONTAKT')).toThrowError('Contact not found!');
      expect(() => addressBook.findContact('')).toThrowError('Value cannot be empty');
    });

    it(' - Throws an Error if Contact to remove does not exists or invalid Contact name provided', () => {
      const fakeContact: string = 'FakeContact';
      expect(() => addressBook.removeContact('')).toThrowError('Value cannot be empty');
      expect(() => addressBook.removeContact(fakeContact)).toThrowError('Contact not found!');
    });

    it(' - Throws an error if groupName to remove is invalid or does not exist', () => {
      const fakeGroupName: string = 'Testowa grupa';
      expect(() => addressBook.removeGroup('')).toThrowError('Value cannot be empty');
      expect(() => addressBook.removeGroup(fakeGroupName)).toThrowError(`Group ${fakeGroupName} not found`);
    });
  });

  describe('When valid arguments are provided:', () => {
    it(' - Method correctly creates new Contact', () => {
      const name: string = 'Jakub';
      const surname: string = 'Andrzejewski';
      const email: string = 'jakubandrzejewski@gmail.com';
      const addressBookLengthBeforeNewContact = addressBook.contacts.length;
      const newContact = addressBook.addNewContact(name, surname, email);
      expect(addressBook.contacts).toHaveLength(addressBookLengthBeforeNewContact + 1);
      expect(addressBook.contacts).toContain(newContact);
      expect(newContact).toBeInstanceOf(Contact);
      expect(newContact).toStrictEqual(addressBook.contacts.pop());
    });

    it(' - Method correctly creates new Group', () => {
      const newGroup = addressBook.addNewGroup('test');
      expect(newGroup).toBeInstanceOf(Group);
      expect(addressBook.groups).toContain(newGroup);
    });

    it(' - Method correctly finds new contact in Contact List or in Group', () => {
      const contactNameToFind: string = 'test1';
      const contactNameToFindInGroup: string = 'test2';
      testGroupInAddressBook.createNewContact('test2', 'test2surname', 'test2@gmail.com');

      const contactFromContacts = addressBook.findContact(contactNameToFind);
      const contactFromGroup = addressBook.findContact(contactNameToFindInGroup);

      expect(contactFromContacts).toBeInstanceOf(Contact);
      expect(contactFromGroup).toBeInstanceOf(Contact);

      expect(contactFromContacts.firstName).toStrictEqual(contactNameToFind);
      expect(contactFromGroup.firstName).toStrictEqual(contactNameToFindInGroup);
    });

    it(' - Method correctly removes Contact from contact list', () => {
      const contactNameToRemove: string = 'test1';

      const lengthBeforeRemove = addressBook.contacts.length;
      addressBook.removeContact(contactNameToRemove);

      expect(addressBook.contacts.length).not.toStrictEqual(lengthBeforeRemove);

      testGroupInAddressBook.createNewContact('test', 'test', 'test123@gmail.com');
      const groupLengthBeforeRemove: number = testGroupInAddressBook._contacts.length;

      addressBook.removeContact('test');

      expect(testGroupInAddressBook._contacts.length).not.toStrictEqual(groupLengthBeforeRemove);
    });

    it(' - Method correctly returns all contacts from Address Book', () => {
      const allContacts = addressBook.getContacts();

      expect(addressBook.contacts).toStrictEqual(allContacts.Contacts);
      expect(addressBook.groups).toStrictEqual(allContacts.Groups);

      addressBook.contacts.length = 0;
      addressBook.groups.length = 0;

      const emptyResultExpected = {
        Contacts: [],
        Groups: [],
      };

      expect(addressBook.getContacts()).toMatchObject(emptyResultExpected);
    });
  });
});
