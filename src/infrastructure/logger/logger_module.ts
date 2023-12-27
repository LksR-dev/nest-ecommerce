import { Module } from '@nestjs/common';
import { LoggerService } from './logger_service';

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
