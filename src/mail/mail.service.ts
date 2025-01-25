import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
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
}
