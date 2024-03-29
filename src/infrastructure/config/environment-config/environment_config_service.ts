import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AWSConfig } from 'src/domain/config/aws_interface';
import { DatabaseConfig } from 'src/domain/config/database_interface';
import { JWTConfig } from 'src/domain/config/jwt_interface';

interface EnvironmentVariables {
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  JWT_SECRET: string;
  JWT_EXPIRATION_TIME: string;
  SENGRID_API_KEY: string;
  SENGRID_SENDER_EMAIL: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SOURCE_EMAIL: string;
  AWS_BUCKET_NAME: string;
  ADMIN_EMAIL: string;
  MERCADO_PAGO_ACCESS_TOKEN: string;
}

@Injectable()
export class EnvironmentConfigService
  implements DatabaseConfig, JWTConfig, AWSConfig
{
  constructor(private configService: ConfigService<EnvironmentVariables>) {}
  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }
  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }
  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }
  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }
  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }
  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }
  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }
  getSengridAPIKey(): string {
    return this.configService.get<string>('SENGRID_API_KEY');
  }
  getSengridSenderEmail(): string {
    return this.configService.get<string>('SENGRID_SENDER_EMAIL');
  }
  getAWSAccessKeyID(): string {
    return this.configService.get<string>('AWS_ACCESS_KEY_ID');
  }
  getAWSSecretAccesKeyID(): string {
    return this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
  }
  getAWSSourceEmail(): string {
    return this.configService.get<string>('AWS_SOURCE_EMAIL');
  }
  getAWSBucketName(): string {
    return this.configService.get<string>('AWS_BUCKET_NAME');
  }
  getAdminEmail(): string {
    return this.configService.get<string>('ADMIN_EMAIL');
  }
  getMercadoPagoAccessToken(): string {
    return this.configService.get<string>('MERCADO_PAGO_ACCESS_TOKEN');
  }
}
