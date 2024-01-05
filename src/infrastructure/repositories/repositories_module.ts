import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm_module';
import { User } from '../entities/user_entity';
import { DatabaseUserRepository } from './user_repository';
import { Auth } from '../entities/auth_entity';
import { DatabaseAuthRepository } from './auth_repository';
import { Order } from '../entities/order_entity';
import { Product } from '../entities/product_entity';
import { DatabaseOrderRepository } from './order_repository';
import { DatabaseProductRepository } from './product_repository';
import { DatabaseAWSRepository } from './aws_repository';
import { EnvironmentConfigService } from '../config/environment-config/environment_config_service';
import { LoggerService } from '../logger/logger_service';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([User, Auth, Order, Product]),
  ],
  providers: [
    DatabaseUserRepository,
    DatabaseAuthRepository,
    DatabaseOrderRepository,
    DatabaseProductRepository,
    DatabaseAWSRepository,
    EnvironmentConfigService,
    LoggerService,
  ],
  exports: [
    DatabaseUserRepository,
    DatabaseAuthRepository,
    DatabaseOrderRepository,
    DatabaseProductRepository,
    DatabaseAWSRepository,
  ],
})
export class RepositoriesModule {}
