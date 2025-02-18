import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { NotificationService } from './notifications.service';
import { CreateNotificationDto } from 'src/notification/dto/create-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.createNotification(createNotificationDto);
  }

  @Get()
  findAll() {
    return this.notificationsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string ) {
    return this.notificationsService.getNotificationsByInterview(id);
  }

  @Put(':id')
  update(@Param('id') id: number) {
    return this.notificationsService.markAsRead(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.notificationsService.deleteNotification(+id);
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: number) {
    return this.notificationsService.markAsRead(+id);
  }
}

