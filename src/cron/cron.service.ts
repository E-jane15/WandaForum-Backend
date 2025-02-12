import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NotificationsService } from '../notifications/notifications.service';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CronService {
  constructor(private notificationsService: NotificationsService, private prisma: PrismaService) {}

  @Cron('*/5 * * * *') // ==================Runs every 5 minutes
  async checkForNewReplies() {
    console.log('Checking for new replies...');
    const threads = await this.prisma.thread.findMany();
    
    for (const thread of threads) {
      await this.notificationsService.sendThreadUpdateNotifications(thread.id);
    }
  }
}
