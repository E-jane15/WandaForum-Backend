import { Injectable,Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as nodemailer from 'nodemailer';
import { format } from 'date-fns';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name); // Define logger here
  sendMail: any;
  constructor(private readonly mailerService: MailerService) {}

  /**
   * Sends an email notification
   * @param to 
   * @param subject 
   * @param message 
   */
  async sendNotificationEmail(to: string, subject: string, message: string) {
    
    try {
      await this.mailerService.sendMail({
        to, 
        subject, 
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f9f9f9;
              }
              .container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                text-align: center;
                background-color: #4caf50;
                color: white;
                padding: 10px 0;
                font-size: 20px;
                font-weight: bold;
                border-radius: 8px 8px 0 0;
              }
              .content {
                font-size: 16px;
                line-height: 1.5;
                color: #333333;
                margin: 20px 0;
              }
              .footer {
                margin-top: 20px;
                text-align: center;
                font-size: 12px;
                color: #777777;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                Interview Platform Notification
              </div>
              <div class="content">
                <p>${message}</p>
              </div>
              <div class="footer">
                <p>Thank you for using our platform!</p>
                <p>&copy; ${new Date().getFullYear()} Interview Platform</p>
              </div>
            </div>
          </body>
          </html>
        `,
      });
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
  
/**
   * Generates a 6-digit OTP
   * @returns - A 6-digit OTP as a string
   */
private generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * 
 * @param email for interview reminder 
 * @param timeLeft 
 */
async sendInterviewReminderEmail(to: string, interviewTime: Date) {
  const subject = 'Interview Reminder from Wandaforum';
  const formattedTime = format(interviewTime, 'PPPppp'); // Format the date

  const message = `
    Hi there,<br><br>
    This is a friendly reminder that your interview is scheduled for <strong>${formattedTime}</strong>. 
    Please make sure to be prepared and available at that time.<br><br>
    If you have any questions or need to reschedule, feel free to reach out to us.<br><br>
    Best regards,<br>
    The Wandaforum Team
  `;

  try {
    await this.mailerService.sendMail({
      to,
      subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f9f9f9;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              background-color:rgb(168, 25, 173);
              color: white;
              padding: 10px 0;
              font-size: 20px;
              font-weight: bold;
              border-radius: 8px 8px 0 0;
            }
            .content {
              font-size: 16px;
              line-height: 1.5;
              color: #333333;
              margin: 20px 0;
            }
            .footer {
              margin-top: 20px;
              text-align: center;
              font-size: 12px;
              color: #777777;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              Wandaforum Interview Reminder
            </div>
            <div class="content">
              <p>${message}</p>
            </div>
            <div class="footer">
              <p>Thank you for using Wandaforum!</p>
              <p>&copy; ${new Date().getFullYear()} Wandaforum</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    this.logger.log(`Sent interview reminder to ${to}`);
    } catch (error) {
      // Type assertion to Error
      const errorMessage = (error as Error).message || 'Unknown error occurred';
      this.logger.error(`Failed to send interview reminder to ${to}: ${errorMessage}`);
    }
  }

/**
 * Sends an OTP email for email verification
 * @param email - Recipient email address
 * @param otp - The OTP to send
 */
async sendOtpEmail(email: string, otp: string): Promise<string> {
  try {
    await this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL_USER, // Sender email address
      subject: 'Verify Your Email',
      text: `Your OTP for email verification is: ${otp}`,
    });
    return otp;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
}
}

