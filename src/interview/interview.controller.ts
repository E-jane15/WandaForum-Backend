import { Controller, Get, Param, Patch, Res, Post, Body, BadRequestException } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { Response } from 'express';

@Controller('interview')
export class InterviewController {
  MailerService: any;
  constructor(private readonly interviewService: InterviewService) {}

  @Get('accept/:requestId')
  async acceptInterview(@Param('requestId')
requestId: number, interviewId: string, string: any) {
    return this.interviewService.acceptInterview(requestId);
  }


  @Patch(':id/reject')
  async rejectInterview(@Param('id') interviewId: string) {
    return this.interviewService.rejectInterview(interviewId);
  }

  @Get(':id/reject')
  async rejectInterviewFromEmail(@Param('id') interviewId: string, @Res() res: Response) {
    await this.interviewService.rejectInterview(interviewId);
  }
  
  //confirm interview 
  @Post('accept/:id')
  async acceptPeerMockInterview(@Param('id') interviewId: string) {
    return this.interviewService.acceptPeerMockInterview(interviewId);
  }
  @Post('send-interview-rejection')
  async sendInterviewRejection(
    @Body() body: { email: string, userName: string, recipientName: string }
  ) {
    const { email, recipientName, userName } = body;

    if (!email || !userName || !recipientName) {
      throw new BadRequestException(
        'Missing required fields (email, userName, recipientName) instead got: ' + JSON.stringify(body)
      );
    }

    return this.MailerService.sendRejectInterviewNotificationEmail(email, userName, recipientName);
  }
}
