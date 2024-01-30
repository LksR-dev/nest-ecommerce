import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app_module';

import { AllExceptionFilter } from './infrastructure/common/filter/exception_filter';
import { LoggerService } from './infrastructure/logger/logger_service';
import { LoggingInterceptor } from './infrastructure/common/interceptors/logger_interceptor';
import {
  ResponseFormat,
  ResponseInterceptor,
} from './infrastructure/common/interceptors/response_interceptor';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const env = process.env.NODE_ENV;
  const app = await NestFactory.create(AppModule);

  //Filter
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  //Pipes
  app.useGlobalPipes(new ValidationPipe());

  //Interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.enableCors();
  app.use(cookieParser());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  //Swagger config
  if (env !== 'production') {
    const config = new DocumentBuilder()
      .addCookieAuth()
      .addBearerAuth()
      .setTitle('ecommerce')
      .setDescription('ecommerce')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponseFormat],
      deepScanRoutes: true,
    });
    SwaggerModule.setup('api', app, document);
  }
  await app.listen(3000);
}
bootstrap();
