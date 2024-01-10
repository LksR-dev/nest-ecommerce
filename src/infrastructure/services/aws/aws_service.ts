import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { IAWSService } from 'src/domain/services/aws_service';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment_config_service';
import { DatabaseAWSRepository } from 'src/infrastructure/repositories/aws_repository';

@Injectable()
export class AWSService implements IAWSService {
  constructor(
    private readonly environmentConfig: EnvironmentConfigService,
    private readonly awsRepository: DatabaseAWSRepository,
  ) {}

  async uploadImages(images: string[]) {
    const uploadPromises = images.map(async (image: string) => {
      const imageFetched = await fetch(image);
      const buffer = Buffer.from(await imageFetched.arrayBuffer());
      const name = randomUUID();
      const params = {
        Bucket: this.environmentConfig.getAWSBucketName(),
        Key: name,
        Body: buffer,
        ContentType: 'image/jpg',
      };
      return this.awsRepository.uploadImagesWithS3(params);
    });
    return Promise.all(uploadPromises);
  }

  async sendEmail(
    toAdresses: string[],
    code: string,
    bodyType: 'login' | 'recoverPassword',
  ) {
    let body: string;
    let subject: string;

    if (bodyType === 'login') {
      body = this.createLoginCodeBodyEmail(code);
      subject = 'Código de verificación | ECOMMERCE';
    } else {
      body = this.createRecoverCodeBodyEmail(code);
      subject = 'Código de recuperación | ECOMMERCE';
    }
    const params = {
      Destination: {
        ToAddresses: toAdresses,
      },
      Message: {
        Body: {
          Text: {
            Data: body,
          },
        },
        Subject: {
          Data: subject,
        },
      },
      Source: this.environmentConfig.getAWSSourceEmail(),
    };
    return await this.awsRepository.sendEmailWithSES(params);
  }

  createLoginCodeBodyEmail(code: string) {
    return `
      <p>Copia y pega el siguiente código en la página.</p>
      <strong>${code}</strong>
      <p>En caso de que no hayas solicitado el código o hayas recibido este correo por equivocación, sólo ignora este correo.</p>
    `;
  }

  createRecoverCodeBodyEmail(code: string) {
    return `
      <p>Copia y pega el siguiente código en la página.</p>
      <strong>${code}</strong>
      <p>En caso de que no hayas solicitado el código o hayas recibido este correo por equivocación, sólo ignora este correo.</p>
    `;
  }
}
