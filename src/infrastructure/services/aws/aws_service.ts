import { Injectable } from '@nestjs/common';
import AWS from 'aws-sdk';
import { randomUUID } from 'crypto';
import { IAWSService } from 'src/domain/services/aws_service';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment_config_service';
import { DatabaseAWSRepository } from 'src/infrastructure/repositories/aws_repository';

@Injectable()
export class AWSService implements IAWSService {
  SES: AWS.SES;
  constructor(
    private readonly environmentConfig: EnvironmentConfigService,
    private readonly awsRepository: DatabaseAWSRepository,
  ) {
    this.SES = new AWS.SES({
      region: 'us-east-1',
      accessKeyId: this.environmentConfig.getAWSAccessKeyID(),
      secretAccessKey: this.environmentConfig.getAWSSecretAccesKeyID(),
    });
  }
  uploadImages(images: string[]) {
    return images.map((image: string) => {
      const buffer = Buffer.from(image, 'base64');
      const name = randomUUID();
      const params = {
        Bucket: this.environmentConfig.getAWSBucketName(),
        Key: name,
        Body: buffer,
        ContentType: 'image/jpeg',
      };
      return this.awsRepository.uploadImagesWithS3(params);
    });
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
    const promise = await new Promise((resolve, reject) => {
      this.SES.sendEmail(params, (err, data) => {
        if (err) {
          reject('Error al enviar el correo electrónico');
        } else {
          resolve(data);
        }
      });
    });
    return promise;
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
