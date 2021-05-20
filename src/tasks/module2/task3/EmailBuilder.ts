import Email, { IEmail } from "./Email";
import {
  throwErrorOnInvalidEmail,
  throwErrorOnInvalidHTML,
  throwErrorOnInvalidTitle,
} from "./helpers";

const errorHandler = (error: string) => {
  throw new Error(error);
};

interface IEmailBuilder {
  setSendEmailFrom: (from: string) => this;
  setSendEmailTo: (to: string) => this;
  setEmailCC: (carbonCopy: string) => this;
  setEmailBCC: (blindCarbonCopy: string) => this;
  setEmailTitle: (title: string) => this;
  setHTML: (HTML: string) => this;
  build: () => IEmail;
}

class EmailBuilder implements IEmailBuilder {
  private _email: IEmail;
  constructor() {
    this._email = {
      from: "",
      to: "",
      cc: [],
      bcc: [],
      title: "",
      HTML: "",
    };
  }

  public setSendEmailFrom(from: string): this {
    this._email.from = from;
    return this;
  }

  public setSendEmailTo(to: string): this {
    this._email.to = to;
    return this;
  }

  public setEmailCC(carbonCopy: string): this {
    this._email.cc = [];
    if (!this._email.cc.includes(carbonCopy)) {
      this._email.cc.push(carbonCopy);
    }
    return this;
  }

  public setEmailBCC(blindCarbonCopy: string): this {
    this._email.bcc = [];
    if (!this._email.bcc.includes(blindCarbonCopy)) {
      this._email.bcc.push(blindCarbonCopy);
    }
    return this;
  }

  public setEmailTitle(title: string): this {
    this._email.title = title;
    return this;
  }

  public setHTML(HTML: string): this {
    this._email.HTML = HTML;
    return this;
  }

  public build(): IEmail {
    throwErrorOnInvalidEmail(this._email.from);
    throwErrorOnInvalidEmail(this._email.to);
    if (this._email.cc) {
      this._email.cc.forEach((carbonCoby) => throwErrorOnInvalidEmail(carbonCoby));
    }
    if (this._email.bcc) {
      this._email.bcc.forEach((blindCarbonCopy) => throwErrorOnInvalidEmail(blindCarbonCopy));
    }
    throwErrorOnInvalidTitle(this._email.title);
    throwErrorOnInvalidHTML(this._email.HTML);
    const email: IEmail = new Email(
      this._email.from,
      this._email.to,
      this._email.title,
      this._email.HTML,
      this._email.cc,
      this._email.bcc
    );
    return email;
  }
}

export default EmailBuilder;
