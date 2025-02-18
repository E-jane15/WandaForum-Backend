
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  userId: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  interviewId?: string; // Optional, since some notifications may not relate to an interview

  @IsString()
  link: string;

  @IsString()
  type: string; // Notification type, can be something like 'interview', 'mock-interview', etc.

  @IsBoolean()
  isRead: boolean;
}
