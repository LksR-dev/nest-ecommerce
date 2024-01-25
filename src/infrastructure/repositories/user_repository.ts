import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserM } from 'src/domain/models/user';
import { UserRepository } from 'src/domain/repositories/user_repository';
import { Repository } from 'typeorm';
import { User } from 'src/infrastructure/entities/user_entity';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async insert(userData: UserM): Promise<UserM> {
    return await this.userEntityRepository.save(userData);
  }

  async update(id: string, user: Partial<UserM>): Promise<number> {
    return (await this.userEntityRepository.update({ id }, user)).affected;
  }

  async findById(id: string): Promise<UserM> {
    return await this.userEntityRepository.findOneByOrFail({ id });
  }

  async findOrCreate(
    searchBy: Partial<keyof UserM>,
    userData: UserM,
  ): Promise<UserM> {
    const user = await this.userEntityRepository.findOne({
      where: { [searchBy]: userData[searchBy] },
    });
    if (!user) return await this.insert(userData);
    return user;
  }

  async deleteById(id: string): Promise<void> {
    await this.userEntityRepository.delete({ id });
  }

  async getAll(): Promise<UserM[]> {
    return await this.userEntityRepository.find();
  }
}
