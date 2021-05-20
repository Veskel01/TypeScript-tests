type AllowedTypes = string | number | Date;

function getMyAge(input: AllowedTypes): number {
  const compareInput: Date = new Date(input.toString());
  if (compareInput.getFullYear() > new Date().getFullYear()) {
    throw new Error("You can't be from future");
  } else if (compareInput.getFullYear() <= 1880) {
    throw new Error("You can't be that old");
  } else if (compareInput.getFullYear() === new Date().getFullYear()) {
    throw new Error("Were you born this year?");
  } else if (Number.isNaN(compareInput.valueOf())) {
    throw new Error("Input cannot be NaN");
  }
  if (typeof input === "string") {
    const birthDate: Date = new Date(input);
    const today: number = Date.now() - birthDate.getTime();
    const ageDate: Date = new Date(today);
    const result: number = Math.abs(ageDate.getFullYear() - 1970);
    return result;
  } else if (typeof input === "number") {
    const ageMS: number = Date.parse(Date()) - Date.parse(input.toString());
    const age: Date = new Date();
    age.setTime(ageMS);
    const result: number = age.getFullYear() - 1970;
    return result;
  } else if (Object.prototype.toString.call(input) === "[object Date]") {
    const today: number = Date.now() - input.getTime();
    const ageDate: Date = new Date(today);
    const result: number = Math.abs(ageDate.getFullYear() - 1970);
    return result;
  } else {
    throw new Error("Invalid date");
  }
}

export default getMyAge;
