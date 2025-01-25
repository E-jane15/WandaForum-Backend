import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationService } from './notification.services';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

   
  @Post('send')
  async sendNotification(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.sendNotification(createNotificationDto);
  }

  // Endpoint to get all notifications for a user
  @Get('user/:userId')
  async getAllNotifications(@Param('userId') userId: string) {
    return this.notificationService.getAllNotifications(userId);
  }

  // Endpoint to get notifications for a specific interview
  @Get('interview/:interviewId')
  async getNotificationsByInterview(@Param('interviewId') interviewId: number) {
    return this.notificationService.getNotificationsByInterview(interviewId);
  }

  // Endpoint to mark a notification as read
  @Patch(':id/read')
  async markAsRead(@Param('id') notificationId: number) {
    return this.notificationService.markAsRead(notificationId);
  }

  // Endpoint to delete a notification by its ID
  @Delete(':id')
  async deleteNotification(@Param('id') notificationId: number) {
    return this.notificationService.deleteNotification(notificationId);
  }
}
