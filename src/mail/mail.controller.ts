import { Controller, Post, Body, BadRequestException, Get } from '@nestjs/common';
import { MailService } from './mail.service';
// import commentTemplate from './templates/commentNotification'; 
import { InterviewController } from '../interview/interview.controller';

@Controller('mail') // Defines the base route as /mail
export class MailController {
  constructor(private readonly mailService: MailService) {}

  
  /**
   * Sends a general notification email.
   */
  @Post('send-notification')
  async sendNotification(@Body() body: { to: string; subject: string; message: string }) {
    const { to, subject, message } = body;

    if (!to || !subject || !message) {
      throw new BadRequestException('Missing required fields (to, subject, message)');
    }

    return this.mailService.sendNotificationEmail(to, "name", "userName", "link", "message");
  }

  /**
   * Sends an interview reminder email.
   */
  @Post('send-interview-reminder')
  async sendInterviewReminder(
    @Body() body: { to: string; interviewTime: string, recipientName: string, interviewLink: string, interviewDate: string }
  ) {
    const { to, interviewTime, recipientName, interviewLink, interviewDate } = body;

    if (!to || !interviewTime || !recipientName || !interviewLink || !interviewDate) {
      throw new BadRequestException(
        'Missing required fields (to, interviewTime, recipientName, interviewLink, interviewDate) instead got: ' + JSON.stringify(body)
      );    }

    return this.mailService.sendInterviewReminderEmail(to, interviewTime, interviewDate, recipientName, interviewLink);
  }

  /**
   * Sends an interview rejection email.
   */
  @Post('send-interview-rejection')
  async sendInterviewRejection(
    @Body() body: { email, userName: string; recipientName: string}
  ) {
    const { email, recipientName, userName } = body;

    if (!email || !userName || !recipientName) {
      throw new BadRequestException(
        'Missing required fields (email, userName, recipientName) instead got: ' + JSON.stringify(body)
      );    }

    return this.mailService.sendRejectInterviewNotification(email, userName, recipientName);
  }

  /**
   * Sends an OTP email for verification.
   */
  @Post('send-otp')
  async sendOtp(@Body() body: { email: string }) {
    const { email } = body;

    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.mailService.sendOtpEmail(email, otp);

    return { success: true, message: 'OTP sent successfully', otp };
  }

  /**
   * Sends an email notification for a comment.
   */
  @Post('send')
  async sendEmail(@Body() body: { email: string; username: string; commenter: string; comment: string; link: string }) {
    const { email, username, commenter, comment, link } = body;

    try {
      await this.mailService.sendNotificationEmail(
        email,
        commenter,
        commentTemplate({  username, commenter, comment, link }),
        comment,
        link,
      );
      return { message: 'Email sent successfully' };
    } catch (error) {
      return { message: 'Error sending email', error: error.message };
    }
  }
}
function commentTemplate(arg0: { username: string; commenter: string; comment: string; link: string; }): string {
  throw new Error('Function not implemented.');
}

