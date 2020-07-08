import nodemailer, {SentMessageInfo} from 'nodemailer';
import {MailOptions} from 'nodemailer/lib/json-transport';
import Mail from 'nodemailer/lib/mailer';
import {CannotSendEmail} from '../utils/errors';
import {confirmationEmailHtml} from '../utils/confirmationEmailHtml';

export class EmailService {
  private transporter: Mail;
  constructor(emailAddress: string, emailPassword: string) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailAddress,
        pass: emailPassword,
      },
    });
  }

  async sendMail(mailOptions: MailOptions): Promise<SentMessageInfo> {
    try {
      return await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new CannotSendEmail(error.message);
    }
  }

  async sendConfirmationMail(email: string, code: string): Promise<SentMessageInfo> {
    const mailOptions = {
      from: 'UniLogin <noreply.confirmation@unilogin.io>',
      to: email,
      subject: 'Email Confirmation',
      text: `To make sure your UniLogin account is safe and secure,
      we ask you to authenticate your email address by copying the code below and pasting it in UniLogin.
      Here is your confrimation code: ${code}`,
      html: confirmationEmailHtml(code),
      replyTo: 'noreply.confirmation@unilogin.io',
    };
    return this.sendMail(mailOptions);
  }
}
