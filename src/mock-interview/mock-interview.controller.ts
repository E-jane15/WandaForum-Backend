import { Controller, Param, Patch, NotFoundException } from '@nestjs/common';
import { MockInterviewService } from './mock-interview.service';

@Controller('peer-mock')
export class MockInterviewController {
  constructor(private readonly mockInterviewService: MockInterviewService) {}

  @Patch('accept/:id')  
  async acceptMockRequest(@Param('id') requestId: string) {
    return this.mockInterviewService.acceptMockRequest(requestId);
  }
}
