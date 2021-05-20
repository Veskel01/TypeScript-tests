export interface IEmail {
  from: string;
  to: string;
  cc?: string[];
  bcc?: string[];
  title: string;
  HTML: string;
}

class Email implements IEmail {
  public from: string;
  public to: string;
  public cc?: string[];
  public bcc?: string[];
  public title: string;
  public HTML: string;
  constructor(
    from: string,
    to: string,
    title: string,
    HTML: string,
    cc?: string[],
    bcc?: string[]
  ) {
    this.from = from;
    this.to = to;
    this.cc = cc || [];
    this.bcc = bcc || [];
    this.title = title || "";
    this.HTML = HTML || "";
  }
}

export default Email;
