import { v4 as uuidv4 } from 'uuid';
import is from 'is_js';

const arrayOfImages: string[] = [
  'image1',
  'image2',
  'image3',
  'image4',
  'image5',
  'image6',
];

const errorHandler = (error: string): void => {
  throw new Error(error);
};

// throws error if value is empty

const throwErrorOnEmptyValue = <T>(value: T) => {
  if (is.empty(value)) {
    errorHandler('Value cannot be empty');
  }
};

// get random image

const getRandomImage = (images: string[]): string => {
  const length: number = images.length;
  return images[Math.floor(Math.random() * length)];
};

export interface IBook {
  id: string;
  title: string;
  author: string;
  description: string;
  image: string;
}

class Book implements IBook {
  public id: string;
  public title: string;
  public author: string;
  public description: string;
  public image: string;
  constructor(title: string, author: string, description: string) {
    this.id = uuidv4();
    throwErrorOnEmptyValue(title);
    this.title = title;
    throwErrorOnEmptyValue(author);
    this.author = author;
    this.image = getRandomImage(arrayOfImages);
    throwErrorOnEmptyValue(description);
    this.description = description;
  }
}

export default Book;
