import Contact from '../../../../tasks/module2/task1/Contact/Contact';
import { format } from 'date-fns';

describe('Contact Class tests', () => {
  describe('When invalid arguments are provided into constructor:', () => {
    let contact: Contact;

    beforeAll(() => {
      contact = new Contact('Jakub', 'Andrzejewski', 'jakubandrzejewski@op.pl');
    });

    it(' - Should throw Error if name is empty', () => {
      expect(() => new Contact('', 'test', 'test@op.pl')).toThrowError('Value cannot be empty!');
    });
    it(' - Should throw Error if surname is empty', () => {
      expect(() => new Contact('test', '', 'test@pp.pl')).toThrowError('Value cannot be empty!');
    });
    it(' - Should trow Error if email is invalid', () => {
      const invalidEmails: string[] = ['jakubandrz', 'jakubandrz@', 'jakubandrz123', 'jandrz@op.', ''];

      invalidEmails.forEach((newEmail) => {
        expect(() => contact.modifyEmail(newEmail)).toThrowError('Invalid email');
      });
    });

    it(' - Throws an error if new firstName is invalid', () => {
      expect(() => contact.modifyFirstName('')).toThrowError('Value cannot be empty!');
    });

    it(' - Throws an error if new surname is invalid', () => {
      expect(() => contact.modifySurname('')).toThrowError('Value cannot be empty!');
    });
    it('Throws an error if new email is invalid', () => {
      const invalidEmails = ['jakubandrz', 'jakubandrz@', 'jakubandrz123', 'jandrz@op.', ''];

      invalidEmails.forEach((email) => {
        expect(() => contact.modifyEmail(email)).toThrowError('Invalid email');
      });
    });
  });

  describe('When valid arguments are provided into constructor:', () => {
    let contact: Contact;
    const actualLastModifyDate = format(new Date(), 'dd-MM-yyyy');
    beforeAll(() => {
      contact = new Contact('Jakub', 'Andrzejewski', 'jakubandrzejewski@vp.pl');
    });

    it(' - Should create a contact as instance of Contact', () => {
      expect(contact).toBeInstanceOf(Contact);
    });

    it(' - Contact should have the current date as the creation date with given format', () => {
      const todayDateWithFormat = format(new Date(), 'dd-MM-yyyy');
      expect(contact._dateOfCreate).toStrictEqual(todayDateWithFormat);
    });

    it(' - Method should change the name in contact and modify lastModifyDate', () => {
      const newNames = ['Mateusz', 'Grzegorz', 'Test'];
      newNames.map((newName) => {
        contact.modifyFirstName(newName);
        expect(contact.firstName).toStrictEqual(newName);
        expect(contact._lastModifyDate).toStrictEqual(actualLastModifyDate);
      });
    });
    it(' - Method should change the surname in contact and modify lastModifyDate', () => {
      const newSurnames = ['Test', 'test1', 'test2'];
      newSurnames.map((newSurname) => {
        contact.modifySurname(newSurname);
        expect(contact.surname).toStrictEqual(newSurname);
        expect(contact._lastModifyDate).toStrictEqual(actualLastModifyDate);
      });
    });

    it(' - Method should change the email in contact and modify lastModifyDate', () => {
      const newEmails = ['test1@gmail.com', 'test2@gmail.com', 'test3@gmail.com'];

      newEmails.map((newEmail) => {
        contact.modifyEmail(newEmail);
        expect(contact.email).toStrictEqual(newEmail);
        expect(contact._lastModifyDate).toStrictEqual(actualLastModifyDate);
      });
    });
  });
});
