import { access } from "fs/promises";
import User, { IUser } from "./User";
import { AccessLevelType } from "./__helpers";

interface IApp {
  users: IUser[];
  createNewAdmin: (
    firstName: string,
    surname: string,
    birthDate: string,
    password: string,
    gender: string,
    email: string,
    accessLevel: AccessLevelType
  ) => IUser;
  createNewUser: (
    firstName: string,
    surname: string,
    birthDate: string,
    password: string,
    gender: string,
    email: string,
    accessLevel: AccessLevelType
  ) => IUser;
  changeUserAccessLevel: (admin: IUser, user: IUser, newAccessLevel: AccessLevelType) => void;
  changeUserPassword: (admin: IUser, user: IUser, newPassword: string) => void;
}

class App implements IApp {
  users: IUser[];
  constructor() {
    this.users = [];
  }

  public createNewAdmin(
    firstName: string,
    surname: string,
    birthDate: string,
    password: string,
    gender: string,
    email: string,
    accessLevel: AccessLevelType
  ): IUser {
    const newAdmin: IUser = new User(
      firstName,
      surname,
      birthDate,
      password,
      gender,
      email,
      accessLevel
    );
    this.users.push(newAdmin);
    return newAdmin;
  }

  public createNewUser(
    firstName: string,
    surname: string,
    birthDate: string,
    password: string,
    gender: string,
    email: string,
    accessLevel: AccessLevelType
  ): IUser {
    const newUser = new User(firstName, surname, birthDate, password, gender, email, accessLevel);
    this.users.push(newUser);
    return newUser;
  }

  public changeUserAccessLevel(admin: IUser, user: IUser, newAccessLevel: AccessLevelType): void {
    user.changeAccessLevel(admin, user, newAccessLevel, this.users);
  }

  public changeUserPassword(admin: IUser, user: IUser, newPassword: string): void {
    user.changeUserPassword(admin, user, newPassword, this.users);
  }
}

export default App;
