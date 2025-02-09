import { IsNotEmpty, IsString } from "class-validator";

export class CreateAvailabilityDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  focusArea: string;

  @IsString()
  @IsNotEmpty()
  meetingPlatform: string;

  @IsString()
  @IsNotEmpty()
  meetingLink: string;

  @IsString()
  @IsNotEmpty()
  rolePreference: string;

  @IsString()
  @IsNotEmpty()
  startTime: Date;

  @IsString()
  @IsNotEmpty()
  endTime: Date;

  @IsString()
  @IsNotEmpty()
  date: Date;
  
  status?: string;
}
