//id
import { v4 as uuidv4 } from 'uuid';
import {
  getRandomName,
  getoneOfRandomCountry,
  getRandomAge,
  getRandomPhoneNumber,
  getRandomSecondName,
  getEmail,
} from './utilities';

//generateHuman function type
type Human = {
  id: string;
  name: string;
  surname: string;
  email: string;
  age: number;
  phoneNumber: number;
  country: string;
};

function generateHuman(): Human {
  const person: Human = {
    id: uuidv4(),
    name: getRandomName(),
    surname: getRandomSecondName(),
    email: getEmail(),
    age: getRandomAge(18, 85),
    phoneNumber: getRandomPhoneNumber(),
    country: getoneOfRandomCountry(),
  };
  return person;
}

export default generateHuman;
