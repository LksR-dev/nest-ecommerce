import { Injectable } from '@nestjs/common';
import AWS, { S3, SES } from 'aws-sdk';
import { AWSRepository } from 'src/domain/repositories/aws_repository';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment_config_service';
import { LoggerService } from '../logger/logger_service';

@Injectable()
export class DatabaseAWSRepository implements AWSRepository {
  constructor(
    private readonly environmentConfig: EnvironmentConfigService,
    private readonly logger: LoggerService,
    private readonly s3: S3,
    private readonly ses: SES,
  ) {
    AWS.config.update({
      region: 'us-east-1',
      accessKeyId: this.environmentConfig.getAWSAccessKeyID(),
      secretAccessKey: this.environmentConfig.getAWSSecretAccesKeyID(),
    });
    this.ses = new AWS.SES();
    this.s3 = new AWS.S3();
  }

  uploadImagesWithS3(params: {
    Bucket: string;
    Key: string;
    Body: Buffer;
    ContentType: string;
  }): string {
    this.s3.upload(params, (err, data) => {
      if (err) {
        this.logger.error('AWS S3 Upload', 'Error to upload files');
      } else {
        this.logger.log(
          'AWS S3 Upload',
          `The file has been upload, data: ${data}`,
        );
      }
    });
    const nameKey = params.Key;
    const imgUrl = `https://${this.environmentConfig.getAWSBucketName()}.s3.amazonaws.com/${nameKey}`;
    return imgUrl;
  }

  async sendEmailWithSES(params: {
    Destination: { ToAddresses: string[] };
    Message: {
      Body: { Text: { Data: string } };
      Subject: { Data: string };
    };
    Source: string;
  }): Promise<unknown> {
    const promise = await new Promise((resolve, reject) => {
      this.ses.sendEmail(params, (err, data) => {
        if (err) {
          this.logger.error('AWS SES', `Error to send email, error: ${err}`);
          reject('Error al enviar el correo electrónico');
        } else {
          resolve(data);
          this.logger.log(
            'AWS SES',
            `The email has been sendeed, data: ${data}`,
          );
          return data;
        }
      });
    });
    return promise;
  }
}
