import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaClient } from '@prisma/client';
import { MailService } from '../mail/mail.service';
import { isWithinInterval, addHours, subHours } from 'date-fns';

const prisma = new PrismaClient();

@Injectable()
export class ReminderService {
  constructor(private readonly mailService: MailService) {}

  @Cron(CronExpression.EVERY_HOUR)  // Runs every hour
  async checkUpcomingInterviews() {
    const now = new Date();
    
    // Fetch interviews scheduled within the next 24 hours
    const interviews = await prisma.interview.findMany({
      where: {
        interviewDate: {
          gte: now, // Greater than or equal to now (future interviews)
          lte: addHours(now, 24), // Less than or equal to 24 hours from now
        },
      },
    });

    for (const interview of interviews) {
      const interviewDate = new Date(interview.interviewDate); // Convert string to Date if necessary
      const { candidateEmail, id } = interview;

      // Check if the interview is within the next 24 hours
      if (isWithinInterval(interviewDate, { start: now, end: addHours(now, 24) })) {
        // Check if the interview is within the next 1 hour
        if (isWithinInterval(interviewDate, { start: now, end: addHours(now, 1) })) {
          await this.mailService.sendInterviewReminderEmail(candidateEmail, '1 hour');
        } else {
          await this.mailService.sendInterviewReminderEmail(candidateEmail, '1 hour ');
        }
      }
    }
  }
}