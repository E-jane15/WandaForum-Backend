import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsDate, } from "class-validator";

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

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  startTime: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  endTime: Date;
  
  status?: string;
}
