import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ReminderService } from './reminder.service';

@Controller('reminders')  // Base route: /reminders
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  // Fetch all scheduled reminders
  @Get()
  async getAllReminders() {
    return this.reminderService.getAllReminders();
  }

  // Fetch a reminder by interview ID
  @Get(':interviewId')
  async getReminderByInterviewId(@Param('interviewId') interviewId: string) {
    return this.reminderService.getReminderByInterviewId(interviewId);
  }

  // Manually trigger a reminder email for an interview
  @Post('send')
  async sendReminder(@Body() reminderData: { interviewId: string }) {
    return this.reminderService.sendReminderEmail(reminderData.interviewId);
  }
}
