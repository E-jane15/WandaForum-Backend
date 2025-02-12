import { Controller, Post, Body } from '@nestjs/common';
import { MockInterviewService } from './mock-interview.service';

@Controller('mock-interview')
export class MockInterviewController {
  constructor(private readonly mockInterviewService: MockInterviewService) {}

  @Post('request')
  async requestMockInterview(@Body() body: { requesterId: string; recipientId: string }) {
    return this.mockInterviewService.requestMockInterview(body.requesterId, body.recipientId);
  }
}
