import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule here
import { UsersService } from './users.service';
import { MailModule } from '../mail/mail.module';
import { UsersController } from './users.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [
    DatabaseModule, 
    PassportModule, 
    MailModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Set the secret for JWT (from environment variable)
      signOptions: { expiresIn: '60m' }, // You can customize the expiration time of JWT here
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService,PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
