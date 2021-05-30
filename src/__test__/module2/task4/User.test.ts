import User, { IUser } from '../../../tasks/module2/task4/User';
import validator from 'validator';

describe('User class tests', () => {
  describe('When invalid arguments are provided', () => {
    it(' - Should throws an error if invalid firsName is provided', () => {
      const invalidFirstName: string = '';
      const surname: string = 'Schmidt';
      const email: string = 'Noemy.Hilll54@gmail.com';

      expect(() => new User(invalidFirstName, surname, email)).toThrowError('Name cannot be empty!');
    });

    it(' - Should throws an error if invalid surname is provided', () => {
      const firstName: string = 'Jovanny';
      const invalidSurname: string = '';
      const email: string = 'Noemy.Hilll54@gmail.com';

      expect(() => new User(firstName, invalidSurname, email)).toThrowError('Name cannot be empty!');
    });

    it(' - Should throws an error if invalid email is provided', () => {
      const firstName: string = 'Jovanny';
      const surname: string = 'Lynch';

      const invalidEmails: string[] = [
        '',
        'Dennis.DAmore5',
        'Margarette_Bruen70@',
        'Johnson_Kemmer49@hotmail',
      ];

      invalidEmails.map((invalidEmail: string) => {
        expect(() => new User(firstName, surname, invalidEmail)).toThrowError('Invalid email');
      });
    });
  });

  describe('When valid arguments are provided', () => {
    const firstName: string = 'Burnice';
    const surname: string = 'Skiles';
    const email: string = 'Jailyn_Price@gmail.com';
    let user: IUser;
    beforeEach(() => {
      user = new User(firstName, surname, email);
    });

    it(' - UUID should be set as id field', () => {
      const { id } = user;

      expect(validator.isUUID(id)).toBeTruthy();
    });

    it(' - Name should be correctly set', () => {
      const { firstName } = user;

      expect(firstName).toStrictEqual(firstName);
    });

    it(' - Surname should be correctly set', () => {
      const { surname } = user;

      expect(user.surname).toStrictEqual(surname);
    });

    it(' - email should be correctly set', () => {
      const { email } = user;

      expect(email).toStrictEqual(email);
    });
  });
});
