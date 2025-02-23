
// import { Injectable } from '@nestjs/common';
// import { CreateNotificationDto } from 'src/dto/create-notification.dto/create-notification.dto';
// import { PrismaService } from 'prisma/prisma.service';
// import { MailService } from 'src/mail/mail.service';
// import { MailerService } from '@nestjs-modules/mailer';
// import { Notification, User } from '@prisma/client';
// import { notification}  from 'src/emails-templates/notification';
// import { type } from 'os';
// import { Cron, CronExpression } from '@nestjs/schedule';

// // import { InAppService } from './in-app.service';
// import { Type } from 'class-transformer';
// const emailTemplate = require('../mail/templates/notificationEmail');
// @Injectable()
// export class NotificationService {
//   getUnreadNotifications(userId: number) {
//     throw new Error('Method not implemented.');
//   }
//   constructor(
//     private readonly prisma: PrismaService,
//     private readonly mailService: MailService,
//     private readonly mailerService: MailerService,
    
//   ) {}

//   async createNotification(userId: number, type: string, data: {
//   userId: string;
//   message: string;
//   type: string;
//   eventType: string;
// }): Promise<Notification> {
//     return this.prisma.notification.create({
//       data: {
//         link:"",
//         userId: data.userId as never,
//         message: data.message,
//         type: data.type,
//         isRead: false,
        
//       },
//     });
//   }



// //cron jobs ===========
// @Cron(CronExpression.EVERY_HOUR)
// async sendUnreadNotificationReminders() {
//   console.log('Running unread notification reminder job...');

//   // Find users with unread notifications
//   const usersWithUnreadNotifications = await this.prisma.user.findMany({
//     where: {
//       notifications: {
//         some: { isRead: false }
//       }
//     },
//     include: { notifications: true }
//   });

//   // Send email to users with unread notifications
//   for (const user of usersWithUnreadNotifications) {
//     const unreadCount = user.notifications.filter(n => !n.isRead).length;
    
//     if (user.email) {
//       await this.mailService.sendNotificationEmail(
//         user.email,
//         'You have unread notifications',
//         `<p>You have ${unreadCount} unread notifications.</p>
//         <a href="https://wandaforum.com/notifications">View Notifications</a>`
//       );
//     }
//   }

//   console.log('Unread notification reminders sent successfully.');
// }











// //=======comments 

// async sendNewCommentNotification(userId: string, commentContent: string, postId: string) {
//   const notificationMessage = `New comment on your post: ${commentContent}`;

//   // Create in-app notification in the database
//   const notification = await this.prisma.notification.create({
//       data: {
//           userId, // User who gets the notification
//           message: notificationMessage,
//           type: 'COMMENT',
//           link: `/questions/${postId}`, // Link to the post
//           isRead: false,
          
// interviewId: 'any',
//       },
//   });

//   // Send email notification (optional)
//   const user = await this.prisma.user.findUnique({
//       where: { id: userId },
//   });

//   if (user && user.email) {
//       await this.mailService.sendNotificationEmail(
//           user.email,
//           user.userName,
//           'New Comment Notification',
//           `<p>${notificationMessage}</p><a href="https://wandaforum.com/questions/${postId}">View Comment</a>`
//       );
//   }

//   return notification;
// }

//   async getAll() {
//     return await this.prisma.notification.findMany();
//   }

//   async sendNotification(createNotificationDto: CreateNotificationDto) {
//     const { userId, interviewId, message } = createNotificationDto;

//     const notification = await this.prisma.notification.create({
//       data: {
//       type:"",
//         message,
//         userId,
//         interviewId,
//         link: `/interviews/${String(interviewId)}`,
//       },
//     });

//     const user = await this.prisma.user.findUnique({
//       where: { id: userId },
//     });

//     if (user && user.email) {
//       await this.mailService.sendNotificationEmail(
//         user.email,
//         user.userName,  
//         "new comment",  
//         message,
//         `/interviews/${String(interviewId)}`,
//       );
//     } else {
//       console.warn(`User with ID ${userId} does not have a valid email address.`);
//     }

//     return notification;
//   }

//   async getAllNotifications(userId: string) {
//     return await this.prisma.notification.findMany({
//       where: { userId },
//       orderBy: { createdAt: 'desc' },
//     });
//   }

//   async markAsRead(notificationId: number) {
//     return await this.prisma.notification.update({
//       where: { id: Number(notificationId) },
//       data: { isRead: true },
//     });
//   }

//   async deleteNotification(notificationId: number) {
//     return await this.prisma.notification.delete({
//       where: { id: notificationId },
//     });
//   }

//   async sendMockInterviewRequestEmail(requester: User, recipient: User, requestId: string) {
//     const acceptUrl = `https://yourfrontend.com/peer-mock/accept/${requestId}`;
//     const rejectUrl = `https://yourfrontend.com/peer-mock/reject/${requestId}`;
  
//     const htmlContent = `
//       <h2>New Mock Interview Request</h2>
//       <p><strong>${requester.userName}</strong> has requested a peer mock interview with you.</p>
//       <p>Click below to respond:</p>
//       <a href="${acceptUrl}" style="padding: 10px 20px; background: green; color: white; text-decoration: none; margin-right: 10px;">Accept</a>
//       <a href="${rejectUrl}" style="padding: 10px 20px; background: red; color: white; text-decoration: none;">Reject</a>
//     `;

//     await this.mailerService.sendMail({
//       to: recipient.email,
//       subject: 'Peer Mock Interview Request',
//       html: htmlContent,
//     });

//     await this.prisma.emailLog.create({
//       data: {
//         recipient: recipient.email,
//         subject: 'Peer Mock Interview Request',
//         content: htmlContent,
//       },
//     });

//     console.log(`Email sent to ${recipient.email}`);
//   }

//   async getNotificationsByInterview(interviewId: string) {
//     return await this.prisma.notification.findMany({
//       where: { interviewId},
//       orderBy: { createdAt: 'desc' },
//     });
//   }


//   async sendNewLikeNotification(userId: string, postId: string) {
//     const notificationMessage = `Someone liked your post!`;
  
//     // Create an in-app notification
//     const notification = await this.prisma.notification.create({
//       data: {
//         userId,
//         message: notificationMessage,
//         type: 'LIKE',
//         link: `/questions/${postId}`, // Change to `/community/${postId}` for community posts
//         isRead: false,
//         interviewId: 'any',
//       },
//     });
  
//     // Send email notification
//     const user = await this.prisma.user.findUnique({
//       where: { id: userId },
//     });
  
//     if (user && user.email) {
//       await this.mailService.sendNotificationEmail(
//         user.email,
//         'New Like Notification',
//         `<p>${notificationMessage}</p>
//         <a href="https://wandaforum.com/questions/${postId}">View Post</a>`
//       );
//     }
  
//     return notification;
//   }
//   async sendNewPostNotification(authorId: string, postTitle: string, postId: string) {
//     const followers = await this.prisma.user.findMany({
//       // Assuming users have a setting to get notifications
//     });
  
//     if (!followers.length) return;
  
//     const notificationMessage = `New post: ${postTitle}`;
  
//     for (const user of followers) {
//       await this.prisma.notification.create({
//         data: {
//           userId: user.id,
//           message: notificationMessage,
//           type: 'NEW_POST',
//           link: `/questions/${postId}`,
//           isRead: false,
//         },
//       });
  
//       await this.mailService.sendNotificationEmail(
//         user.email,
//         'New Post Alert',
//         `<p>${notificationMessage}</p>
//         <a href="https://wandaforum.com/questions/${postId}">Read More</a>`
//       );
//     }
//   }
    



//   async sendThreadUpdateNotifications(threadId: string) {
//     const followers = await this.prisma.threadFollower.findMany({
//       where: { threadId },
//       include: { user: true },
//     });

//     if (!followers.length) return;

//     const latestReply = await this.prisma.reply.findFirst({
//       where: { threadId },
//       orderBy: { createdAt: 'desc' },
//     });

//     if (!latestReply) return;

//     const thread = await this.prisma.thread.findUnique({
//       where: { id: threadId },
//     });

//     const notificationMessage = `New reply in thread: ${thread.title}`;

//     for (const { user } of followers) {
//       await this.prisma.notification.create({
//         data: {
//           userId: user.id as never,
//           message: notificationMessage,
//           link: `/community/thread/${threadId}`,
//           type: "",
//         }
//       }
//     )
//     CreateNotificationDto

//       await this.mailService.sendNotificationEmail(
//         user.email,
//         'Thread Update',
      
//         `<a href="https://wandaforum.com/community/thread/${threadId}">View Reply</a>`
//       );
//     }
//   }
// }
