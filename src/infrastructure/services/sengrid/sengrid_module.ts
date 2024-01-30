import { Module } from '@nestjs/common';
import { EmailService } from './sengrid_service';
import { EnvironmentConfigModule } from 'src/infrastructure/config/environment-config/environment_config_module';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment_config_service';
import { MailService } from '@sendgrid/mail';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [EmailService, MailService, EnvironmentConfigService],
  exports: [EmailService],
})
export class SengridModule {}
