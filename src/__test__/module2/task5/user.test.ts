import User, { IUser } from '../../../tasks/module2/task5/User';
describe('User class tests', () => {
  describe('When invalid arguments are provided', () => {
    it(' - Should throws an error if invalid name is provided', () => {
      const surname: string = 'Koch';
      const email: string = 'Terrence_Lind@gmail.com';
      const password: string = 'fakePassword123!';
      const gender: string = 'male';
      const birthDate = '1.1.2000';

      const name: string = '';

      expect(() => new User(name, surname, birthDate, password, gender, email, 'user')).toThrowError(
        `Name cannot be empty`
      );
    });
    it(' - Should throws an error if invalid surname is provided', () => {
      const name: string = 'Sonia';
      const email: string = 'Terrence_Lind@gmail.com';
      const password: string = 'fakePassword123!';
      const gender: string = 'male';
      const birthDate = '1.1.2000';

      const surname: string = '';

      expect(() => new User(name, surname, birthDate, password, gender, email, 'user')).toThrowError(
        `Name cannot be empty`
      );
    });
    it(' - Should throws an erorr if birthDate is past', () => {
      const name: string = 'Sonia';
      const surname: string = 'Connelly';
      const email: string = 'Terrence_Lind@gmail.com';
      const password: string = 'fakePassword123!';
      const gender: string = 'male';

      const birthDate: string = '1.1.1879';

      expect(() => new User(name, surname, birthDate, password, gender, email, 'user')).toThrowError(
        `You can't be that old`
      );
    });
    it(' - Should throws an error if birthDate is future', () => {
      const name: string = 'Sonia';
      const surname: string = 'Connelly';
      const email: string = 'Terrence_Lind@gmail.com';
      const password: string = 'fakePassword123!';
      const gender: string = 'male';

      const birthDate: string = '1.1.2022';

      expect(() => new User(name, surname, birthDate, password, gender, email, 'user')).toThrowError(
        `You can't be from the future`
      );
    });
    it(' - Should throws an error if invalid date as birthDate is provided', () => {
      const name: string = 'Sonia';
      const surname: string = 'Connelly';
      const email: string = 'Terrence_Lind@gmail.com';
      const password: string = 'fakePassword123!';
      const gender: string = 'male';

      const birthDate: string = '1.1.NaN';

      expect(() => new User(name, surname, birthDate, password, gender, email, 'user')).toThrowError(
        `Invalid Date`
      );
    });

    it(' - Should throws an error if password does not match regExp', () => {
      const name: string = 'Sonia';
      const surname: string = 'Connelly';
      const email: string = 'Terrence_Lind@gmail.com';
      const gender: string = 'male';
      const birthDate: string = '1.1.2000';

      const passwords: string[] = ['test123', 'test123!', 'TEST123!', '1234567!@'];
      passwords.map((invalidPassword) => {
        expect(() => new User(name, surname, birthDate, invalidPassword, gender, email, 'user')).toThrowError(
          `Invalid password`
        );
      });
    });

    it(' - Should throws an error if invalid gender is provided', () => {
      const name: string = 'Sonia';
      const surname: string = 'Connelly';
      const email: string = 'Terrence_Lind@gmail.com';
      const birthDate: string = '1.1.2000';
      const password: string = 'Test1234@hello';

      const invalidGenders: string[] = ['test', 'gender', 'invalidGender'];

      invalidGenders.map((gender) => {
        expect(() => new User(name, surname, birthDate, password, gender, email, 'user')).toThrowError(
          'Allowed genders: male,female'
        );
      });
    });

    it(' - Should throws an error if new password is invalid', () => {
      const name: string = 'Sonia';
      const surname: string = 'Connelly';
      const email: string = 'Terrence_Lind@gmail.com';
      const birthDate: string = '1.1.2000';
      const password: string = 'Test1234@hello';
      const gender: string = 'male';

      const user = new User(name, surname, birthDate, password, gender, email, 'user');
      const newPasswords: string[] = ['test123', 'test123!', 'TEST123!', '1234567!@'];

      newPasswords.map((invalidPassword: string) => {
        expect(() => user.changePassword(invalidPassword)).toThrowError('Invalid password');
      });
    });

    it(' - Should throws an error if new emailAddress is invalid', () => {
      const name: string = 'Sonia';
      const surname: string = 'Connelly';
      const email: string = 'Terrence_Lind@gmail.com';
      const birthDate: string = '1.1.2000';
      const password: string = 'Test1234@hello';
      const gender: string = 'male';

      const user = new User(name, surname, birthDate, password, gender, email, 'user');
      const newEmails: string[] = [
        'Maybelle.Zulaufhotmail.com',
        'Maximo.Wittingyahoo.com',
        'Karlee0@.com',
        '@yahoo.com',
      ];

      newEmails.map((invalidEmail: string) => {
        expect(() => user.changeEmailAddress(invalidEmail)).toThrowError(`Invalid email`);
      });
    });
  });

  describe('When valid arguments are provided', () => {
    const name: string = 'Joy';
    const surname: string = 'Little';
    const email: string = 'Branson_Hartmann@yahoo.com';
    const password: string = 'qB7XH1Zza62QpBx!';
    const gender: string = 'male';
    const birthDate: string = '1.1.2000';
    let user: IUser;
    beforeEach(() => {
      user = new User(name, surname, birthDate, password, gender, email, 'user');
    });

    it(' - User should be able to change the password', () => {
      const newPassword: string = 'ZFC_R4AC0iXGu30@';

      user.changePassword(newPassword);

      expect(user.password).toStrictEqual(newPassword);
    });

    it(' - User should be able to change email', () => {
      const newEmail: string = 'Jeffry.Upton41@yahoo.com';

      user.changeEmailAddress(newEmail);

      expect(user.email).toStrictEqual(newEmail);
    });

    it(' - User with admin access level should be created', () => {
      const name: string = 'Thora';
      const surname: string = 'Ebert';
      const email: string = 'Nellie43@hotmail.com';
      const birthDate: string = '1.1.2000';
      const gender: string = 'male';
      const password: string = 'Tests123@';

      const user = new User(name, surname, birthDate, password, gender, email, 'admin');

      expect(user.accessLevel).toStrictEqual('admin');
    });
  });
});
