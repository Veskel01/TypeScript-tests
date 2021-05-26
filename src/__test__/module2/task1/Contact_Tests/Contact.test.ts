import Contact from '../../../../tasks/module2/task1/Contact/Contact';
import validator from 'validator';
import { format } from 'date-fns';

describe('Contact Class tests', () => {
  let contact: Contact;
  const contactName = 'Jakub';
  beforeEach(() => {
    contact = new Contact(contactName, 'Andrzejewski', 'jakubandrzejewski@op.pl');
  });

  describe('When invalid arguments are provided into constructor:', () => {
    it(' - Should throw Error if name is empty', () => {
      const name: string = '';
      const surname: string = 'testSurname';
      const email: string = 'testEmail@gmail.com';
      expect(() => new Contact(name, surname, email)).toThrowError('Value cannot be empty!');
    });
    it(' - Should throw Error if surname is empty', () => {
      const name: string = 'Test';
      const surname: string = '';
      const email: string = 'testEmail@gmail.com';
      expect(() => new Contact(name, surname, email)).toThrowError('Value cannot be empty!');
    });
    it(' - Should trow Error if email is invalid', () => {
      const invalidEmails: string[] = ['jakubandrz', 'jakubandrz@', 'jakubandrz123', 'jandrz@op.', ''];

      invalidEmails.forEach((newEmail) => {
        expect(() => contact.modifyEmail(newEmail)).toThrowError('Invalid email');
      });
    });

    it(' - Throws an error if new firstName is invalid', () => {
      const newFirstName: string = '';
      expect(() => contact.modifyFirstName(newFirstName)).toThrowError('Value cannot be empty!');
    });

    it(' - Throws an error if new surname is invalid', () => {
      const newSurname: string = '';
      expect(() => contact.modifySurname(newSurname)).toThrowError('Value cannot be empty!');
    });
    it('Throws an error if new email is invalid', () => {
      const invalidEmails = ['jakubandrz', 'jakubandrz@', 'jakubandrz123', 'jandrz@op.', ''];

      invalidEmails.forEach((email) => {
        expect(() => contact.modifyEmail(email)).toThrowError('Invalid email');
      });
    });
  });

  describe('When valid arguments are provided into constructor:', () => {
    let actualLastModifyDateInDateFNSFormat: string;
    beforeEach(() => {
      actualLastModifyDateInDateFNSFormat = format(new Date(), 'dd-MM-yyyy');
    });

    it(' - Should set UUID as contact id', () => {
      expect(validator.isUUID(contact.id)).toBeTruthy();
    });

    it(' - Contact should have the current date as the creation date with given format', () => {
      const todayDateWithFormat = format(new Date(), 'dd-MM-yyyy');
      expect(contact._dateOfCreate).toStrictEqual(todayDateWithFormat);
    });

    it(' - Method should change the name in contact and modify lastModifyDate', () => {
      const newNames = ['Anderson', 'Waylon', 'Marvin'];
      newNames.map((newName) => {
        contact.modifyFirstName(newName);
        expect(contact.firstName).toStrictEqual(newName);
        expect(contact._lastModifyDate).toStrictEqual(actualLastModifyDateInDateFNSFormat);
      });
    });
    it(' - Method should change the surname in contact and modify lastModifyDate', () => {
      const newSurnames = ['Stoltenberg', 'Fritsch', 'Ondricka'];
      newSurnames.map((newSurname) => {
        contact.modifySurname(newSurname);
        expect(contact.surname).toStrictEqual(newSurname);
        expect(contact._lastModifyDate).toStrictEqual(actualLastModifyDateInDateFNSFormat);
      });
    });

    it(' - Method should change the email in contact and modify lastModifyDate', () => {
      const newEmails = ['Hassie85@yahoo.com', 'Casper_Hudson36@gmail.com', 'Carlo_Becker@hotmail.com'];
      newEmails.map((newEmail) => {
        contact.modifyEmail(newEmail);
        expect(contact.email).toStrictEqual(newEmail);
        expect(contact._lastModifyDate).toStrictEqual(actualLastModifyDateInDateFNSFormat);
      });
    });
  });
});
