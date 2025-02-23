import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationService } from 'src/notification/notification.services';

@Injectable()
export class CronService {
  constructor(private notificationsService: NotificationService, private prisma: PrismaService) {}

  @Cron('*/5 * * * *') // ==================Runs every 5 minutes
  async checkForNewReplies() {
    console.log('Checking for new replies...');
    const threads = await this.prisma.thread.findMany();
    
    for (const thread of threads) {
      await this.notificationsService.sendThreadUpdateNotifications(thread.id);
    }
  }
}
