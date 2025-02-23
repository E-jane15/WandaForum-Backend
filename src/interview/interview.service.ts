import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Cron, CronExpression } from '@nestjs/schedule';
import { format } from 'date-fns';

@Injectable()
export class InterviewService {
  mailerService: any;
  prisma: any;
  logger: any;

  async sendDailyReminders() {
    const recipients = ['recipient1@example.com', 'recipient2@example.com'];
    const interviewTime = new Date();

    for (const email of recipients) {
      await this.sendInterviewReminderEmail(email, interviewTime);
    }
  }

  async sendInterviewReminderEmail(to: string, interviewTime: Date) {
    const subject = 'Interview Reminder from Wandaforum';
    const formattedTime = format(interviewTime, 'PPPppp');

    const message = `
      Hi there,<br><br>
      This is a friendly reminder that your interview is scheduled for <strong>${formattedTime}</strong>. 
      Please make sure to be prepared and available at that time.<br><br>
      If you have any questions or need to reschedule, feel free to reach out to us.<br><br>
      Best regards,<br>
      The Wandaforum Team
    `;

    try {
      await this.mailerService.sendMail({
        to,
        subject,
        html: `
          <!DOCTYPE html>
          <html>
          <head><style></style></head>
          <body>
            <div>
              <h2>Wandaforum Interview Reminder</h2>
              <p>${message}</p>
              <footer>
                <p>&copy; ${new Date().getFullYear()} Wandaforum</p>
              </footer>
            </div>
          </body>
          </html>
        `,
      });

      this.logger.log(`Sent interview reminder to ${to}`);
    } catch (error) {
      const errorMessage = (error as Error).message || 'Unknown error occurred';
      this.logger.error(`Failed to send interview reminder to ${to}: ${errorMessage}`);
    }
  }

  async scheduleInterview(userId: string, date: Date) {
    const interview = await this.prisma.interview.create({ data: { userId, date } });
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Interview Scheduled Confirmation',
      html: `
        <div>
          <h2>Interview Scheduled!</h2>
          <p>Hello <strong>${user.email}</strong>,</p>
          <p>Your interview has been successfully scheduled on:</p>
          <p><strong>${date.toLocaleString()}</strong></p>
          <p>Best regards,<br>Wandaforum Team</p>
        </div>
      `,
    });

    return { message: 'Interview scheduled successfully' };
  }

  async acceptInterview(interviewId: number) {
    const interview = await this.prisma.interview.update({
      where: { id: interviewId },
      data: { status: 'Accepted' },
      include: { requester: true, interviewee: true },
    });

    await this.mailerService.sendMail({
      to: interview.requester.email,
      subject: 'Interview Confirmed',
      html: `<p>Your interview has been confirmed.</p>`
    });

    return interview;
  }

  async rejectInterview(interviewId: string) {
    const interview = await this.prisma.interview.update({
      where: { id: interviewId },
      data: { status: 'Rejected' },
      include: { requester: true, recipient: true },
    });

    await this.mailerService.sendMail({
      to: interview.requester.email,
      subject: 'Your Interview Request was Rejected',
      html: `<p>Unfortunately, your interview request has been rejected.</p>`
    });

    return { message: 'Interview rejected and email sent to the requester.' };
  }

  async acceptPeerMockInterview(interviewId: string) {
    const interview = await this.prisma.mockInterview.update({
      where: { id: interviewId },
      data: { status: 'ACCEPTED' },
    });

    await this.mailerService.sendMail({
      to: interview.requesterEmail,
      subject: 'Mock Interview Confirmed',
      html: `
        <p>Dear ${interview.requesterName},</p>
        <p>Your peer mock interview with ${interview.recipientName} has been scheduled.</p>
        <p>Date: ${interview.date}</p>
        <p><a href="https://wandaforum.com/interview/${interview.id}">Join the Interview</a></p>
      `,
    });

    return { message: 'Mock interview successfully scheduled and confirmation email sent' };
  }
}
