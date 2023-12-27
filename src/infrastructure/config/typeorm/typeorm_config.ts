import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Auth } from 'src/infrastructure/entities/auth_entity';
import { Product } from 'src/infrastructure/entities/product_entity';
import { User } from 'src/infrastructure/entities/user_entity';
import { Order } from 'src/infrastructure/entities/order_entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, Auth, Product, Order],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: true,
};
