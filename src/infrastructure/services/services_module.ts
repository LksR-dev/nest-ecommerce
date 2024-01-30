import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth_service';
import { UserService } from './user/user_service';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { JwtTokenService } from './jwt/jwt_service';
import { AWSService } from './aws/aws_service';
import { EnvironmentConfigService } from '../config/environment-config/environment_config_service';
import { DatabaseAWSRepository } from '../repositories/aws_repository';
import { LoggerService } from '../logger/logger_service';
import { MercadoPagoService } from './mercadopago/mercado_pago_service';
import { Payment, Preference } from 'mercadopago';

@Module({
  imports: [
    Jwt.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    // MercadoPagoModule,
  ],
  providers: [
    AuthService,
    UserService,
    JwtTokenService,
    AWSService,
    EnvironmentConfigService,
    DatabaseAWSRepository,
    LoggerService,
    MercadoPagoService,
    Preference,
    Payment,
  ],
  exports: [
    AuthService,
    UserService,
    JwtTokenService,
    AWSService,
    MercadoPagoService,
  ],
})
export class ServicesModule {}
