import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  async register(email: string, password: string) {
    const user = await this.prisma.user.create({
      data: { email, password },
    });

    const token = this.jwtService.sign({ userId: user.id });
    const link = `http://localhost:3000/auth/verify?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Verify Your Email',
      text: `Click on this link to verify: ${link}`,
    });

    return { message: 'Verification email sent' };
  }

  async verifyEmail(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      await this.prisma.user.update({
        where: { id: decoded.userId },
        data: { isVerified: true },
      });
      return { message: 'Email verified successfully' };
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
