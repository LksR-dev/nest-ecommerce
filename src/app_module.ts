import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllersModule } from './infrastructure/controllers/controllers_module';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment_config_module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions_module';
import { LoggerModule } from './infrastructure/logger/logger_module';
import { typeOrmConfig } from './infrastructure/config/typeorm/typeorm_config';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecases_module';
import { SengridModule } from './infrastructure/common/sengrid/sengrid_module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule as JwtServiceModule } from './infrastructure/services/jwt/jwt_module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './infrastructure/common/strategies/jwt_strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    JwtServiceModule,
    EnvironmentConfigModule,
    UsecasesProxyModule.register(),
    ControllersModule,
    LoggerModule,
    ExceptionsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    SengridModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
