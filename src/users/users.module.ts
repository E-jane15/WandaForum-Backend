import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtStrategy } from './jwt.strategy';



@Module({

   imports:[
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret',
      signOptions: {expiresIn: '1d'}
    })
   ],

  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
})
export class UsersModule {}
