import Switch, { ISwitch } from '../../../tasks/module2/task6/dynamicSwitch';

describe('Dynamic Switch tests', () => {
  let dynamicSwitch: ISwitch;
  beforeEach(() => {
    dynamicSwitch = new Switch();
  });
  describe('When invalid arguments are provided', () => {
    it(' - Should Throws an error if array of cases is empty', () => {
      expect(() => dynamicSwitch.isValid()).toThrowError('Array of cases is empt');
    });
  });

  describe('When valid arguments are provided', () => {
    it(' - Method should add case to casess array', () => {
      const name: string = 'Osborne';
      const callback: number = 123;
      const condition: boolean = name.length > 3;

      dynamicSwitch.add(condition, () => callback);

      const [cases] = dynamicSwitch.cases;

      expect(cases).toContain(condition);
      expect(cases[0]).toBeTruthy();
    });

    it(' - Method should execute callback fn', () => {
      const callbackValueArray: boolean[] = [];
      const expectedResult: boolean[] = [true];
      const name: string = 'Wava';
      const condition: boolean = name.length > 2;

      dynamicSwitch.add(condition, () => {
        callbackValueArray.push(condition);
      });
      dynamicSwitch.isValid();

      expect(callbackValueArray).toStrictEqual(expectedResult);
    });

    it(' - Method should removes conditions from cases array', () => {
      const name: string = 'Allene';
      const firstCondition: boolean = name.length > 2;
      const secondCondition: boolean = name.length > 3;
      dynamicSwitch.add(firstCondition, () => console.log(firstCondition));
      dynamicSwitch.add(secondCondition, () => console.log(secondCondition));
      const casesLengthBefore: number = dynamicSwitch.cases.length;
      dynamicSwitch.isValid();

      expect(dynamicSwitch.cases.length).not.toStrictEqual(casesLengthBefore);
      expect(dynamicSwitch.cases).toHaveLength(0);
    });

    it(' - Method should return false is every condition is truthy', () => {
      const condition: boolean = true;
      const callback: number = 123;
      dynamicSwitch.add(condition, () => callback);
      const secondCondition: boolean = true;
      dynamicSwitch.add(secondCondition, () => callback);
      expect(dynamicSwitch.isValid()).toBeFalsy();
    });

    it(' - Method should return true if any condition is falsy', () => {
      const falsyCondition: boolean = false;
      const truthyCondition: boolean = false;
      const callback: number = 123;
      dynamicSwitch.add(falsyCondition, () => callback);
      dynamicSwitch.add(truthyCondition, () => callback);

      expect(dynamicSwitch.isValid()).toBeTruthy();
    });
  });
});
