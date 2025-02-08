import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async findByEmail(email: string) {
    return this.databaseService.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.databaseService.user.findUnique({ where: { id } });
  }

  async register(createUserDto: CreateUserDto) {
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
      return await this.databaseService.user.create({
        data: { userName, email, password: hashedPassword },
      });
    } catch (error) {
      console.error('Signup Error:', error); // ✅ Log the full error details
      throw new Error('Signup failed. Please check the backend logs.');
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
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
