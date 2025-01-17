import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.databaseService.user.create({
      data: {
        userName: createUserDto.userName,
        email: createUserDto.email,
        password: hashedPassword,
      },
    });
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
   const user = await this.validateUser(loginDto)

    const payload = { email: loginDto.email, sub: loginDto.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
