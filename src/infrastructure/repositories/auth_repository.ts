import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthM } from 'src/domain/models/auth';
import { AuthRepository } from 'src/domain/repositories/auth_repository';
import { Repository } from 'typeorm';
import { Auth } from 'src/infrastructure/entities/auth_entity';

@Injectable()
export class DatabaseAuthRepository implements AuthRepository {
  constructor(
    @InjectRepository(Auth)
    private readonly authEntityRepository: Repository<Auth>,
  ) {}

  async upsert(auth: AuthM, searchBy: Partial<keyof AuthM>): Promise<AuthM> {
    const result = (await this.authEntityRepository.upsert(auth, [searchBy]))
      .raw[0];
    return result;
  }

  async updateBy(email: string, authData: Partial<AuthM>): Promise<AuthM> {
    return (await this.authEntityRepository.update({ email }, authData)).raw[0];
  }

  async findByEmail(userEmail: string): Promise<AuthM> {
    return await this.authEntityRepository.findOneOrFail({
      where: { email: userEmail },
      relations: ['user'],
    });
  }

  deleteById(authId: string): Promise<void> {
    throw new Error(`Method not implemented.${authId}`);
  }
}
