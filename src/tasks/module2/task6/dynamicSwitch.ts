interface ISwitch {
  cases: caseTuple[];
  add: (condition: boolean, onErrorCallback: () => void) => void;
  isValid: () => boolean | undefined;
}

const errorHandler = (error: string): void => {
  throw new Error(error);
};

type caseTuple = [boolean, () => void];

class Switch implements ISwitch {
  public cases: caseTuple[];
  constructor() {
    this.cases = [];
  }

  public add(condition: boolean, onErrorCallback: () => void): void {
    const caseTuple: caseTuple = [condition, onErrorCallback];
    this.cases.push(caseTuple);
  }

  public isValid(): boolean | undefined {
    if (this.cases.length === 0) {
      errorHandler(`Array of cases is empty`);
    } else {
      for (let i: number = 0; i < this.cases.length; i++) {
        const caseCondition: boolean = this.cases[i][0];
        const caseCallback: () => void = this.cases[i][1];
        this.cases.splice(i);
        if (caseCondition == true) {
          caseCallback();
          return false;
        }
        return true;
      }
    }
  }
}

export default Switch;
