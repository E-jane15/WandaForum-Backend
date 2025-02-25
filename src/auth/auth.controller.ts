import { Controller, Post, Body, Query, UseGuards, Delete, Request } from '@nestjs/common';
import { MockInterviewService } from '../mock-interview/mock-interview.service';
import { AuthService } from './auth.service';
import { Any } from 'typeorm';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


@Controller('mock-interview')
export class MockInterviewController {
  constructor(private readonly mockInterviewService: MockInterviewService) {}

  @Post('request')
  async requestMockInterview(@Body() body: { requesterId: string; recipientId: string }) {
    return this.mockInterviewService.requestMockInterview(body.requesterId, body.recipientId);
  }
}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }


  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.login(loginDto);
  }
////verify email=============
  @Post('register')
  async registerUser(@Body() body: { email: string; password: string; userName: string }) {
    return this.authService.registerUser(body.email, body.password, body.userName);
  }

  @Post('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }


  //delete account 
  @UseGuards(JwtAuthGuard) // Ensure the user is authenticated before deleting the account
  @Delete('delete-account')
  async deleteAccount(@Body() body:{ email: string; password: string; } ) {
    return  this.authService.deleteAccount(body.email, body.password);
  }
}


  


