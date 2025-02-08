import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // ✅ Load secret safely
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findById(payload.userId);

    if (!user) {
      throw new UnauthorizedException('Unauthorized user');
    }

    // ✅ Return only necessary fields
    return {
      id: user.id,
      email: user.email,
      userName: user.userName,
    };
  }
}
