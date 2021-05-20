import {
  AccessLevelType,
  throwErrorOnInvalidBirthDate,
  throwErrorOnInvalidEmail,
  throwErrorOnInvalidGender,
  throwErrorOnInvalidName,
  throwErrorOnInvalidPassword,
} from "./__helpers";

const errorHandler = (error: string): void => {
  throw new Error(error);
};

export interface IUser {
  firstName: string;
  surname: string;
  birthDate: string;
  password: string;
  gender: string;
  email: string;
  accessLevel: string;
  changePassword: (newPassword: string) => string;
  changeEmailAddress: (newEmail: string) => string;
  changeAccessLevel: (
    admin: IUser,
    user: IUser,
    newAccessLevel: AccessLevelType,
    arrayOfUsers: IUser[]
  ) => void;
  changeUserPassword: (
    admin: IUser,
    user: IUser,
    newPassword: string,
    arrayOfUsers: IUser[]
  ) => void;
}

class User implements IUser {
  public firstName: string;
  public surname: string;
  public birthDate: string;
  public password: string;
  public gender: string;
  public email: string;
  public accessLevel: string;
  constructor(
    firstName: string,
    surname: string,
    birthDate: string,
    password: string,
    gender: string,
    email: string,
    accessLevel: AccessLevelType
  ) {
    throwErrorOnInvalidName(firstName);
    this.firstName = firstName;
    throwErrorOnInvalidName(surname);
    this.surname = surname;
    throwErrorOnInvalidBirthDate(birthDate);
    this.birthDate = birthDate;
    throwErrorOnInvalidPassword(password);
    this.password = password;
    throwErrorOnInvalidGender(gender);
    this.gender = gender;
    throwErrorOnInvalidEmail(email);
    this.email = email;
    this.accessLevel = accessLevel;
  }

  public changePassword(newPassword: string): string {
    throwErrorOnInvalidPassword(newPassword);
    this.password = newPassword;
    return newPassword;
  }

  public changeEmailAddress(newEmail: string): string {
    throwErrorOnInvalidEmail(newEmail);
    this.email = newEmail;
    return newEmail;
  }

  public changeAccessLevel(
    admin: IUser,
    user: IUser,
    newAccessLevel: AccessLevelType,
    arrayOfUsers: IUser[]
  ): void {
    if (admin.accessLevel === "admin" && arrayOfUsers.includes(user)) {
      if (user.accessLevel === "admin") {
        errorHandler("You cannot change the password of another admin");
      } else {
        user.accessLevel = newAccessLevel;
      }
    } else {
      errorHandler(`Access denied`);
    }
  }

  public changeUserPassword(admin: IUser, user: IUser, newPassword: string, arrayOfUsers: IUser[]) {
    throwErrorOnInvalidPassword(newPassword);
    if (admin.accessLevel === "admin" && arrayOfUsers.includes(admin)) {
      if (user.accessLevel === "admin") {
        errorHandler("You cannot change the password of another admin");
      } else {
        user.password = newPassword;
      }
    } else {
      errorHandler("Access denied!");
    }
  }
}

export default User;
