import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PrismaService } from 'prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { Notification } from '@prisma/client';


@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async createNotification(data: {
    id: number;
    userId: string;
    message: string;
    type: string;
  }): Promise<Notification> {
    return this.prisma.notification.create({
      data,
    });
  }

  async getAll() {
    return await this.prisma.notification.findMany(); // Adjust based on your model
  }

  async sendNotification(createNotificationDto: CreateNotificationDto) {
    const { userId, interviewId, message } = createNotificationDto;
    const notification = await this.prisma.notification.create({
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
      // eslint-disable-next-line prettier/prettier
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

  async sendMockInterviewRequestEmail(requester: User, recipient: User, requestId: string) {
    const acceptUrl = `https://yourfrontend.com/peer-mock/accept/${requestId}`;
    const rejectUrl = `https://yourfrontend.com/peer-mock/reject/${requestId}`;
  
    const htmlContent = `
      <h2>New Mock Interview Request</h2>
      <p><strong>${requester.name}</strong> has requested a peer mock interview with you.</p>
      <p>Click below to respond:</p>
      <a href="${acceptUrl}" style="padding: 10px 20px; background: green; color: white; text-decoration: none; margin-right: 10px;">Accept</a>
      <a href="${rejectUrl}" style="padding: 10px 20px; background: red; color: white; text-decoration: none;">Reject</a>
    `;
  
    await this.mailService.sendMail({
      to: recipient.email,
      subject: 'Peer Mock Interview Request',
      html: htmlContent,
    });
  
    // Store in database
    await this.prisma.emailLog.create({
      data: {
        recipient: recipient.email,
        subject: 'Peer Mock Interview Request',
        content: htmlContent,
      },
    });
  
    console.log(`Email sent to ${recipient.email}`);
  }
  async sendThreadUpdateNotifications(threadId: string) {
    // Find all users following this thread
    const followers = await this.prisma.threadFollower.findMany({
      where: { threadId },
      include: { user: true },
    });

    if (!followers.length) return; // No one to notify

    // Find the latest reply
    const latestReply = await this.prisma.reply.findFirst({
      where: { threadId },
      orderBy: { createdAt: 'desc' },
    });

    if (!latestReply) return;

    const thread = await this.prisma.thread.findUnique({
      where: { id: threadId },
    });

    const notificationMessage = `New reply in thread: ${thread.title}`;

    for (const { user } of followers) {
      // Create in-app notification
      await this.prisma.notification.create({
        data: {
          userId: user.id,
          message: notificationMessage,
          link: `/community/thread/${threadId}`,
        },
      });

      // Send email notification
      await this.mailService.sendNotificationEmail(
        user.email,
        'Thread Update',
        `A new reply was posted in '${thread.title}'. Click below to view it.`,
        `https://wandaforum.com/community/thread/${threadId}`
      );
    }
  }
  
  
}
