import Group from '../../../../tasks/module2/task1/Group/Group';
import validator from 'validator';

describe('Group Class tests', () => {
  let group: Group;
  beforeEach(() => {
    group = new Group('Tests');
  });

  describe('When invalid arguments are provided', () => {
    it(' - Should throws an error if group name is empty', () => {
      const invalidName: string = '';
      expect(() => new Group(invalidName)).toThrowError('Value cannot be empty');
    });

    it(' - Should throws an Erorr if invalid new Group name is provided', () => {
      const invalidGroupName: string = '';
      expect(() => group.changeGroupName(invalidGroupName)).toThrowError('Value cannot be empty');
    });

    it(' - Should throws an Error when contact already Exists in group', () => {
      const name: string = 'test1';
      const surname: string = 'surnameTest1';
      const email: string = 'test1@gmail.pl';
      group.createNewContact(name, surname, email);
      expect(() => group.createNewContact(name, surname, email)).toThrowError(
        `Contact ${name} ${surname} already exists`
      );
    });

    it(' - Should throws an Error when contact to be deleted does not exist', () => {
      const fakeNames: string[] = ['Berenice', 'Nils', 'Cordie', 'Ian', 'Giles'];
      fakeNames.map((name) => {
        expect(() => group.removeContact(name)).toThrowError('Contact not found');
      });
    });

    it(' - Should throws an Error when empty contact to check provided', () => {
      const emptyContactName: string = '';
      expect(() => group.checkIfContactExists(emptyContactName)).toThrowError('Value cannot be empty');
    });

    it(' - Should throws an Error if list of contacts is empty', () => {
      const newEmptyGroupName: string = 'test';
      expect(() => new Group(newEmptyGroupName).getContacts()).toThrow('List of Contacts is empty');
    });
  });

  describe('When valid arguments are provided', () => {
    it(' - Method correctly change name of Group', () => {
      const groupName: string = 'Test2';
      group.changeGroupName(groupName);
      expect(groupName).toStrictEqual(group.groupName);
    });

    it(' - UUID is correctly setted as id', () => {
      expect(validator.isUUID(group.id)).toBeTruthy();
    });

    it(' - Method correctly add contacts to group', () => {
      const name: string = 'Rosalind';
      const surname: string = 'Mante';
      const email: string = 'Gisselle82@gmail.com';
      const lengthBefore: number = group._contacts.length;
      const expectedLength = lengthBefore + 1;
      const contact = group.createNewContact(name, surname, email);

      expect(group._contacts.length).toStrictEqual(expectedLength);
      expect(group._contacts).toContain(contact);
    });

    it(' - Method correctly finds contacts in group', () => {
      const name: string = 'Ian';
      const surname: string = 'Wuckert';
      const email: string = 'Lenny_Yundt@gmail.com';
      const contact = group.createNewContact(name, surname, email);
      expect(group._contacts).toContain(contact);
    });

    it(' - Method correctly removes contacts from group', () => {
      const name: string = 'Ian';
      const surname: string = 'Wuckert';
      const email: string = 'Lenny_Yundt@gmail.com';
      const contact = group.createNewContact(name, surname, email);
      const expectedLength: number = group._contacts.length - 1;

      group.removeContact(name);
      expect(group._contacts).not.toContain(contact);
      expect(group._contacts.length).toStrictEqual(expectedLength);
    });
  });
});
