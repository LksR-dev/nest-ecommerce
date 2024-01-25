import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressRepository } from 'src/domain/repositories/address_repository';
import { Repository } from 'typeorm';
import { Address } from 'src/infrastructure/entities/address_entity';
import { AddressM } from 'src/domain/models/address';

@Injectable()
export class DatabaseAddressRepository implements AddressRepository {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async upsert(address: Partial<AddressM>, userId: string): Promise<AddressM> {
    const updateResult = await this.addressRepository
      .createQueryBuilder()
      .update(Address)
      .set(address)
      .where('userId = :userId', { userId })
      .returning('*')
      .execute();

    if (updateResult.affected === 0) {
      const insertResult = await this.addressRepository
        .createQueryBuilder()
        .insert()
        .into(Address)
        .values({ ...address, user: { id: userId } })
        .returning('*')
        .execute();
      return insertResult.raw[0];
    }
    return updateResult.raw[0];
  }

  async get(userId: string): Promise<AddressM> {
    return await this.addressRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}
