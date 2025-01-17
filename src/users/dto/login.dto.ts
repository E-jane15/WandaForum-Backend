import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class LoginDto {

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password:string
}