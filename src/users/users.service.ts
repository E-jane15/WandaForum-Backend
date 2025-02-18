import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { MailService } from 'src/mail/mail.service';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { SendOtpDto } from 'src/dto/send-otp.dto';
import { VerifyEmailDto } from 'src/dto/verify-email.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
        private readonly databaseService: DatabaseService,
        private readonly mailService: MailService,
  ) {}
  private otpStore = new Map<string, { otp: string; expiresAt: number }>();

  async findByEmail(email: string) {
    return this.databaseService.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    console.log(id);
    return this.databaseService.user.findFirst({ where: { id } });
  }

  async register(createUserDto: CreateUserDto) : Promise<User> {
    try {
      const { userName, email, password, confirmPassword } = createUserDto;

      if (password !== confirmPassword) {
        throw new ConflictException('Passwords do not match');
      }

      // ✅ Check if the email already exists
      const existingEmail = await this.findByEmail(email);
      if (existingEmail) {
        throw new ConflictException('User with this email already exists');
      }

      // ✅ Check if the username already exists
      const existingUser = await this.databaseService.user.findUnique({
        where: { userName },
      });

      if (existingUser) {
        throw new ConflictException('Username is already taken');
      }

      // ✅ Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // ✅ Save user in database
      const user = this.databaseService.user.create({
        data: {
          userName: createUserDto.userName,
          email: createUserDto.email,
          password: hashedPassword,
        },
      });
    // Send notification email after registration
    this.mailService.sendNotificationEmail(
      (await user).email,
      'Welcome to our platform!',
      'We are happy to have you on our platform.',
    );
      return user;
    } catch (error) {
      console.error('Signup Error:', error); // ✅ Log the full error details
      throw new Error('Signup failed. Please check the backend logs.' + error.message);
    }
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this.findByEmail(loginDto.email);
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      return {
        id: user.id,
        email: user.email,
        userName: user.userName,
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);

    // ✅ Generate JWT token payload
    const payload = {
      email: user.email,
      userId: user.id,
    };

    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Send OTP
  async sendOtp(verifyOtpDto: SendOtpDto): Promise<{ message: string }> {
    const { email } = verifyOtpDto;

    // Find the user by email
    const user = await this.databaseService.user.findUnique({ where: { email } });
    if (!user) {
      console.log('User not found.');
      throw new Error('User not found.');
    }
    const otp = this.generateOtp();

    this.otpStore.set(verifyOtpDto.email, {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes from now
    });
    console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
    console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '****' : 'MISSING');

    await this.mailService.sendOtpEmail(verifyOtpDto.email, otp);
    return { message: `OTP has been sent to the Email address ${email}, check your mailbox to verify it.` };
  }

  // Verify OTP
  async verifyEmail(verifyOtpDto: VerifyEmailDto): Promise<{ message: string }> {
    const { email, otp } = verifyOtpDto;

    // Find the user by email
    const user = await this.databaseService.user.findUnique({ where: { email } });
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
    await this.databaseService.user.update({
      where: { email },
      data: {
        isVerified: true,
      },
    });

    // Clean up the OTP from memory
    this.otpStore.delete(email);
    return { message: 'Email verified successfully.'};
  }
    // Verify a user
    async verifyUser(userId: string, verificationToken: string): Promise<User> {
      const user = await this.databaseService.user.update({
        where: { id: userId },
        data: {
          isVerified: true,
          verificationToken: null,
        },
      });
  
      // Send a welcome email after successful verification
      await this.mailService.sendWelcomeEmail(user.email, user.userName);
      
      return user;
    }
}

