import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  async registerUser(dto: RegisterDto) {
    const { email ,password,userName } = dto;
  
    // email: string, password: string) 
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, password: hashedPassword,userName},
    });

    const token = this.jwtService.sign(
      { userId: user.id, email: user.email },
      { expiresIn: '1h' },
    );
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const link = `${baseUrl}/auth/verify?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Verify Your Email',
      html: `<p>Click <a href="${link}">here</a> to verify your email.</p>`,
    });

    return { message: 'Verification email sent' };
  }

  async verifyEmail(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if (user.isVerified) {
        return { message: 'Email is already verified'};
      }

      await this.prisma.user.update({
        where: { id: decoded.userId },
        data: { isVerified: true },
      });
      return { message: 'Email verified successfully' };
    } catch (error) {
      this.logger.error(`Email verification failed: ${error.message}`);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}