import { Controller, Get } from '@nestjs/common';

@Controller('interview')
export class InterviewController {
  @Get()
  getInterviews() {
    return 'List of interviews';
  }
}

export default InterviewController; // 
