//map function
//brak typowanie reduce
export function mapFn<T, U>(array: T[], callback: (currentValue: T, index: number, array: T[]) => U): U[] {
  const result: U[] = [];
  array.reduce((acc: T, current: T, index: number, array: T[]) => {
    result.push(callback(current, index, array));
    return acc;
  });
  return result;
}

//filter function

export function filterFn<T, U>(array: T[], callback: (value: T, index: number, array: T[]) => U): T[] {
  const result: T[] = [];
  array.reduce((acc: T, current: T, index: number, array: T[]) => {
    if (callback(current, index, array)) {
      result.push(current);
    }
    return acc;
  });
  return result;
}

// //every function

export function everyFn<T, U>(array: T[], callback: (value: T, index: number, array: T[]) => U): boolean {
  const copyArray: T[] = [...array];
  return Boolean(
    copyArray.reduce((acc: boolean, current: T, index: number, arr: T[]) => {
      if (!callback(current, index, arr)) {
        return false;
      } else {
        return true;
      }
    }, false)
  );
}

// //some Function

export function someFn<T, U>(array: T[], callback: (value: T, index: number, array: T[]) => U): boolean {
  const copiedArray: T[] = [...array];
  return Boolean(
    copiedArray.reduce((acc: boolean, current: T, index: number, arr: T[]) => {
      if (callback(current, index, arr)) {
        return true;
      } else {
        return false;
      }
    }, false)
  );
}
