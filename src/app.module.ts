import { Module } from '@nestjs/common';
import { NotificationsModule } from './notifications/notifications.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [NotificationsModule],
  providers: [PrismaService],
})
export class AppModule {}
