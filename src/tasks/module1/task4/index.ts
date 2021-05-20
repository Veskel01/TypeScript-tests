type ResultTuple = [number, string];

function findPharseInArray(array: string[], wordToSearch: string): string | ResultTuple[] {
  const length: number = array.length;
  if (length < 1) {
    throw new Error("Array is too short");
  }
  if (wordToSearch.length < 1) {
    throw new Error("Word to search is too short. Min. length = 1");
  }
  if (!Array.isArray(array)) {
    throw new Error("Given value is not an array!");
  }

  const initialResult: ResultTuple[] = [];

  array.filter((value: string, index: number) => {
    if (value.includes(wordToSearch)) {
      initialResult.push([index, value]);
    }
  });
  return initialResult.length >= 1 ? initialResult : `${wordToSearch} does not occur in array`;
}

export default findPharseInArray;
