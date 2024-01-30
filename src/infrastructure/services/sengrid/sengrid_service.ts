import { Injectable } from '@nestjs/common';
import { MailService } from '@sendgrid/mail';
import { ProductM } from 'src/domain/models/product';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment_config_service';

@Injectable()
export class EmailService {
  constructor(
    private readonly configService: EnvironmentConfigService,
    private readonly mailService: MailService,
  ) {
    this.mailService = new MailService();
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

  async sendOrder(to: string, products: ProductM[]) {
    const senderEmail = this.configService.getSengridSenderEmail();
    console.log(products);
    const msg = {
      to,
      from: senderEmail,
      subject: 'Factura de compra.',
      html: `
        <h1>¡Ya está lista tu factura de compra!</h1>
        < >
          ${products.map((product, index) => {
            return `
              <p font-size="24px">Compraste:${product.title}</p>
              <img src="${product.images[index]}"></img>
              <break></break>
            `;
          })}
        </>
        `,
    };
    await this.mailService.send(msg);
  }
}
