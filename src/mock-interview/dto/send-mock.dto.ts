import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class SendMockRequestDto {
  @IsNotEmpty()
  status: "pending" | "accecpted" | "rejected";

  @IsString()
  @IsNotEmpty()
  requestId: string

  @IsString()
  @IsNotEmpty()
  recipientId: string
}
