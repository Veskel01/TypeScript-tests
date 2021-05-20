import names from "./firstNames";
import secondNames from "./secondNames";

//random Country
export function getoneOfRandomCountry(): string {
  const array: string[] = ["PL", "UK", "USA"];
  const randomNumber: number = Math.floor(Math.random() * array.length);
  const length: number = array.length;
  let result: string = "";
  for (let i: number = 0; i < length; i++) {
    if (i === randomNumber) {
      result = array[i];
    }
  }
  return result;
}

//random Age
export function getRandomAge(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//random PhoneNumber
export function getRandomPhoneNumber(): number {
  const numberLength: number = 9;
  const result: number = ((Math.random() * 9 + 1) * Math.pow(10, numberLength - 1), 10);
  return result;
}

//random firstName
let name: string;
export function getRandomName(): string {
  const array: string[] = names;
  name = array[(array.length * Math.random()) | 0];
  return name;
}

//random secondName

let secondName: string;

export function getRandomSecondName(): string {
  const array: string[] = secondNames;
  secondName = array[(array.length * Math.random()) | 0];
  return secondName;
}

//email

export function getEmail(): string {
  const firstNameInMail: string = name;
  const secondNameInMail: string = secondName;
  const email: string = `${firstNameInMail}.${secondNameInMail}@email.com`;
  return email;
}
