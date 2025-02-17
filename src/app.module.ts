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
import { AvailabilitiesModule } from './availabilities/availabilities.module';
import { SchedulesModule } from './schedules/schedules.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ErrorNotification } from 'rxjs';
import { NotificationModule } from './notification/notification.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // load:[]
    }),
    UsersModule,
    DatabaseModule,
    QuestionsModule,
    AuthModule,
    PrismaModule,
    NotificationModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    SchedulesModule,
    AvailabilitiesModule,
    ScheduleModule.forRoot(), AvailabilitiesModule
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
