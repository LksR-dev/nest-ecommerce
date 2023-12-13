import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { JwtTokenService } from './jwt_service';

@Module({
  imports: [
    Jwt.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtModule {}
