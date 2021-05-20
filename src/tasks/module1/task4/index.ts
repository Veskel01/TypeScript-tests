type ResultTuple = [number, string];

function findPharseInArray(array: string[], wordToSearch: string): ResultTuple[] {
  const length: number = array.length;
  if (length < 1) {
    throw new Error('Array is too short');
  }
  if (wordToSearch.length < 1) {
    throw new Error('Word to search is too short');
  }

  const initialResult: ResultTuple[] = [];
  array.filter((value: string, index: number) => {
    const regExp: RegExp = new RegExp(wordToSearch);
    if (value.match(regExp)) {
      initialResult.push([index, value]);
    }
  });
  if (initialResult.length < 1) {
    throw new Error(`${wordToSearch} does not occur in array`);
  }
  return initialResult;
}

export default findPharseInArray;
