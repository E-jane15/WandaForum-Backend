import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationStatus } from '@prisma/client'; // Import the enum

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const user = this.prisma.user.findUnique({
      where: { email: createNotificationDto.email}
    })

    if (user) {
      return this.prisma.notification.create({
        data: {
          message: createNotificationDto.message,
          title: createNotificationDto.title,
          status: createNotificationDto.status,
          userId: (await user).id
        } ,
      });
    } else{
      return "error, user not found. Please provide in the email address"
    }
  }

  async findAll() {
    return this.prisma.notification.findMany();
  }

  async findOne(id: number) {
    return this.prisma.notification.findUnique({
      where: { id },
    });
  }

  // Update method with correct status type (using enum)
  async update(id: number, status: NotificationStatus) {
    return this.prisma.notification.update({
      where: { id },
      data: { status },
    });
  }

  async delete(id: number) {
    return this.prisma.notification.delete({
      where: { id },
    });
  }
}
