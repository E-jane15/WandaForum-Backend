import { Controller, Post, Body, BadRequestException, Get } from '@nestjs/common';
import { MailService } from './mail.service';
// import commentTemplate from './templates/commentNotification'; 
import { InterviewController } from '../interview/interview.controller';

@Controller('mail') // Defines the base route as /mail
export class MailController {
  constructor(private readonly mailService: MailService) {}
//welcome 
@Post('send-welcome-email')
async sendWelcomeEmail(
  @Body() body: { email: string; userName: string }
) {
  const { email, userName } = body;

  if (!email || !userName) {
    throw new BadRequestException(
      `Missing required fields (email, userName), received: ${JSON.stringify(body)}`
    );
  }

  await this.mailService.sendWelcomeEmail(email, userName);
  return { success: true, message: `Welcome email sent to ${email}` };
}
  
  /**
   * Sends a general notification email.
   */
  // @Post('send-notification')
  // async sendNotification(@Body() body: { to: string; subject: string; message: string }) {
  //   const { to, subject, message } = body;

  //   if (!to || !subject || !message) {
  //     throw new BadRequestException('Missing required fields (to, subject, message)');
  //   }

  //   return this.mailService.sendNotificationEmail(to, "name", "userName", "link", "message");
  // }
  @Post('send-forgot-password')
  async sendForgotPasswordEmail(
    @Body() body: { to: string; userName: string; resetLink: string }
  ) {
    const { to, userName, resetLink } = body;

    if (!to || !userName || !resetLink) {
      throw new BadRequestException(
        'Missing required fields (to, userName, resetLink). Received: ' + JSON.stringify(body)
      );
    }

    return this.mailService.sendForgotPasswordEmail(to, userName, resetLink);
  }

  // confirm availability 
  @Post('send-availability-confirmation')
async sendAvailabilityConfirmation(
  @Body() body: { email: string; name: string; startTime: string; endTime: string },
) {
  const { email, name, startTime, endTime } = body;

  // Validate required fields
  if (!email || !name || !startTime || !endTime) {
    throw new BadRequestException(
      `Missing required fields (email, name, startTime, endTime). Received: ${JSON.stringify(body)}`,
    );
  }

  // Call the service to send the email
  return this.mailService.sendAvailabilityConfirmation(email, name, startTime, endTime);
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

//feedback 
@Post('send-interview-feedback')
async sendInterviewFeedback(
  @Body() body: { email: string; userName: string; interviewDate: string; feedbackLink: string }
) {
  const { email, userName, interviewDate, feedbackLink } = body;

  if (!email || !userName || !interviewDate || !feedbackLink) {
    throw new BadRequestException(
      `Missing required fields (email, userName, interviewDate, feedbackLink). Received: ${JSON.stringify(body)}`
    );
  }

  return this.mailService.sendInterviewFeedbackEmail(email, userName, interviewDate, feedbackLink);
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

    return this.mailService.sendInterviewRejection(email, userName, recipientName);
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

  // cancel
  @Post('send-cancel-availability')
  async sendCancelAvailabilityEmail(
    @Body() body: { userEmail: string; userName: string },
  ) {
    const { userEmail, userName } = body;

    // Validate request body
    if (!userEmail || !userName) {
      throw new BadRequestException(
        `Missing required fields (userEmail, userName), received: ${JSON.stringify(body)}`
      );
    }

    // Call the mail service to send the email
    const response = await this.mailService.sendCancelAvailabilityEmail(userEmail, userName);
    return response;
  }

  //forgot password 
  // @Post('send-forgot-password')
  // async sendForgotPasswordEmail(@Body() body: { email: string; userName: string; resetLink: string }) {
  //   return this.mailService.sendForgotPasswordEmail(body.email, body.userName, body.resetLink);
  // }

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

