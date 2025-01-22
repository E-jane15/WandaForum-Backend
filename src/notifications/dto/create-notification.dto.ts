import { NotificationStatus } from '@prisma/client';
import { IsString, IsNotEmpty, IsEnum, IsOptional, IsEmail } from 'class-validator';

export enum NotificationType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(NotificationType)
  type?: NotificationType;

  @IsOptional()
  @IsString()
  userId?:  number;
  status: NotificationStatus;  // Optional, if you want to associate it with a user
}