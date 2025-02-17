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
import { ScheduleModule } from '@nestjs/schedule';
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
import { SchedulesModule } from './schedules/schedules.module';
import { NotificationsService } from './notifications/notifications.service';
import { NotificationsController } from './notifications/notifications.controller';

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
    TypeOrmModule.forRoot({
      type: 'mysql', // Change to 'postgres' if using PostgreSQL
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
    }),
    ScheduleModule.forRoot(), // Fixed this to use ScheduleModule correctly
    SchedulesModule, // Import SchedulesModule properly
  ],
  controllers: [
    AppController,
    MockInterviewController,
    NotificationsController, // Ensure MockInterviewController is registered
  ],
  providers: [
    AppService,
    JwtStrategy,
    MockInterviewService, // Ensure MockInterviewService is properly registered
    CronService, NotificationsService, // Ensure CronService is included
  ],
})
export class AppModule {}
