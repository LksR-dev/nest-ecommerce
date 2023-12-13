import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth_service';
import { UserService } from './user/user_service';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { JwtTokenService } from './jwt/jwt_service';

@Module({
  imports: [
    Jwt.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, UserService, JwtTokenService],
  exports: [AuthService, UserService, JwtTokenService],
})
export class ServicesModule {}
