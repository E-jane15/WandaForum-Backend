// import { Injectable, Logger } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { MailerService } from '@nestjs-modules/mailer';
// import { format, differenceInMinutes } from 'date-fns';

// @Injectable()
// export class InterviewService {
//   private readonly logger = new Logger(InterviewService.name);

//   constructor(
//     private prisma: PrismaService,
//     private mailerService: MailerService,
//   ) {}

//   @Cron(CronExpression.EVERY_MINUTE) // Runs every minute to check for reminders
//   async sendInterviewReminders() {
//     const now = new Date();
//     const interviews = await this.prisma.interview.findMany();

//     for (const interview of interviews) {
//       const interviewTime = new Date(interview.interviewDate);
//       const timeDiffMinutes = differenceInMinutes(interviewTime, now);

//       if (timeDiffMinutes === 1440 || timeDiffMinutes === 60) {
//         // ==================1440 min = 24 hours, 60 min = 1 hour====================
//         await this.sendReminderEmail(interview.userEmail, interviewTime);
//       }
//     }
//   }

//   private async sendReminderEmail(userEmail: string, interviewTime: Date) {
//     await this.mailerService.sendMail({
//       to: userEmail,
//       subject: 'Interview Reminder',
//       text: `Hi, your interview is scheduled for ${format(interviewTime, 'PPPppp')}. Please be prepared!`,
//     });

//     this.logger.log(`Sent reminder to ${userEmail}`);
//   }
// }

import { Injectable, Logger } from '@nestjs/common';
import { MailerService,} from '@nestjs-modules/mailer';
import { Cron,CronExpression } from '@nestjs/schedule';
import { format } from 'date-fns';


@Injectable()
export class InterviewService {
  private readonly logger = new Logger(InterviewService.name);
    prisma: any;

  constructor(private mailerService: MailerService) {}

  @Cron(CronExpression.EVERY_HOUR) 

  handleCron() {
    this.sendDailyReminders();
  }

  async sendDailyReminders() {
    const recipients = ['recipient1@example.com', 'recipient2@example.com']; // Example list of emails
    const interviewTime = new Date(); // ===================Replace with actual logic to get interview times

    for (const email of recipients) {
      await this.sendInterviewReminderEmail(email, interviewTime);
    }
  }

  async sendInterviewReminderEmail(to: string, interviewTime: Date) {
    const subject = 'Interview Reminder from Wandaforum';
    const formattedTime = format(interviewTime, 'PPPppp');

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
              /* Your styles here */
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
      const errorMessage = (error as Error).message || 'Unknown error occurred';
      this.logger.error(`Failed to send interview reminder to ${to}: ${errorMessage}`);
    }
  }


  async scheduleInterview(userId: string, date: Date) {
    const interview = await this.prisma.interview.create({
      data: { userId, date },
    });
  
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
  
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Interview Scheduled Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #4A90E2;">Interview Scheduled!</h2>
          <p>Hello <strong>${user.email}</strong>,</p>
          <p>Your interview has been successfully scheduled on:</p>
          <p style="font-size: 16px; font-weight: bold; color: #D32F2F;">
            ${date.toLocaleString()} <!-- Formats date nicely -->
          </p>
          <p>Please make sure to be prepared and available.</p>
          <hr>
          <p>Best regards,</p>
          <p><strong>Wandaforum Team</strong></p>
        </div>
      `,
    });
  
    return { message: 'Interview scheduled successfully' };
  }
  
}