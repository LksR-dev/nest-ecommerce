import { Module } from '@nestjs/common';
import { ExceptionsService } from './exceptions_service';

@Module({
  providers: [ExceptionsService],
  exports: [ExceptionsService],
})
export class ExceptionsModule {}
