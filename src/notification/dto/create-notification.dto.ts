

  import { IsInt, IsNotEmpty, IsString } from 'class-validator';
// import { Interview } from '../../interview/interview.entity';

export class CreateNotificationDto {
  @IsInt()
  userId: string;
  InterviewId?: string;

  @IsString()
  @IsNotEmpty()
  type: string;  // e.g., 'new_comment', 'new_post', etc.

  @IsString()
  @IsNotEmpty()
  message: string;
}

  