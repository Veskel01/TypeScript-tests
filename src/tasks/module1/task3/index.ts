// typ generyczny
function filterWith<T, U>(array: U, filter: T): T[] {
  if (!Array.isArray(array)) {
    throw new Error("You must enter as the first argument an array");
  }
  if (typeof filter !== "string" || (typeof filter !== "number" && filter.length < 2)) {
    return [];
  }
  const result = array.filter((item: T) => {
    for (const value of Object.values(item)) {
      if (typeof value === "string" && value === filter) {
        return item;
      } else if (typeof value === "number" && value.toString() === filter) {
        return item;
      } else if (typeof value === "object") {
        if (value.some((valueInArray: T) => valueInArray === filter)) {
          return item;
        } else {
          const secondResult: T[] = filterWith(value, filter);
          if (secondResult.some((valueInObject: T) => valueInObject)) {
            return item;
          }
        }
      }
    }
  });
  return result;
}

export default filterWith;
