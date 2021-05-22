import Contact from '../../../../tasks/module2/task1/Contact/Contact';
import Group from '../../../../tasks/module2/task1/Group/Group';

describe('Group Class tests', () => {
  let group: Group;
  const fakeData = [
    {
      name: 'test1',
      surname: 'surnameTest1',
      email: 'test1@gmail.com',
    },
    {
      name: 'test2',
      surname: 'surnameTest2',
      email: 'test2@gmail.com',
    },
    {
      name: 'test3',
      surname: 'surnameTest3',
      email: 'test3@gmail.com',
    },
  ];
  beforeAll(() => {
    group = new Group('Tests');
    fakeData.map(({ name, surname, email }) => {
      group.createNewContact(name, surname, email);
    });
  });

  describe('When invalid arguments are provided', () => {
    it(' - Should throws an error if group name is empty', () => {
      expect(() => new Group('')).toThrowError('Value cannot be empty');
    });

    it(' - Should throws an Erorr if invalid new Group name is provided', () => {
      expect(() => group.changeGroupName('')).toThrowError('Value cannot be empty');
    });

    it(' - Should throws an Error when contact already Exists in group', () => {
      const name: string = 'test1';
      const surname: string = 'surnameTest1';
      const email: string = 'test1@gmail.pl';
      expect(() => group.createNewContact(name, surname, email)).toThrowError(
        `Contact ${name} ${surname} already exists`
      );
    });

    it(' - Should throws an Error when contact to be deleted does not exist', () => {
      const fakeNames: string[] = ['Test1', 'Mateusz', 'Test2', 'Test3', 'Grzegorz'];
      fakeNames.map((name) => {
        expect(() => group.removeContact(name)).toThrowError('Contact not found');
      });
    });

    it(' - Should throws an Error when empty contact to check provided', () => {
      expect(() => group.checkIfContactExists('')).toThrowError('Value cannot be empty');
    });

    it(' - Should throws an Error if list of contacts is empty', () => {
      expect(() => new Group('test').getContacts()).toThrow('List of Contacts is empty');
    });
  });

  describe('When valid arguments are provided', () => {
    it(' - Method correctly change name of Group', () => {
      const groupName: string = 'Test2';
      group.changeGroupName(groupName);
      expect(groupName).toStrictEqual(group.groupName);
    });

    it(' - Method correctly add contacts to group with correct class', () => {
      expect(group.getContacts()).toHaveLength(3);
      expect(group.getContacts().map((item) => expect(item).toBeInstanceOf(Contact)));
    });

    it(' - Method correctly finds contacts in group', () => {
      const correctlyContactsData: string[] = ['test1', 'surnameTest2', 'test3@gmail.com'];
      correctlyContactsData.map((value) => {
        expect(group.checkIfContactExists(value)).toBeTruthy();
      });

      const fakeContactsData: string[] = ['test4', 'surnameTest5', 'test6@gmail,com'];
      fakeContactsData.map((value) => {
        expect(group.checkIfContactExists(value)).toBeFalsy();
      });
    });

    it(' - Method correctly removes contacts from group', () => {
      const correctlyContactsData: string[] = ['test1', 'surnameTest2', 'test3@gmail.com'];

      correctlyContactsData.map((value) => {
        group.removeContact(value);
      });

      expect(group._contacts).toHaveLength(0);
    });
  });
});
