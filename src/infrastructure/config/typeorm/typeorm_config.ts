import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Auth } from 'src/infrastructure/entities/auth_entity';
import { Product } from 'src/infrastructure/entities/product_entity';
import { User } from 'src/infrastructure/entities/user_entity';
import { Order } from 'src/infrastructure/entities/order_entity';
import { OrderItems } from 'src/infrastructure/entities/orderItems_entity';
import { CartItems } from 'src/infrastructure/entities/cartItems_entity';
import { ShoppingCart } from 'src/infrastructure/entities/shoppingCart_entity';
import { Address } from 'src/infrastructure/entities/address_entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database:
    process.env.NODE_ENV === 'test'
      ? process.env.DATABASE_NAME_TEST
      : process.env.DATABASE_NAME,
  entities: [
    User,
    Auth,
    Product,
    Order,
    OrderItems,
    CartItems,
    ShoppingCart,
    Address,
  ],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: true,
  migrations: ['migrations/**'],
};
