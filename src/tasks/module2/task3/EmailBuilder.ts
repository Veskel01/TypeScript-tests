import Email, { IEmail } from './Email';
import { throwErrorOnInvalidEmail, throwErrorOnInvalidHTML, throwErrorOnInvalidTitle } from './helpers';

export interface IEmailBuilder {
  setSendEmailFrom: (from: string) => this;
  setSendEmailTo: (to: string) => this;
  setEmailCC: (carbonCopy: string | string[]) => string[];
  setEmailBCC: (blindCarbonCopy: string | string[]) => string[];
  setEmailTitle: (title: string) => this;
  setHTML: (HTML: string) => this;
  build: () => IEmail;
}

class EmailBuilder implements IEmailBuilder {
  private _email: IEmail;
  constructor() {
    this._email = {
      from: '',
      to: '',
      cc: [],
      bcc: [],
      title: '',
      HTML: '',
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

  public setEmailCC(carbonCopy: string | string[]): string[] {
    const emails: string[] = this._email.cc as string[];
    if (Array.isArray(carbonCopy)) {
      carbonCopy.map((email: string) => {
        throwErrorOnInvalidEmail(email);
        if (!emails.includes(email)) emails.push(email);
      });
    } else if (typeof carbonCopy === 'string') {
      throwErrorOnInvalidEmail(carbonCopy);
      if (!emails.includes(carbonCopy)) emails.push(carbonCopy);
    }
    return (this._email.cc = emails);
  }

  public setEmailBCC(blindCarbonCopy: string | string[]): string[] {
    const emails: string[] = this._email.bcc as string[];
    if (Array.isArray(blindCarbonCopy)) {
      blindCarbonCopy.map((email: string) => {
        throwErrorOnInvalidEmail(email);
        if (!emails.includes(email)) emails.push(email);
      });
    } else if (typeof blindCarbonCopy === 'string') {
      throwErrorOnInvalidEmail(blindCarbonCopy);
      if (!emails.includes(blindCarbonCopy)) emails.push(blindCarbonCopy);
    }
    return (this._email.bcc = emails);
  }

  public setEmailTitle(title: string): this {
    this._email.title = title;
    return this;
  }

  public setHTML(HTML: string): this {
    throwErrorOnInvalidHTML(HTML);
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
