import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
import {MockInterviewController} from './auth.controller'
import { PrismaService } from 'prisma/prisma.service';
import { NotificationService } from 'src/notification/notification.services';
import { MailService } from 'src/mail/mail.service';
import { CronService } from 'src/cron/cron.service';
import { NotificationModule } from 'src/notification/notification.module';
import { MockInterviewModule } from 'src/mock-interview/mock-interview.module';
import { MockInterviewService } from 'src/mock-interview/mock-interview.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    NotificationModule,
    MockInterviewModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [JwtStrategy, AuthService, MockInterviewService, JwtService, PrismaService, NotificationService, MailService, CronService],
  exports: [JwtModule],
  controllers: [MockInterviewController,AuthController],
})
export class AuthModule {}
