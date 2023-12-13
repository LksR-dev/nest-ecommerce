import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm_module';
import { User } from '../entities/user.entity';
import { DatabaseUserRepository } from './user_repository';
import { Auth } from '../entities/auth-entity';
import { DatabaseAuthRepository } from './auth_repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([User, Auth])],
  providers: [DatabaseUserRepository, DatabaseAuthRepository],
  exports: [DatabaseUserRepository, DatabaseAuthRepository],
})
export class RepositoriesModule {}
