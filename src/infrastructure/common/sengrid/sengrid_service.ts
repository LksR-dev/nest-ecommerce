import { Injectable } from '@nestjs/common';
import { MailService } from '@sendgrid/mail';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment_config_service';

@Injectable()
export class EmailService {
  constructor(
    private readonly configService: EnvironmentConfigService,
    private readonly mailService: MailService,
  ) {
    console.log('SendGrid API Key:', this.configService.getSengridAPIKey());
    this.mailService.setApiKey(this.configService.getSengridAPIKey());
  }

  async sendCodeEmail(to: string, code: string): Promise<void> {
    const senderEmail = this.configService.getSengridSenderEmail();
    const msg = {
      to,
      from: senderEmail,
      subject: 'Código de verificación | ECOMMERCE',
      html: `
        <p>Copia y pega el siguiente código en la página.</p>
        <strong>${code}</strong>
        <p>En caso de que no hayas solicitado el código o hayas recibido este correo por equivocación, sólo ignora este correo.</p>
        `,
    };
    await this.mailService.send(msg);
  }
}
