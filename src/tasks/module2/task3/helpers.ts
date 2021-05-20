import is from "is_js";

const errorHandler = (error: string): void => {
  throw new Error(error);
};

//email validation

export const throwErrorOnInvalidEmail = (email: string): boolean => {
  if (is.empty(email) || is.not.email(email)) {
    errorHandler("Invalid email address");
  }
  return true;
};

// title validation

export const throwErrorOnInvalidTitle = (title: string): boolean => {
  if (is.empty(title)) {
    errorHandler("Tittle cannot be empty");
  }
  return true;
};

// HTML validation

export const throwErrorOnInvalidHTML = (html: string): boolean => {
  if (is.empty(html)) {
    errorHandler("Invalid HTML code");
  }
  return true;
};
