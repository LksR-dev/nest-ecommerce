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
import { DatabaseShoppingCartRepository } from './shoppingCart_repository';
import { DatabaseCartItemsRepository } from './cartItems_repository';
import { DatabaseOrderItemsRepository } from './orderItems_repository';
import { ShoppingCart } from '../entities/shoppingCart_entity';
import { CartItems } from '../entities/cartItems_entity';
import { OrderItems } from '../entities/orderItems_entity';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([
      User,
      Auth,
      Order,
      Product,
      ShoppingCart,
      CartItems,
      OrderItems,
    ]),
  ],
  providers: [
    DatabaseUserRepository,
    DatabaseAuthRepository,
    DatabaseOrderRepository,
    DatabaseProductRepository,
    DatabaseAWSRepository,
    DatabaseShoppingCartRepository,
    DatabaseCartItemsRepository,
    DatabaseOrderItemsRepository,
    EnvironmentConfigService,
    LoggerService,
  ],
  exports: [
    DatabaseUserRepository,
    DatabaseAuthRepository,
    DatabaseOrderRepository,
    DatabaseProductRepository,
    DatabaseAWSRepository,
    DatabaseShoppingCartRepository,
    DatabaseCartItemsRepository,
    DatabaseOrderItemsRepository,
  ],
})
export class RepositoriesModule {}
