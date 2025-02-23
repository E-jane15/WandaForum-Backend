// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Patch,
//   Post,
//   Put,
// } from '@nestjs/common';
// import { NotificationService } from './notifications.service';
// import { CreateNotificationDto } from 'src/notification/dto/create-notification.dto';
// import { Any } from 'typeorm';

// @Controller('notifications')
// export class NotificationsController {
//   prisma: any;
//   constructor(private readonly notificationsService: NotificationService) {}

//   // create(@Body() createNotificationDto: CreateNotificationDto) {
//   //   return this.notificationsService.createNotification(createNotificationDto);
//   // }

//   @Post()
//   async createNotification(
//     createNotificationDto: CreateNotificationDto,
//   ): Promise<Notification> {
//     const { userId, type, message } = createNotificationDto;

//     // Proceed with your logic as before
//     const notification = await this.prisma.notification.create({
//       data: {
//         userId: userId.toString(),
//         message,
//         type,
//         eventType: Any,
//       },
//     });

//     return notification;
//   }

//   @Get('user/:userId')
//   async getUnreadNotifications(@Param('userId') userId: number) {
//     return this.notificationsService.getUnreadNotifications(userId);
//   }
//   @Get()
//   findAll() {
//     return this.notificationsService.getAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.notificationsService.getNotificationsByInterview(id);
//   }

//   @Put(':id')
//   update(@Param('id') id: number) {
//     return this.notificationsService.markAsRead(+id);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: number) {
//     return this.notificationsService.deleteNotification(+id);
//   }

//   @Patch(':id/read')
//   async markAsRead(@Param('id') id: number) {
//     return this.notificationsService.markAsRead(+id);
//   }
// }
