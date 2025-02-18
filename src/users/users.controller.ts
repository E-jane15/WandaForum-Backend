import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { SendOtpDto } from 'src/dto/send-otp.dto';
import { VerifyEmailDto } from 'src/dto/verify-email.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  @Post('logout')
  logout() {
    return { message: 'User logged out successfully' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req: any) {
    return {
      id: req.user.id,
      email: req.user.email,
      userName: req.user.userName, // ✅ Ensure this is included
    };
  }

  @Post('verify')
  async verifyUser(
    @Body('userId') userId: string,
    @Body('verificationToken') verificationToken: string,
  ): Promise<User> {
    return this.usersService.verifyUser(userId, verificationToken);
  }

  @Post('send-otp-email')
  async sendOtp(@Body(ValidationPipe) sendOtpDto: SendOtpDto) {
    const result = await this.usersService.sendOtp(sendOtpDto);
    return result;
  }

  @Post('verify-email')
  async verifyEmail(@Body(ValidationPipe) verifyEmailDto: VerifyEmailDto) {
    const result = await this.usersService.verifyEmail(verifyEmailDto);
    return result;
  }
}
