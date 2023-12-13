import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Auth } from 'src/infrastructure/entities/auth-entity';
import { User } from 'src/infrastructure/entities/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, Auth],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: true,
};
