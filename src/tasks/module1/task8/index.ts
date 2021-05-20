export default function isRectangularTriangle(x1: number, x2: number, x3: number): string {
  const [a, b, c]: number[] = [x1, x2, x3].sort((n1: number, n2: number) => n1 - n2);
  if (Number.isNaN(a) || Number.isNaN(b) || Number.isNaN(c)) {
    throw new Error("Invalid number");
  }
  if (a <= 0) {
    throw new Error("One of triangle sides may be less or equal to 0");
  }
  const checkIfTriangleCanBeBuild: boolean = a + b > c;
  if (!checkIfTriangleCanBeBuild) {
    throw new Error("Smaller sides cannot be shorter than the longer one");
  }
  const triangleCanBeBuild: boolean = a ** 2 + b ** 2 === c ** 2;
  return triangleCanBeBuild === true ? "Triangle can be build with these sides" : "Triangle cannot be build";
}
