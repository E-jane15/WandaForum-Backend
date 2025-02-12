import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaClient } from '@prisma/client';
import { MailService } from '../mail/mail.service';
import { isWithinInterval, subHours } from 'date-fns';

const prisma = new PrismaClient();

@Injectable()
export class ReminderService {
  constructor(private readonly mailService: MailService) {}

  @Cron(CronExpression.EVERY_HOUR)  // Runs every hour
  async checkUpcomingInterviews() {
    const now = new Date();
    const interviews = await prisma.interview.findMany();

    for (const interview of interviews) {
      const { scheduledAt, candidateEmail } = interview;

      if (isWithinInterval(scheduledAt, { start: subHours(now, 24), end: now })) {
        await this.mailService.sendInterviewReminderEmail(candidateEmail, '1 hour');
      } else if (isWithinInterval(scheduledAt, { start: subHours(now, 1), end: now })) {
        await this.mailService.sendInterviewReminderEmail(candidateEmail, '1 hour');
      }
    }
  }
}
