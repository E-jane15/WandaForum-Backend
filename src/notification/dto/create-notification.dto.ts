import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  message: string;

  @IsString()
  userId: string;

  @IsOptional()
  interviewId?: number;  

  @IsBoolean()
  isRead?: boolean;  
}
