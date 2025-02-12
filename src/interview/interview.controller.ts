import { Controller, Post, Body } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { PrismaService } from 'prisma/prisma.service';

@Controller('interview')
export class InterviewController {
  constructor(
    private readonly interviewService: InterviewService,
    private prisma: PrismaService,
  ) {}

  @Post('schedule')
  async scheduleInterview(
    @Body('email') email: string,
    @Body('date') date: string,
  ) {
    await this.prisma.interview.create({
      data: { userEmail: email, interviewDate: new Date(date) },
    });

    return { message: 'Interview scheduled successfully!' };
  }
}
