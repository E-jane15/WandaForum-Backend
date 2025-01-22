import { CreateNotificationDto } from './dto/create-notification.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationStatus } from '@prisma/client';


@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body('status') status: NotificationStatus) {
    return this.notificationsService.update(+id, status);
  }  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.delete(+id);
  }
}
