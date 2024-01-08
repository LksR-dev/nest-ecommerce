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

  async insert(shoppingCartData: ShoppingCart): Promise<ShoppingCart> {
    return await this.shoppingCartRepository.save(shoppingCartData);
  }

  async findByUserId(userId: string): Promise<ShoppingCartM> {
    return await this.shoppingCartRepository.findOneByOrFail({
      user: { id: userId },
    });
  }

  async findById(id: string): Promise<ShoppingCart> {
    return await this.shoppingCartRepository.findOneByOrFail({ id });
  }
}
