import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigModule } from '../environment-config/environment_config_module';
import { EnvironmentConfigService } from '../environment-config/environment_config_service';
import { User } from 'src/infrastructure/entities/user_entity';
import { Auth } from 'src/infrastructure/entities/auth_entity';
import { Product } from 'src/infrastructure/entities/product_entity';
import { Order } from 'src/infrastructure/entities/order_entity';
import { OrderItems } from 'src/infrastructure/entities/orderItems_entity';
import { CartItems } from 'src/infrastructure/entities/cartItems_entity';
import { ShoppingCart } from 'src/infrastructure/entities/shoppingCart_entity';

export const getTypeOrmModuleOptions = (
  config: EnvironmentConfigService,
): TypeOrmModuleOptions =>
  ({
    type: 'postgres',
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    username: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    database: config.getDatabaseName(),
    entities: [User, Auth, Product, Order, OrderItems, CartItems, ShoppingCart],
    schema: process.env.DATABASE_SCHEMA,
    migrationsRun: true,
    migrations: ['dist/migrations/**/*.ts'],
    cli: {
      migrationsDir: 'dist/migrations',
    },
    // ssl: {
    //   rejectUnauthorized: false,
    // },
  }) as TypeOrmModuleOptions;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
