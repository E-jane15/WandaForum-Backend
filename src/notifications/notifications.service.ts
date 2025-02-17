import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: createNotificationDto,
    });
  }

  async findAll() {
    return this.prisma.notification.findMany();
  }

  async findOne(id: number) {
    return this.prisma.notification.findUnique({
      where: { id },
    });
  }

  async update(id: number, status: string) {
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
