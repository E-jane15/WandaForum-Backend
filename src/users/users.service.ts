import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { SendOtpDto, VerifyEmailDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly prisma: PrismaService,
  ) {}
  private otpStore = new Map<string, { otp: string; expiresAt: number }>();
  
  // Find user by email
  private async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  // Find user by ID
  async findById(id: string) {
    return this.prisma.user.findFirst({ where: { id } });
  }

  // Register user
  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        userName: createUserDto.userName,
        email: createUserDto.email,
        password: hashedPassword,
      },
    });

    // Send notification email after registration
    this.mailService.sendNotificationEmail(
      user.email,
      'Welcome to our platform!',
      'We are happy to have you on our platform.',
    );

    return user;
  }

  // Validate user credentials for login
  async validateUser(loginDto: LoginDto) {
    const user = await this.findByEmail(loginDto.email);
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      const { password, ...result } = user; // Don't return password in the result
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  // Login and return JWT token
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);

    const payload = {
      email: user.email,
      userId: user.id, // Use the actual user ID
    };

    return {
      access_token: await this.jwtService.signAsync(payload), // Create JWT token
    };
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  
  // Send OTP
  async sendOtp(verifyOtpDto: SendOtpDto): Promise<{ message: string }> {
    const { email } = verifyOtpDto;

    // Find the user by email
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log('User not found.');
      throw new Error('User not found.');
    }
    const otp = this.generateOtp();

    this.otpStore.set(verifyOtpDto.email, {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes from now
    });
    await this.mailService.sendOtpEmail(verifyOtpDto.email, otp);
    return { message: `OTP has been sent to the Email address ${email}, check your mailbox to verify it.` };
  }

  // Verify OTP
  async verifyEmail(verifyOtpDto: VerifyEmailDto): Promise<{ message: string }> {
    const { email, otp } = verifyOtpDto;

    // Find the user by email
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log('User not found.');
      throw new Error('User not found.');
    }
    
     // Check if the OTP exists in memory
  const storedOtp = this.otpStore.get(email);
  if (!storedOtp) {
    throw new Error('OTP not found or expired.');
  }

  // Check if the OTP has expired
  if (storedOtp.expiresAt < Date.now()) {
    this.otpStore.delete(email); // Clean up expired OTP
    throw new Error('OTP has expired.');
  }

  // Check if the OTP matches
  if (storedOtp.otp !== otp) {
    throw new Error('Invalid OTP.');
  }

    // Mark the user as verified
    await this.prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
      },
    });

    // Clean up the OTP from memory
    this.otpStore.delete(email);
    return { message: 'Email verified successfully.'};
  }

}
