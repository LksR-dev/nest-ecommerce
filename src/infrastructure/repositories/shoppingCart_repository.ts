import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ShoppingCart } from '../entities/shoppingCart_entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCartRepository } from 'src/domain/repositories/shoppingCart_repository';
import { ShoppingCartM } from 'src/domain/models/shoppingCart';

@Injectable()
export class DatabaseShoppingCartRepository implements ShoppingCartRepository {
  constructor(
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
  ) {}

  async upsertByUserId(
    shoppingCartData: Partial<ShoppingCartM>,
  ): Promise<ShoppingCartM> {
    const result = (
      await this.shoppingCartRepository.upsert(shoppingCartData, ['user'])
    ).raw[0];
    return result;
  }

  async findByUserId(userId: string): Promise<ShoppingCartM> {
    return await this.shoppingCartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async findById(id: string): Promise<ShoppingCartM> {
    return await this.shoppingCartRepository.findOneByOrFail({ id });
  }

  createEntity(shoppingCartData: Partial<ShoppingCartM>): ShoppingCartM {
    const { user } = shoppingCartData;
    const shoppingCart = new ShoppingCartM();
    shoppingCart.user = user;
    return shoppingCart;
  }
}
