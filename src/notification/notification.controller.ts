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
  @Get()
async getAll() {
  return this.notificationService.getAll(); // Ensure this method exists in NotificationService
}



  @Get('user/:userId')
  async getAllNotifications(@Param('userId') userId: string) {
    return this.notificationService.getAllNotifications(userId);
  }

  @Get('interview/:interviewId')
  async getNotificationsByInterview(@Param('interviewId') interviewId: number) {
    return this.notificationService.getNotificationsByInterview(interviewId);
  }


  @Patch(':id/read')
  async markAsRead(@Param('id') notificationId: number) {
    return this.notificationService.markAsRead(notificationId);
  }

  @Delete(':id')
  async deleteNotification(@Param('id') notificationId: number) {
    return this.notificationService.deleteNotification(notificationId);
  }
}
