import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { generateInterviewReminder } from 'src/emails-templates/interviewReminder';



@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendInterviewReminder(email: string, name: string, date: string, time: string, link: string) {
    const emailContent = generateInterviewReminder(name,email, date, time, link);

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Interview Reminder - Wandaforum',
        html: emailContent, // Use the generated email HTML
      });
      console.log(`Reminder email sent to ${email}`);
    } catch (error) {
      console.error('Error sending reminder email:', error);
    }
  }

  async sendConfirmInterviewEmail(
    recipientEmail: string,
    recipientName: string,
    requesterName: string,
    interviewDate: string,
    interviewTime: string,
    requestId: string, // Unique ID for tracking
  ) {
    const acceptLink = `https://wandaforum.com/api/interview/accept/${requestId}`;
    const rejectLink = `https://wandaforum.com/api/interview/reject/${requestId}`;

    // const emailContent = generateConfirmInterview(
    //   recipientName,
    //   requesterName,
    //   interviewDate,
    //   interviewTime,
    //   acceptLink,
    //   rejectLink
    // );

    try {
      await this.mailerService.sendMail({
        to: recipientEmail,
        subject: 'Interview Request - Wandaforum',
        //html: emailContent, // Use generated email template
      });
      console.log(`Interview request email sent to ${recipientEmail}`);
    } catch (error) {
      console.error('Error sending interview request email:', error);
    }
  }
}
