import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ReminderService } from './reminder.service';
import { MailModule } from '../mail/mail.module';
import { PrismaModule } from 'prisma/prisma.module'; // Fix the import path
import { ReminderController } from './reminder.controller';

@Module({
  imports: [
    ScheduleModule.forRoot(), 
    MailModule, 
    PrismaModule  // Merge into one `imports` array
  ],
  providers: [ReminderService],
  controllers: [ReminderController],
})
export class ReminderModule {}
