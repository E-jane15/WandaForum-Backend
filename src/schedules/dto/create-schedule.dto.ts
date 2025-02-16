import { IsDate, IsNotEmpty, IsString } from "class-validator"

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
    
    @IsDate()
    @IsNotEmpty()
    date:Date
    
    @IsDate()
    @IsNotEmpty()
    time:Date

    @IsString()
    @IsNotEmpty()
    userId: string
}
