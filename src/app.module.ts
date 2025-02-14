import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { QuestionsModule } from './questions/questions.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

import { ScheduleModule } from '@nestjs/schedule';

import { ScheduleModule } from '@nestjs/schedule';


import { NotificationModule } from './notification/notification.module';
import { ReminderModule } from './reminder/reminder.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MockInterviewService } from './mock-interview/mock-interview.service';
import { MockInterviewController } from './mock-interview/mock-interview.controller';
import { MockInterviewModule } from './mock-interview/mock-interview.module';
import { CronService } from './cron/cron.service';



import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from './mail/mail.module';
import { InterviewModule } from './interview/interview.module';
import { InterviewModule } from './interview/interview.module';
import { ReminderModule } from './reminder/reminder.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MockInterviewService } from './mock-interview/mock-interview.service';
import { MockInterviewController } from './mock-interview/mock-interview.controller';
import { MockInterviewModule } from './mock-interview/mock-interview.module';
import { CronService } from './cron/cron.service';



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
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'your-email@gmail.com',
          pass: 'your-email-password',
        },
      },
    }),
    UsersModule,
    DatabaseModule,
    QuestionsModule,
    AuthModule,
    ReminderModule, MailModule,
    PrismaModule,
    NotificationModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
