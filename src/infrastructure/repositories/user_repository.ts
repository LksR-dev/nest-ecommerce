import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserM } from 'src/domain/models/user';
import { UserRepository } from 'src/domain/repositories/user_repository';
import { Repository } from 'typeorm';
import { User } from 'src/infrastructure/entities/user.entity';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async insert(userData: UserM): Promise<UserM> {
    return await this.userEntityRepository.save(userData);
  }

  async update(id: string, user: UserM): Promise<void> {
    await this.userEntityRepository.update({ id }, user);
  }

  async findById(id: string): Promise<UserM> {
    const userEntity = await this.userEntityRepository.findOneByOrFail({ id });
    return userEntity;
  }

  async findOrCreate(
    searchBy: 'email' | 'id',
    userData: UserM,
  ): Promise<{ user: UserM; userFounded: boolean }> {
    const user = await this.userEntityRepository.findOne({
      where: { [searchBy]: userData[searchBy] },
    });
    if (!user) {
      const userCreated = await this.insert(userData);
      return { user: userCreated, userFounded: false };
    }
    return { user, userFounded: true };
  }

  async deleteById(id: string): Promise<void> {
    await this.userEntityRepository.delete({ id });
  }

  // private userEntity(user: UserM): User {
  //   const userEntity = new User();
  //   userEntity.id = user.id
  //   userEntity.email = user.email;
  //   userEntity.name = user.name;
  //   userEntity.lastname = user.lastname;
  //   user
  //   return userEntity;
  // }
}
