const paginateArray = <T>(dataEntries: T[], pageIndex: number, elementsOnPage: number): T[] => {
  const length: number = dataEntries.length;
  if (Number.isNaN(pageIndex) || Number.isNaN(elementsOnPage)) {
    throw new Error("Number of pageIndex or elementsOnPage cannot be NaN");
  }
  if (dataEntries.lastIndexOf(dataEntries[length - 1]) < pageIndex) {
    throw new Error("Index to pagination is greater than the indexes of the array");
  }
  if (length < elementsOnPage) {
    throw new Error("Elements in array are shorter than the elements needed");
  }
  if (pageIndex * elementsOnPage >= dataEntries.length) {
    throw new Error("The array does not contain enough elements for pagination");
  }
  if (length < 1) {
    throw new Error("Array cannot be empty");
  }
  if (pageIndex < 0) {
    throw new Error("Pagination index starts with 0");
  }
  const copied: T[] = [...dataEntries];
  const start: number = pageIndex * elementsOnPage;
  const end: number = (pageIndex + 1) * elementsOnPage;
  const result: T[] = copied.slice(start, end);
  return result;
};

export default paginateArray;
