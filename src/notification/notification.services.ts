import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PrismaService } from 'prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService,  private readonly mailService: MailService, ) {}

  // Method to send a notification (create a new notification)
  async sendNotification(createNotificationDto: CreateNotificationDto) {
    const { userId, interviewId, message } = createNotificationDto;
    const notification= await this.prisma.notification.create({
      data: {
        message,
        userId,
        interviewId,
      },
    });
    // Fetch the user to get their email address
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (user && user.email) {
      // Send an email notification using the MailService
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

  // Method to get all notifications for a specific user
  async getAllNotifications(userId: string) {
    return await this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },  
    });
  }

  // Method to mark a notification as read
  async markAsRead(notificationId: number) {
    return await this.prisma.notification.update({
      where: { id: Number(notificationId) },
      data: { isRead: true },
    });
  }

  // Method to delete a notification by its ID
  async deleteNotification(notificationId: number) {
    return await this.prisma.notification.delete({
      where: { id: notificationId },
    });
  }

  // Method to get notifications for an interview (optional)
  async getNotificationsByInterview(interviewId: number) {
    const id=Number(interviewId)
    return await this.prisma.notification.findMany({
      where: { interviewId: id },
    });
  }
}
