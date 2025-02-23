import { Controller, Param, Patch, NotFoundException, Post, Body, ValidationPipe } from '@nestjs/common';
import { MockInterviewService } from './mock-interview.service';
import { SendMockRequestDto } from './dto/send-mock.dto';

@Controller('peer-mock')
export class MockInterviewController {
  constructor(private readonly mockInterviewService: MockInterviewService) {}

  @Post('send')
  async sendMockRequest(@Body(ValidationPipe) sendMockRequestDto: SendMockRequestDto) {
    const mock = await this.mockInterviewService.sendMockRequest(sendMockRequestDto);
    return mock;
  }

  @Patch('accept')  
  async acceptMockRequest( requestId: string) { 
    return this.mockInterviewService.acceptMockRequest(requestId);
  }

  @Patch('reject')  
  async rejectMockRequest( requestId: string) { 
    return this.mockInterviewService.rejectMockRequest(requestId);
  }
}
