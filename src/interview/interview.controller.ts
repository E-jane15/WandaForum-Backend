import { Controller, Get, Param, Patch, Res, Post } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { Response } from 'express';

@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Get('accept/:requestId')
  async acceptInterview(@Param('requestId')
requestId: number, interviewId: string, string: any) {
    return this.interviewService.acceptInterview(requestId);
  }

  // @Get('reject/:requestId')
  // async rejectInterview(@Param('requestId') requestId: string) {
  //   // return this.interviewService.rejectInterview(requestId);
  //   return res.redirect('https://yourdomain.com/rejection-confirmed');
  // }

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
}
