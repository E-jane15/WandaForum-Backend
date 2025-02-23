import { Controller, Get } from '@nestjs/common';
import { EmailService } from 'src/emails/email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('test-reminder')
  async testReminder() {
    await this.emailService.sendInterviewReminder(
      'angelazango@gmail.com',  // Email
      'Angela',            // Name
      'March 5, 2025',     // Date
      '10:00 AM GMT',      // Time
      'https://zoom.us/test-link' // Interview Link
    );
    return { message: 'Test Reminder Sent' };
  }
}
