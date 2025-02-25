import { Injectable, UnauthorizedException, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from 'src/mail/mail.service';

import { CreateUserDto } from '../users/dto/create-user.dto'; // Adjust the path as needed

@Injectable()
export class AuthService {
  login(loginDto: { email: string; password: string; }) {
    throw new Error('Method not implemented.');
  }
  verifyEmail(token: string) {
    throw new Error('Method not implemented.');
  }
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private mailerService: MailerService,
    private MailService: MailService,
  ) {}

  //==== verify email
  async registerUser(email: string, password: string, userName: string) {
    // Rename destructured 'email' to 'userEmail' to avoid duplication
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, password: hashedPassword, userName },
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


// Delete user account mechanism
async deleteAccount(email: string, password: string): Promise<string> {
  // Step 1: Find the user in the database
  const user = await this.prisma.user.findUnique({ where: { email: email } });
  if (!user) {
    throw new NotFoundException(); // Custom exception to handle user not found case
  }

  // Step 2: Verify the user's password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password'); // Handle invalid password
  }

  // Step 3: Delete the user from the database
  await this.prisma.user.delete({ where: { id: user.id } });

  // Step 4: Send confirmation email
  await this.mailerService.sendMail({
    to: user.email,
    subject: 'Account Deleted Successfully',
    html: `<p>Dear ${user.userName},</p>
           <p>Your account has been successfully deleted. We are sorry to see you go.</p>
           <p>If this was a mistake, please contact us at support@wandaforum.com.</p>
           <p>Best regards,</p>
           <p>The Wandaforum Team</p>`,
  });

  // Step 5: Return success message
  return 'Your account has been deleted successfully.';
}

  //============= forgot password
  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    const resetToken = uuidv4();
    await this.prisma.user.update({
      where: { email },
      data: { resetToken },
    });

    await this.MailService.sendForgotPasswordEmail(email, user.userName, resetToken);
    return { message: 'Reset email sent' };
  }

    async resetPassword(userId: string, newPassword: string) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });
    }
  }

