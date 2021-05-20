import aggregateIntoChunks from "../../../tasks/module1/task1/index";
import { alphabet } from "../../../tasks/module1/task1/example";

describe("Aggregate into chunks tests", () => {
  describe("When invalid arguments are give", () => {
    it("Shoud throw Error because array is too short", () => {
      expect(() => aggregateIntoChunks([1, 2, 3])).toThrowError("Array is too short");
    });
  });

  describe("When valid arguments are given", () => {
    it("Each chunk should have 4 to 7 elements", () => {
      const result = aggregateIntoChunks(alphabet);

      result.map((value) => {
        expect(value.length).toBeGreaterThanOrEqual(4);
        expect(value.length).toBeLessThanOrEqual(7);
      });
    });
  });
});
