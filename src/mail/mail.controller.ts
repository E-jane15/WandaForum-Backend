import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail') // Defines the base route as /mail
export class MailController {
  constructor(private readonly mailService: MailService) {}

  /**
   * Sends a general notification email.
   * @param to - Recipient's email address.
   * @param subject - Email subject.
   * @param message - Email message content.
   */
  @Post('send-notification')
  async sendNotification(@Body() body: { to: string; subject: string; message: string }) {
    const { to, subject, message } = body;

    if (!to || !subject || !message) {
      throw new BadRequestException('Missing required fields (to, subject, message)');
    }

    return this.mailService.sendNotificationEmail(to, subject, message);
  }

  /**
   * Sends an interview reminder email.
   * @param to - Recipient's email address.
   * @param interviewTime - The interview time.
   */
  @Post('send-interview-reminder')
  async sendInterviewReminder(@Body() body: { to: string; interviewTime: string }) {
    const { to, interviewTime } = body;

    if (!to || !interviewTime) {
      throw new BadRequestException('Missing required fields (to, interviewTime)');
    }

    return this.mailService.sendInterviewReminderEmail(to, interviewTime);
  }

  /**
   * Sends an OTP email for verification.
   * @param email - Recipient's email address.
   */
  @Post('send-otp')
  async sendOtp(@Body() body: { email: string }) {
    const { email } = body;

    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    await this.mailService.sendOtpEmail(email, otp);

    return { success: true, message: 'OTP sent successfully', otp };
  }
}
