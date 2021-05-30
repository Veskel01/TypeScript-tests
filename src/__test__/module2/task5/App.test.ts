import App, { IApp } from '../../../tasks/module2/task5/App';
import { IUser } from '../../../tasks/module2/task5/User';

describe('App class tests', () => {
  let app: IApp;
  beforeEach(() => {
    app = new App();
  });
  describe('When invalid arguments are provided', () => {
    it(' - Should throws an error if user with user accessLevel tries to change the access level of another user ', () => {
      const name: string = 'Alisha';
      const surname: string = 'Wisoky';
      const email: string = 'Sim79@yahoo.com';
      const birthDate: string = '1.1.2000';
      const password: string = 'Bg7Yy4nkwCsUhCg@';
      const gender: string = 'male';

      const user = app.createNewUser(name, surname, birthDate, password, gender, email, 'user');
      const user2 = app.createNewUser(name, surname, birthDate, password, gender, email, 'user');

      expect(() => app.changeUserAccessLevel(user, user2, 'admin')).toThrowError(`Access denied`);
    });
    it(' - Should throws an error if user with user accessLevel tries to change password of another user ', () => {
      const name: string = 'Alisha';
      const surname: string = 'Wisoky';
      const email: string = 'Sim79@yahoo.com';
      const birthDate: string = '1.1.2000';
      const password: string = 'Bg7Yy4nkwCsUhCg@';
      const gender: string = 'male';

      const newPassword: string = 'IK_8RUq641615LM!@';
      const user = app.createNewUser(name, surname, birthDate, password, gender, email, 'user');
      const user2 = app.createNewUser(name, surname, birthDate, password, gender, email, 'user');

      expect(() => app.changeUserPassword(user, user2, newPassword)).toThrowError(`Access denied`);
    });

    it(' - Should throws an error if admin tries to change access level of another admin', () => {
      const name: string = 'Alisha';
      const surname: string = 'Wisoky';
      const email: string = 'Sim79@yahoo.com';
      const birthDate: string = '1.1.2000';
      const password: string = 'Bg7Yy4nkwCsUhCg@';
      const gender: string = 'male';

      const admin1 = app.createNewAdmin(name, surname, birthDate, password, gender, email, 'admin');
      const admin2 = app.createNewAdmin(name, surname, birthDate, password, gender, email, 'admin');

      expect(() => app.changeUserAccessLevel(admin1, admin2, 'user')).toThrowError(
        'You cannot change the accessLevel of another admin'
      );
    });

    it(' - Should throws an error if admin tries to change password of another admin', () => {
      const name: string = 'Alisha';
      const surname: string = 'Wisoky';
      const email: string = 'Sim79@yahoo.com';
      const birthDate: string = '1.1.2000';
      const password: string = 'Bg7Yy4nkwCsUhCg@';
      const gender: string = 'male';

      const admin1 = app.createNewAdmin(name, surname, birthDate, password, gender, email, 'admin');
      const admin2 = app.createNewAdmin(name, surname, birthDate, password, gender, email, 'admin');

      const newPassword: string = 'aU55ms6f4VvHyAm@';
      expect(() => app.changeUserPassword(admin1, admin2, newPassword)).toThrowError(
        'You cannot change password of another admin'
      );
    });
  });

  describe('When valid arguments are provided', () => {
    const name: string = 'Amalia';
    const surname: string = 'Shields';
    const email: string = 'Judge_Trantow10@gmail.com';
    const birthDate: string = '1.1.2000';
    const gender: string = 'male';
    const password: string = 'lK7o_peR5AHNcMY@!';
    let admin: IUser;
    let user: IUser;
    beforeEach(() => {
      admin = app.createNewAdmin(name, surname, birthDate, password, gender, email, 'admin');
      user = app.createNewAdmin(name, surname, birthDate, password, gender, email, 'user');
    });

    it(' - App creates an user with admin access level', () => {
      const { accessLevel } = admin;
      expect(app.users).toContain(admin);
      expect(accessLevel).toStrictEqual('admin');
    });

    it(' - Admin can change user password', () => {
      const newPassword: string = 'JXzu7WplcytPQ6Y!@';

      app.changeUserPassword(admin, user, newPassword);

      expect(user.password).toStrictEqual(newPassword);
    });

    it(' - Admin can change user accessLevel', () => {
      app.changeUserAccessLevel(admin, user, 'admin');

      expect(user.accessLevel).toStrictEqual('admin');
    });
  });
});
