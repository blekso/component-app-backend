import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get('jwt.secretOrKey'),
        expiresIn: config.get('jwt.expiresIn'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
