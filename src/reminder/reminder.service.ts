import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ReminderService {
  private readonly logger = new Logger(ReminderService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
  ) {}

  // Fetch all reminders
  async getAllReminders() {
    return this.prisma.interview.findMany({
      where: { confirmed: true },
    });
  }

  // Fetch a reminder by interview ID
  async getReminderByInterviewId(interviewId: string) {
    return this.prisma.interview.findUnique({
      where: { id: interviewId },
    });
  }

  // Send an interview reminder email
  async sendReminderEmail(interviewId: string) {
    try {
      // Fetch interview details
      const interview = await this.prisma.interview.findUnique({
        where: { id: interviewId },
      });

      if (!interview) {
        this.logger.warn(`Interview not found: ${interviewId}`);
        return { error: 'Interview not found' };
      }

      // Send email
      await this.mailerService.sendMail({
        to: interview.userEmail,
        subject: '⏳ Interview Reminder - 30 Minutes Left!',
        template: './reminder', // Reference the template file
        context: {
          candidateEmail: interview.candidateEmail,
          interviewDate: interview.interviewDate.toISOString(),
        },
      });

      this.logger.log(`Reminder email sent successfully for interview ${interviewId}`);
      return { message: 'Reminder email sent successfully' };
    } catch (error) {
      this.logger.error(`Failed to send reminder email for interview ${interviewId}: ${error.message}`);
      return { error: 'Failed to send reminder email' };
    }
  }

  // Cron Job: Check every 5 minutes for interviews happening in 30 minutes
  @Cron('*/5 * * * *') // Runs every 5 minutes
  async sendAutomaticReminders() {
    const now = new Date();
    const upcomingInterviews = await this.prisma.interview.findMany({
      where: {
        interviewDate: {
          gte: now,
          lte: new Date(now.getTime() + 30 * 60 * 1000), // Next 30 minutes
        },
        confirmed: true,
      },
    });

    if (upcomingInterviews.length === 0) {
      this.logger.log('No upcoming interviews found for reminders.');
      return;
    }

    for (const interview of upcomingInterviews) {
      await this.sendReminderEmail(interview.id);
    }
  }
}
