


import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PrismaService } from 'prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { Notification, User } from '@prisma/client';
import { type } from 'os';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async createNotification(data: CreateNotificationDto): Promise<Notification> {
    return this.prisma.notification.create({
      data: {
        link: "",
        userId: data.userId as never,
        message: data.message,
        type: data.type,
        isRead: false,
      },
    });
  }

  async getAll() {
    return await this.prisma.notification.findMany();
  }

  async getUnique(notificationId: number) {
    return await this.prisma.notification.findUnique({
      where: {id: notificationId}
    });
  }

  async sendNotification(createNotificationDto: CreateNotificationDto) {
    const { userId, interviewId, message } = createNotificationDto;

    const notification = await this.prisma.notification.create({
      data: {
    type:'string',
        message,
        userId,
        interviewId,
        link: `/interviews/${String(interviewId)}`,
      },
    });

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (user && user.email) {
      await this.mailService.sendNotificationEmail(
        user.email,
        'New Notification from Interview Platform',
     
        `<p>${message}</p>`
      );
    } else {
      console.warn(`User with ID ${userId} does not have a valid email address.`);
    }

    return notification;
  }

  async sendThreadUpdateNotifications(threadId: string) {
    console.log("Implement this part", threadId);
    
  }
  async getAllNotifications(userId: string) {
    return await this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getNotificationsByInterview(interviewId: string) {
    return await this.prisma.notification.findMany({
      where: { interviewId},
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
}
