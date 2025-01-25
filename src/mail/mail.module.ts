import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import * as path from 'path';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, 
        auth: {
          user: process.env.EMAIL_USER, 
          pass: process.env.EMAIL_PASS, 
        },
      },
      defaults: {
        from: '"Interview Platform" <no-reply@interview.com>', 
      },
    }),
  ],
  providers: [MailService, PrismaService],
  exports: [MailService],
  controllers: [MailController], 
})
export class MailModule {}
