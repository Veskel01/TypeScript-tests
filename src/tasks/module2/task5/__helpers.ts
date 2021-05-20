import is from "is_js";

const errorHandler = (error: string): void => {
  throw new Error(error);
};

// name and surname validation

export const throwErrorOnInvalidName = (name: string): void => {
  if (is.empty(name)) {
    errorHandler("First name cannot be empty");
  }
};

// gender validation;

type GenderTypes = "male" | "female" | string;

export const throwErrorOnInvalidGender = (gender: GenderTypes): void => {
  const genders: GenderTypes[] = ["male", "female"];
  if (!genders.includes(gender)) {
    errorHandler("Allowed genders: male,female");
  }
};

// email validation

type TypesForIfInEmailPasswordOrName = void | boolean;

export const throwErrorOnInvalidEmail = (email: string): TypesForIfInEmailPasswordOrName => {
  if (is.not.email(email)) {
    errorHandler("Invalid email");
  }
};

// password validation

export const throwErrorOnInvalidPassword = (password: string): boolean => {
  const regExpForPassword: RegExp = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}/;
  if (!password.match(regExpForPassword)) {
    errorHandler("Invalid password");
  }
  return true;
};

// birthday validation

export const throwErrorOnInvalidBirthDate = (birthDate: string): void => {
  if (
    Object.prototype.toString.call(new Date(birthDate)) !== "[object Date]" ||
    Number.isNaN(new Date(birthDate).getTime())
  ) {
    errorHandler("Invalid Date");
  } else if (is.future(new Date(birthDate))) {
    errorHandler("You can't be from the future");
  } else if (new Date(birthDate).getFullYear() <= 1880) {
    errorHandler("You can't be that old");
  }
};

export type AccessLevelType = "user" | "admin";
