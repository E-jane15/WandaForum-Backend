import { Module } from '@nestjs/common';
import { NotificationService } from './notification.services';
import { NotificationController } from './notification.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PrismaService } from './prisma/prisma.service'; // Corrected import path
import { MailModule} from '.mail/mail.module';

@Module({
  providers: [NotificationService, PrismaService],
  imports: [DatabaseModule, MailModule],
  controllers: [NotificationController],
})
export class NotificationModule {}