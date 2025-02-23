import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { QuestionsModule } from './questions/questions.module';
import { AuthModule } from './auth/auth.module';

import { PrismaModule } from 'prisma/prisma.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

import { NotificationModule } from './notification/notification.module';
import { MockInterviewModule } from './mock-interview/mock-interview.module';
import { MockInterviewController } from './mock-interview/mock-interview.controller';
import { MockInterviewService } from './mock-interview/mock-interview.service';
import { CronService } from './cron/cron.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from './mail/mail.module';
import { InterviewModule } from 'src/interview/interview.module';
import { ReminderModule } from './reminder/reminder.module';
import { MailerModule } from '@nestjs-modules/mailer';

import { CronModule } from './cron/cron.module';
import { NotificationController } from './notification/notification.controller';
import { NotificationService } from './notification/notification.services';
import { AvailabilitiesModule } from './availabilities/availabilities.module';
import { SchedulesModule } from './schedules/schedules.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    SchedulesModule,
    AvailabilitiesModule,
    ScheduleModule.forRoot(), 
    AvailabilitiesModule,
    UsersModule,
    DatabaseModule,
    QuestionsModule,
    AuthModule,
    MockInterviewModule,
    ReminderModule,
    MailModule,
    PrismaModule,
    InterviewModule,
    NotificationModule,
    CronModule,
  ],
  controllers: [
    AppController,
    MockInterviewController,
    NotificationController,
  ],
  providers: [
    AppService,
    JwtStrategy,
    MockInterviewService, // Ensure MockInterviewService is properly registered
    CronService, 
    NotificationService,
  ],
})
export class AppModule {}
