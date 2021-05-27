import EmailBuilder, { IEmailBuilder } from '../../../tasks/module2/task3/EmailBuilder';

describe('EmailBuilder tests', () => {
  let emailBuilder: IEmailBuilder;
  beforeEach(() => {
    emailBuilder = new EmailBuilder();
  });
  describe('When invalid arguments are provided', () => {
    it(' - Should Throws an error if invalid email from whom is invalid', () => {
      const invalidEmails: string[] = ['123', '', 'test@', 'test123'];
      invalidEmails.map((invalidEmail) => {
        emailBuilder.setSendEmailFrom(invalidEmail);
        expect(() => emailBuilder.build()).toThrowError('Invalid email address');
      });
    });

    it(' - Should Throws an error if invalid email to whom is invalid', () => {
      const invalidEmails: string[] = ['123', '', 'test@', 'test123'];
      invalidEmails.map((invalidEmail) => {
        expect(() => emailBuilder.setEmailCC(invalidEmail)).toThrowError('Invalid email address');
      });
    });

    it(' - Should Throws an error if invalid carbon copy provided', () => {
      const invalidEmails: string[] = ['123', '', 'test@', 'test123'];
      invalidEmails.map((invalidEmail) => {
        expect(() => emailBuilder.setEmailCC(invalidEmail)).toThrowError('Invalid email address');
      });
    });

    it(' - Should Throws an Error if email to whom is not provided', () => {
      const emailTo: string = 'Jimmie45@yahoo.com';
      const title: string = 'title';
      emailBuilder.setSendEmailTo(emailTo);
      emailBuilder.setEmailTitle(title);
      expect(() => emailBuilder.build()).toThrowError('Invalid email address');
    });

    it(' - Should Throws an Error if email from is not provided', () => {
      const emailFrom: string = 'Jimmie45@yahoo.com';
      const title: string = 'title';
      emailBuilder.setSendEmailFrom(emailFrom);
      emailBuilder.setEmailTitle(title);
      expect(() => emailBuilder.build()).toThrowError('Invalid email address');
    });

    it(' - Should Throws an error if invalid blind carbon copy provided', () => {
      const invalidEmails: string[] = ['123', '', 'test@', 'test123'];
      invalidEmails.map((invalidEmail) => {
        expect(() => emailBuilder.setEmailBCC(invalidEmail)).toThrowError('Invalid email address');
      });
    });

    it(' - Should Throws an Error if invalid title is provided', () => {
      const emailFrom: string = 'Mikayla_Weissnat17@hotmail.com';
      const emailTo: string = 'Daron.Littel@gmail.com';
      const invalidTitle: string = '';
      emailBuilder.setSendEmailFrom(emailFrom);
      emailBuilder.setSendEmailTo(emailTo);
      emailBuilder.setEmailTitle(invalidTitle);
      expect(() => emailBuilder.build()).toThrowError('Tittle cannot be empty');
    });

    it(' - Should Throws an Error if invalid HTML is provided', () => {
      const emailFrom: string = 'Uriel53@hotmail.com';
      const emailTo: string = 'Jonathon8@hotmail.com';
      const title: string = 'Title';
      const emailHTML: string = '';
      emailBuilder.setSendEmailFrom(emailFrom);
      emailBuilder.setSendEmailTo(emailTo);
      emailBuilder.setEmailTitle(title);
      expect(() => emailBuilder.setHTML(emailHTML)).toThrowError('Invalid HTML code');
    });
  });

  describe('When valid arguments are provided', () => {
    it(' - Should create email with provided data', () => {
      const emailFrom: string = 'Josue.Yundt@hotmail.com';
      const emailTo: string = 'Cristian_Runte47@gmail.com';
      const emailTitle: string = 'Title';

      emailBuilder.setSendEmailFrom(emailFrom);
      emailBuilder.setSendEmailTo(emailTo);
      emailBuilder.setEmailTitle(emailTitle);

      const email = emailBuilder.build();
      expect(email.from).toStrictEqual(emailFrom);
      expect(email.to).toStrictEqual(emailTo);
      expect(email.title).toStrictEqual(emailTitle);
    });

    it(' - Should add many carbon copies', () => {
      const emailFrom: string = 'Josue.Yundt@hotmail.com';
      const emailTo: string = 'Cristian_Runte47@gmail.com';
      const emailTitle: string = 'Title';
      const carbonCopies: string[] = [
        'Sylvan1@hotmail.com',
        'Scotty_Hettinger54@hotmail.com',
        'Evalyn_Stiedemann@yahoo.com',
      ];

      emailBuilder.setSendEmailFrom(emailFrom);
      emailBuilder.setSendEmailTo(emailTo);
      emailBuilder.setEmailTitle(emailTitle);
      emailBuilder.setEmailCC(carbonCopies);
      const email = emailBuilder.build();

      expect(email.cc).toStrictEqual(carbonCopies);
    });

    it(' - Should add many blind carbon copies', () => {
      const emailFrom: string = 'Josue.Yundt@hotmail.com';
      const emailTo: string = 'Cristian_Runte47@gmail.com';
      const emailTitle: string = 'Title';
      const blindCarbonCopies: string[] = [
        'Berniece73@yahoo.com',
        'August_Carroll@gmail.com',
        'Dorothy.Lakin@hotmail.com',
        'Adell76@hotmail.com',
      ];
      emailBuilder.setSendEmailFrom(emailFrom);
      emailBuilder.setSendEmailTo(emailTo);
      emailBuilder.setEmailTitle(emailTitle);
      emailBuilder.setEmailBCC(blindCarbonCopies);
      const email = emailBuilder.build();

      expect(email.bcc).toStrictEqual(blindCarbonCopies);
    });

    it(' - Should correctly add HTML field', () => {
      const emailFrom: string = 'Josue.Yundt@hotmail.com';
      const emailTo: string = 'Cristian_Runte47@gmail.com';
      const emailTitle: string = 'Title';
      const emailHTML: string = '<b>Hello World!</b>';

      emailBuilder.setSendEmailFrom(emailFrom);
      emailBuilder.setSendEmailTo(emailTo);
      emailBuilder.setEmailTitle(emailTitle);
      emailBuilder.setHTML(emailHTML);
      const email = emailBuilder.build();

      expect(email.HTML).toStrictEqual(emailHTML);
    });
  });
});
