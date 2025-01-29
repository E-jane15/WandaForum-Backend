import { IsNotEmpty, IsString } from "class-validator"

export class CreateScheduleDto {
    @IsString()
    @IsNotEmpty()
    interviewType:string

    @IsString()
    @IsNotEmpty()
    peerType:string

    @IsString()
    @IsNotEmpty()
    practiceLevel:string
    
    @IsString()
    @IsNotEmpty()
    date:Date
    
    @IsString()
    @IsNotEmpty()
    time:Date

    @IsString()
    @IsNotEmpty()
    userId: string
}
