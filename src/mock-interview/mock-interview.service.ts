import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { SendMockRequestDto } from './dto/send-mock.dto';

@Injectable()
export class MockInterviewService {
  requestMockInterview(requesterId: string, recipientId: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService, private mailService: MailService) {}

  async acceptMockRequest(requestId: string) {
    const request = await this.prisma.mockInterviewRequest.findFirst({
      where: { requesterId: requestId },
      include: { requester: true, recipient: true },
    });

    if (!request) {
      throw new NotFoundException('Mock interview request not found');
    }

    // if (request.status !== 'pending') {
    //   return { message: 'Request already accepted or rejected' };
    // }

    // Update request status
    await this.prisma.mockInterviewRequest.update({
      where: { id: request.id },
      data: { status: 'accepted' },
    });

    // Send confirmation email to the recipient
    await this.mailService.sendMail({
      to: request.recipient.email,
      subject: 'Mock Interview Accepted',
      html: `<h2>Mock Interview Confirmed</h2>
             <p>You have successfully accepted a mock interview with <strong>${request.requester.userName}</strong>.</p>
             <p>Prepare well and best of luck!</p>`,
    });

    // Send notification email to the requester
    await this.mailService.sendMail({
      to: request.requester.email,
      subject: 'Your Mock Interview Request was Accepted',
      html: `<h2>Your Mock Interview Request was Accepted</h2>
             <p><strong>${request.recipient.userName}</strong> has accepted your mock interview request.</p>
             <p>Coordinate with them and get ready!</p>`,
    });

    return { message: 'Mock interview request accepted and confirmation emails sent' };
  }

  async sendMockRequest(dto: SendMockRequestDto) {
    const recipient = await this.prisma.user.findUnique({
      where: { id: dto.recipientId },
    });

    const requester = await this.prisma.user.findUnique({
      where: { id: dto.requestId },
    });

    if (!recipient) {
      throw new NotFoundException('The Recipient does not exist in the platform');
    }
    if (!requester) {
      throw new NotFoundException('The Requester does not exist in the platform');
    }

    // Update request status
    await this.prisma.mockInterviewRequest.create({
       data: {
        status: dto.status,
        recipientId: dto.recipientId,
        requesterId: dto.requestId, 
       }
    });

    return { message: `Mock has been sent with status: ${dto.status}` };
  }

  async rejectMockRequest(requestId: string) {
    const request = await this.prisma.mockInterviewRequest.findFirst({
      where: { requesterId: requestId },
      include: { requester: true, recipient: true },
    });

    if (!request) {
      throw new NotFoundException('Mock interview request not found');
    }

    // if (request.status !== 'pending') {
    //   return { message: 'Request already accepted or rejected' };
    // }

    // Update request status
    await this.prisma.mockInterviewRequest.update({
      where: { id: request.id },
      data: { status: 'rejected' },
    });

    // Send confirmation email to the recipient
    await this.mailService.sendMail({
      to: request.recipient.email,
      subject: 'Mock Interview Rejected',
      html: `<h2>Mock Interview Rejected</h2>
             <p>You have successfully rejected a mock interview with <strong>${request.requester.userName}</strong>.</p>
             <p>Prepare well and best of luck!</p>`,
    });

    // Send notification email to the requester
    await this.mailService.sendMail({
      to: request.requester.email,
      subject: 'Your Mock Interview Request was Rejected',
      html: `<h2>Your Mock Interview Request was Accepted</h2>
             <p><strong>${request.recipient.userName}</strong> has accepted your mock interview request.</p>
             <p>Coordinate with them and get ready!</p>`,
    });

    return { message: 'Mock interview request Rejected' };
  }
}
