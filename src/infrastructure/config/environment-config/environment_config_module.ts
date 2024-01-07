import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentConfigService } from './environment_config_service';
import { validate } from './environment_config_validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'env/local.env',
      ignoreEnvFile:
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'test'
          ? false
          : true,
      isGlobal: true,
      expandVariables: true,
      validate,
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
