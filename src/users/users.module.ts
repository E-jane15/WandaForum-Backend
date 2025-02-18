import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [DatabaseModule, PassportModule],
  controllers: [UsersController],
  providers: [UsersService, JwtService, PrismaService, MailService ],
  exports: [UsersService],
})
export class UsersModule {}
