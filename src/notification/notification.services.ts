import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PrismaService } from 'prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService,  private readonly mailService: MailService, ) {}

  
  async sendNotification(createNotificationDto: CreateNotificationDto) {
    const { userId, interviewId, message } = createNotificationDto;
    const notification= await this.prisma.notification.create({
      data: {
        message,
        userId,
        interviewId,
      },
    });
    
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (user && user.email) {
      
      await this.mailService.sendNotificationEmail(
        user.email,
        'New Notification from Interview Platform',
        message,
      );
    } else {
      console.warn(`User with ID ${userId} does not have a valid email address.`);
    }

    return notification;
  }

  
  async getAllNotifications(userId: string) {
    return await this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },  
    });
  }

  async markAsRead(notificationId: number) {
    return await this.prisma.notification.update({
      where: { id: Number(notificationId) },
      data: { isRead: true },
    });
  }

  
  async deleteNotification(notificationId: number) {
    return await this.prisma.notification.delete({
      where: { id: notificationId },
    });
  }

  
  async getNotificationsByInterview(interviewId: number) {
    const id=Number(interviewId)
    return await this.prisma.notification.findMany({
      where: { interviewId: id },
    });
  }
}
