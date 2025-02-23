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


  // delete account 

  // @Delete("delete")
  // async deleteAccount(@Body() body, @Req() req: Request, @Res() res: Response) {
  //   try {
  //     const userId = req.user.id;
  //     const { password } = body;

  //     // Get user from DB
  //     const user = await this.prisma.user.findUnique({
  //       where: { id: userId },
  //     });

  //     if (!user) return res.status(404).json({ message: "User not found" });

  //     // Verify password
  //     const isMatch = await bcrypt.compare(password, user.password);
  //     if (!isMatch)
  //       return res.status(400).json({ message: "Incorrect password" });

  //     // Delete user account
  //     await this.prisma.user.delete({ where: { id: userId } });

  //     // Clear session/token (if using cookies)
  //     res.clearCookie("jwt");

  //     return res.json({ message: "Account deleted successfully" });
  //   } catch (error) {
  //     return res.status(500).json({ message: "Internal server error" });
  //   }
  // }
}
