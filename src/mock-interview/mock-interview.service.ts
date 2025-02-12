import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class MockInterviewService {
  constructor(private prisma: PrismaService, private mailService: MailService) {}

  async acceptMockRequest(requestId: string) {
    const request = await this.prisma.mockInterviewRequest.findUnique({
      where: { id: requestId },
      include: { requester: true, recipient: true },
    });

    if (!request) {
      throw new NotFoundException('Mock interview request not found');
    }

    if (request.status !== 'pending') {
      return { message: 'Request already accepted or rejected' };
    }

    // Update request status
    await this.prisma.mockInterviewRequest.update({
      where: { id: requestId },
      data: { status: 'accepted' },
    });

    // Send confirmation email to the recipient
    await this.mailService.sendMail({
      to: request.recipient.email,
      subject: 'Mock Interview Accepted',
      html: `<h2>Mock Interview Confirmed</h2>
             <p>You have successfully accepted a mock interview with <strong>${request.requester.name}</strong>.</p>
             <p>Prepare well and best of luck!</p>`,
    });

    // Send notification email to the requester
    await this.mailService.sendMail({
      to: request.requester.email,
      subject: 'Your Mock Interview Request was Accepted',
      html: `<h2>Your Mock Interview Request was Accepted</h2>
             <p><strong>${request.recipient.name}</strong> has accepted your mock interview request.</p>
             <p>Coordinate with them and get ready!</p>`,
    });

    return { message: 'Mock interview request accepted and confirmation emails sent' };
  }
}
