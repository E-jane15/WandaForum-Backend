import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }
  
  @Post('login')
  async login(@Body(ValidationPipe) loginDto: LoginDto ){
    const user = await this.usersService.login(loginDto)
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req: any){
    return req.user
  }

}
