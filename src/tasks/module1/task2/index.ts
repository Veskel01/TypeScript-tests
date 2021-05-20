export function mapFn<T, U>(array: T[], callback: (value: T, index: number, array: T[]) => U): U[] {
  const result: U[] = [];
  const length: number = array.length;
  if (length < 1) {
    throw new Error('Array length is too short');
  }
  for (let i: number = 0; i < length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}

//filterFn
export function filterFn<T>(array: T[], callback: (value: T, index: number, array: T[]) => boolean): T[] {
  const result: T[] = [];
  const copied: T[] = [...array];
  const length = copied.length;
  if (length < 1) {
    throw new Error('Array is too short');
  }
  for (let i: number = 0; i < length; i++) {
    if (callback(copied[i], i, copied)) {
      result.push(copied[i]);
    }
  }
  return result;
}

export function reduceFn<T, U>(
  array: T[],
  callback: (acc: T extends U ? T : U, prev: T, index: number, array: T[]) => U,
  initialValue?: U
): U {
  const copied: T[] = [...array];
  const length: number = copied.length;

  if (length < 1) {
    throw new Error('Array is empty');
  }

  let i: number = 0;
  let accumulator: any;
  if (initialValue === undefined) {
    accumulator = copied[0];
    i = 1;
  } else {
    accumulator = initialValue;
  }
  for (; i < length; i++) {
    accumulator = callback(accumulator, copied[i], i, copied);
  }
  return accumulator;
}

//reduceRightFn

export function reduceRightFn<T, U>(
  array: T[],
  callback: (accumulator: U, currentValue: T, index: number, array: T[]) => U,
  initialValue?: U
): U {
  if (array.length < 1) {
    throw new Error('Array is empty');
  }
  const copied: T[] = [...array];
  const reverse: T[] = copied.reverse();
  const result = reverse.reduce(callback, initialValue!);
  return result;
}
//everyFN

export function everyFn<T>(
  array: T[],
  callback: (currentValue: T, index: number, array: T[]) => boolean
): boolean {
  const length: number = array.length;
  if (length < 1) {
    throw new Error('Tablica nie może być pusta');
  }
  for (let i: number = 0; i < length; i++) {
    if (!callback(array[i], i, array)) {
      return false;
    }
  }
  return true;
}

//someFn

export function someFn<T, U>(array: T[], callback: (value: T, index: number, array: T[]) => U): boolean {
  const length: number = array.length;
  if (length < 1) {
    throw new Error('Tablica nie może być pusta');
  }
  for (let i: number = 0; i < length; i++) {
    if (i in array && callback(array[i], i, array)) {
      return true;
    }
  }
  return false;
}
