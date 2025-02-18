import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
      private readonly prisma: PrismaService,
        private readonly emailService: MailService,
  ) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    console.log(id);
    return this.prisma.user.findFirst({ where: { id } });
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.prisma.user.create({
      data: {
        userName: createUserDto.userName,
        email: createUserDto.email,
        password: hashedPassword,
      },
    });
    // Send a welcome email after successful registration
    await this.emailService.sendWelcomeEmail(createUserDto.email, createUserDto.userName);
    return user;
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this.findByEmail(loginDto.email);
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  //JWT Token
  async login(loginDto: LoginDto) {
    console.log(process.env.JWT_SECRET);
    const user = await this.validateUser(loginDto);

    // const payload = { email: loginDto.email, sub: loginDto.password };
    const payload = {
      email: user.email,
      userId: user.id, // Use the actual user ID
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

    // Verify a user
    async verifyUser(userId: string, verificationToken: string): Promise<User> {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          isVerified: true,
          verificationToken: null,
        },
      });
  
      // Send a welcome email after successful verification
      await this.emailService.sendWelcomeEmail(user.email, user.userName);
      
      return user;
    }
}
